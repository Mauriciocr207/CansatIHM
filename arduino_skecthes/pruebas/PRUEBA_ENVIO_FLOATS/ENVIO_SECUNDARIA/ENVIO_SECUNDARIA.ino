#include <SPI.h> 
#include <LoRa.h>

byte ThisNode = 0x2A;
unsigned long frecuency = 868E6;
float data[] = {1.1, 2.2};

void setup() {
  Serial.begin(9600);

  if (!LoRa.begin(frecuency)) {
    Serial.println("LoRa init failed. Check your connections.");
    while (true);                       // if failed, do nothing
  }
  Serial.println("LoRa init succeeded.");
}

void loop() {
  sendData();
}

void sendData() {
  byte payload[sizeof(data)];
  memcpy(payload, &data, sizeof(data));
  LoRa.beginPacket();
  LoRa.write(ThisNode);
  LoRa.write(sizeof(payload)/sizeof(float));
  LoRa.write(payload, sizeof(payload));
  bool sended = LoRa.endPacket();
  Serial.println(sended);
}

