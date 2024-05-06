#include <Wire.h>
#include <ArduinoJson.h>

JsonDocument doc;

int Master = 1;
int SlavePrimaria = 2;
int SlaveSecundaria = 3;

String dataPrimaria = "iniciado";
String dataSecundaria = "iniciado2";

void setup() {
  Wire.begin(Master);
  Serial.begin(9600);
}

void loop() {
  Wire.requestFrom(SlavePrimaria, 50);
  dataPrimaria = "";
  while(Wire.available()) {
    char chr = (char)Wire.read();
    dataPrimaria += chr;
  }
  Wire.requestFrom(SlaveSecundaria, 50);
  dataSecundaria = "";
  while (Wire.available()) {
    char chr = (char)Wire.read();
    dataSecundaria += chr;
  }

  dataPrimaria = dataPrimaria.substring(0, dataPrimaria.indexOf('}') + 1);
  dataSecundaria = dataSecundaria.substring(0, dataSecundaria.indexOf('}') + 1);

  deserializeJson(doc, dataPrimaria);

  // Serial.print("primaria: ");
  // Serial.print(dataPrimaria);
  // Serial.print(" secundaria ");
  // Serial.println(dataSecundaria);

  float d = doc["cp"][0];
  Serial.println(d);
}
