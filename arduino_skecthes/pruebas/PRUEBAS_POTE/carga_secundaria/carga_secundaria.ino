// Pruebas con potenciometros
#include <ArduinoJson.h>

// JSON DOCUMENT
StaticJsonDocument<200> doc;

void setup() {
  // Se inicia comunicacion serial
  Serial.begin(9600);
}


void loop() {
  doc["id"] = "cs";
  doc["gps"][0] = map(analogRead(A0) ,0, 1023, 0, 360);
  doc["gps"][1] = map(analogRead(A1) ,0, 1023, 0, 360);

  String msg;
  int buff = serializeJson(doc, msg);
  Serial.println(msg);
  delay(10);
}

