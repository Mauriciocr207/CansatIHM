#include <SPI.h>
#include <MPU6050_light.h>
#include <Adafruit_BMP280.h>
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
#include <LoRa.h>
#include <Servo.h>
#include <Kalman.h>



Adafruit_BMP280 bmp;
MPU6050 mpu(Wire);
TinyGPSPlus gps;
SoftwareSerial gpsSerial( 5,6 ); // Tx (5) , Rx (6)
Servo servo;
float data[12];
bool deploymentReady = false;
float deploymentHeight = 25;

KALMAN<1,1> Kalman;
BLA::Matrix<1> accel;
float vel = 0.0;
float time = 0;
float dt = 0;

void setup() {
  Wire.begin();
  Serial.begin(9600);
  gpsSerial.begin(9600);
  bmp.begin(0x76);
  byte status = mpu.begin();
  while(status!=0){ } // stop everything if could not connect to MPU6050
  mpu.calcOffsets(true,true); // gyro and accelero
  delay(1000);
  if(!LoRa.begin(915E6)) {
    Serial.println("Lora init failed");
    while(true);
  }
  servo.attach(8);
  servo.write(0);

  // Kalman filter
  Kalman.F = {1.0};
  Kalman.H = {1.0};
  Kalman.R = {0.2*0.2};
  Kalman.Q = {0.1*0.1};

  Serial.println("Done!\n");
}

void loop() {
  dt = millis()/1000 - time;
  time = millis()/1000;
  sensorsUpdate();
  sendData();
}

void sensorsUpdate() {
  // update sensor data
  mpu.update();

  // Apply kalman filter
  accel(0) = mpu.getAccZ();
  Kalman.update(accel);

  // get kalman filter result 
  float az = Kalman.x(0);

  // calculate velocity
  vel += az*dt;
  
  // save all data
  data[0] = mpu.getAngleX(); 
  data[1] = mpu.getAngleY(); 
  data[2] = mpu.getAngleZ();
  data[3] = az;
  data[4] = vel;
  data[5] = bmp.readTemperature();
  data[6] = bmp.readPressure()/3377;
  data[7] = bmp.readAltitude(1013);
  while(gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }
  if(gps.location.isValid()) {
    data[8] = gps.location.lat();
    data[9] = gps.location.lng(); 
    data[10] = gps.altitude.meters(); 
  }
  data[11] = millis();

  verifyDeployment();
}

void sendData() {
  byte payload[sizeof(data)];
  memcpy(payload, &data, sizeof(data));
  LoRa.beginPacket();
  LoRa.write(payload, sizeof(payload));
  LoRa.endPacket();
}

void verifyDeployment() {
  if(bmp.readAltitude(1013) < deploymentHeight) {
    deploymentReady = true;
  }
  if(deploymentReady) {
    servo.write(180);
  }
}