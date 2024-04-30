#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(9600);
}

void loop() {
  Wire.requestFrom(2, 50);
  String message = readWire();
  Wire.requestFrom(3, 50);
  String message2 = readWire();

  Serial.print("cp: ");
  Serial.print(message);
  Serial.print("cs: ");
  Serial.print(message2);
  Serial.println();

}

String readWire() {
  String message = "";
  while (Wire.available()) {
    char c = Wire.read();
    message += c;
    if(c == '\n') {
      return message;
    }
  }
  return "";
}
