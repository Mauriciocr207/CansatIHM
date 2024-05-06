#include <SPI.h>
#include <LoRa.h>
#include <ArduinoJson.h>
#include <Wire.h>

JsonDocument doc;

byte SlaveSecundaria = 3;
byte Master = 1;
byte SecundariaAdress = 0x2A; 
unsigned long frecuency = 868E6;
String data;
float dataSecundaria[2];

void setup() {
  Serial.begin(9600);
  Wire.begin(SlaveSecundaria);
  Wire.onRequest(printToMaster);

  if(!LoRa.begin(frecuency)) {
    Serial.println("radio primaria failed");
    while(1){};
  } else {
    Serial.println("radio primaria iniciadia");
  }
}


void loop() {
  onReceive(LoRa.parsePacket());
  
  doc["cs"][0] = dataSecundaria[0];
  doc["cs"][1] = dataSecundaria[1];

  serializeJson(doc, data);
  Serial.println(data);
}

void onReceive(int packetSize) {
  if(packetSize == 0) return;

  byte senderAdress = LoRa.read();
  int incomingLength = LoRa.read();

  if(incomingLength != sizeof(dataSecundaria)/sizeof(float)) return;

  if(senderAdress == SecundariaAdress) {
    readPayloadRadio(dataSecundaria, sizeof(dataSecundaria)/sizeof(float));
  }
}

void readPayloadRadio(float* data, int length) {
  byte buffer[length*sizeof(float)];
  LoRa.readBytes(buffer, sizeof(buffer));

  for(int i=0; i < length; i++) {
    memcpy(&data[i], &buffer[i*sizeof(float)], sizeof(float));
  }
}

void printToMaster() {
  Wire.write(data.c_str());
}

void printDataRadio(float data[], int length) {
  for(int i = 0; i < length; i++) {
    Serial.print(data[i]);
    Serial.print(" ");
  }
}
