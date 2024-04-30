#include <ArduinoJson.h>

StaticJsonDocument<200> doc;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  String msg;
  updateJsonData();
  int writtenBytes = serializeJson(doc, msg);
  Serial.println(msg);
}

void updateJsonData() {
  // GIROSCOPIO
  doc["ang"][0] = getRandomNumber(); 
  doc["ang"][1] = getRandomNumber(); 
  doc["ang"][2] = getRandomNumber();
  // ACELERACIÓN
  doc["accel"] = getRandomNumber();
  // Velocidad
  doc["vel"] = getRandomNumber();
  // TEMPERATURA
  doc["temp"] = getRandomNumber();
  // PRESION
  doc["pres"] = getRandomNumber();
  // ALTITUD
  doc["alt"] =getRandomNumber();
  // GPS
  doc["gps_prim"][0] = getRandomNumber();
  doc["gps_prim"][1] = getRandomNumber(); 
  doc["gps_sec"][0] = getRandomNumber(); 
  doc["gps_sec"][1] = getRandomNumber(); 
  doc["time_prim"] = millis();
  doc["time_sec"] = millis();
}

int getRandomNumber() {
  return random(0, 100);
}