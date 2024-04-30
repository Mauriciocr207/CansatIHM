#include <SPI.h>
#include <MPU6050_light.h>
#include <Adafruit_BMP280.h>
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
#include <LoRa.h>
#include <Servo.h>

Adafruit_BMP280 bmp;
MPU6050 mpu(Wire);
TinyGPSPlus gps;
SoftwareSerial gpsSerial( 5,6 ); // Tx (5) , Rx (6)
Servo servo;
float data[10];
bool deploymentReady = false;
float deploymentHeight = 25;

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
  Serial.println("Done!\n");
}

void loop() {
  sensorsUpdate();
  sendData();
}

void sensorsUpdate() {
  mpu.update();
  data[0] = mpu.getAngleX(); 
  data[1] = mpu.getAngleY(); 
  data[2] = mpu.getAngleZ();
  data[3] = bmp.readTemperature();
  data[4] = bmp.readPressure()/3377;
  data[5] = bmp.readAltitude(1013);
  while(gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }
  if(gps.location.isValid()) {
    data[6] = gps.location.lat();
    data[7] = gps.location.lng(); 
    data[8] = gps.altitude.meters(); 
  }
  data[9] = millis();

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