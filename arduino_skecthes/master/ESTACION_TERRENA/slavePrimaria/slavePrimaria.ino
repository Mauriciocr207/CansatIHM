#include <SPI.h>
#include <LoRa.h>
#include <ArduinoJson.h>
#include <Wire.h>

JsonDocument doc;

int SlavePrimaria = 2;
int Master = 1;
byte PrimariaAdress = 0xBB; 
unsigned long frecuency = 915E6;

String data = "";
float dataPrimaria[4];

void setup() {
  Serial.begin(9600);
  Wire.begin(SlavePrimaria);
  Wire.onRequest(printToMaster);

  if(!LoRa.begin(frecuency)) {
    Serial.println("radio primaria failed");
    while(1){}
  } else {
    Serial.println("radio primaria iniciadia");
  }
}


void loop() {
  onReceive(LoRa.parsePacket());

  doc["cp"][0] = dataPrimaria[0];
  doc["cp"][1] = dataPrimaria[1];
  doc["cp"][2] = dataPrimaria[2];
  doc["cp"][3] = dataPrimaria[3];

  serializeJson(doc, data);
  Serial.println(data);
}

void onReceive(int packetSize) {
  if(packetSize == 0) return;

  byte senderAdress = LoRa.read();
  int incomingLength = LoRa.read();

  if(incomingLength != sizeof(dataPrimaria)/sizeof(float)) return;

  if(senderAdress == PrimariaAdress) {
    readPayloadRadio(dataPrimaria, sizeof(dataPrimaria)/sizeof(float));
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
