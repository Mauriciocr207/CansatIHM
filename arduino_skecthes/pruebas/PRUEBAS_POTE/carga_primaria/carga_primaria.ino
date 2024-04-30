// Pruebas con potenciometros
#include <ArduinoJson.h>

// JSON DOCUMENT
StaticJsonDocument<200> doc;

void setup() {
  // Se inicia comunicacion serial
  Serial.begin(9600);
}


void loop() {
  doc["id"] = "cp";
  doc["time"] = millis();
  doc["temp"] = map(analogRead(A0) ,0, 1023, 10, 50);
  doc["pres"] = analogRead(A1);
  doc["alt"] = analogRead(A2);
  doc["vel"] = map(analogRead(A3) ,0, 1023, 0, 50);
  doc["accel"] = map(analogRead(A4) ,0, 1023, 0, 50);
  doc["gyro"][0] = map(analogRead(A0) ,0, 1023, 0, 360);
  doc["gyro"][1] = map(analogRead(A1) ,0, 1023, 0, 360);
  doc["gyro"][2] = map(analogRead(A2) ,0, 1023, 0, 360);
  doc["gps"][0] = map(analogRead(A3) ,0, 1023, 0, 10);
  doc["gps"][1] = map(analogRead(A4) ,0, 1023, 0, 360);

  String msg;
  int buff = serializeJson(doc, msg);
  Serial.println(msg);
  delay(10);
}

