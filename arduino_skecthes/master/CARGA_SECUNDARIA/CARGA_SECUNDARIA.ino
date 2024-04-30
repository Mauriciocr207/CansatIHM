#include <SPI.h>
#include <MPU6050_light.h>
#include <Adafruit_BMP280.h>
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
#include <LoRa.h>

TinyGPSPlus gps;
SoftwareSerial gpsSerial( 5,6 ); // Tx (5) , Rx (6)
float data[4];

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
  Serial.println("Done!\n");
}

void loop() {
  sensorsUpdate();
  sendData();
}

void sensorsUpdate() {
  while(gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }
  if(gps.location.isValid()) {
    data[0] = gps.location.lat();
    data[1] = gps.location.lng(); 
    data[2] = gps.altitude.meters(); 
  }
  data[3] = millis();
}

void sendData() {
  byte payload[sizeof(data)];
  memcpy(payload, &data, sizeof(data));
  LoRa.beginPacket();
  LoRa.write(payload, sizeof(payload));
  LoRa.endPacket();
}

