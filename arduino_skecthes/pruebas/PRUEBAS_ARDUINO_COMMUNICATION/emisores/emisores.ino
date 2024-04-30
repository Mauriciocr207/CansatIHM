#include <Wire.h>

void setup() {
  Wire.begin(3);
  Wire.onRequest(requestEvent);
}

void loop() {
  delay(100);
}

void requestEvent() {
  Wire.write("hola, soy carga secundaria\n");
}