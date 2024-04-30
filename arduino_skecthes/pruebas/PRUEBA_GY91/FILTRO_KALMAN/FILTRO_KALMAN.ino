#include <Kalman.h>
#include "Wire.h"
#include <MPU6050_light.h>

MPU6050 mpu(Wire);
using namespace BLA;

//------------------------------------
/****       KALMAN PARAMETERS    ****/
//------------------------------------

// Dimensions of the matrices
#define Nstate 3 // length of the state vector
#define Nobs 3   // length of the measurement vector

// measurement std (to be characterized from your sensors)
#define n1 0.2 // noise on the 1st measurement component
#define n2 0.2 // noise on the 2nd measurement component 
#define n3 0.2 // noise on the 2nd measurement component 

// model std (~1/inertia). Freedom you give to relieve your evolution equation
#define m1 0.01
#define m2 0.02
#define m3 0.02

KALMAN<Nstate,Nobs> K; // your Kalman filter
BLA::Matrix<Nobs> accel; // observation vector
BLA::Matrix<Nobs> vel;
BLA::Matrix<Nobs> pos;
BLA::Matrix<Nobs> gyro;
BLA::Matrix<Nobs> angles;

// Note: I made 'obs' a global variable so memory is allocated before the loop.
//       This might provide slightly better speed efficiency in loop.

float DT = 0.0;
float timer = 0.0;

//-----------------------------------
/****           SETUP           ****/
//-----------------------------------

void setup() {
  Serial.begin(115200);
  Wire.begin();
  
  byte status = mpu.begin();
  Serial.print(F("MPU6050 status: "));
  Serial.println(status);
  while(status!=0){ } // stop everything if could not connect to MPU6050
  
  Serial.println(F("Calculating offsets, do not move MPU6050"));
  delay(1000);
  mpu.calcOffsets(true, true);
  Serial.println("Done!\n");
  
  // example of evolution matrix. Size is <Nstate,Nstate>
  K.F = {1.0, 0.0, 0.0,
         0.0, 1.0, 0.0,
         0.0, 0.0, 1.0};
  // example of measurement matrix. Size is <Nobs,Nstate>
  K.H = {1.0, 0.0, 0.0,
         0.0, 1.0, 0.0,
         0.0, 0.0, 1.0};
  // example of measurement covariance matrix. Size is <Nobs,Nobs>
  K.R = {n1*n1, 0.0, 0.0,
         0.0, n2*n2, 0.0,
         0.0, 0.0, n3*n3};
  // example of model covariance matrix. Size is <Nstate,Nstate>
  K.Q = {m1*m1, 0.0, 0.0,
         0.0, m2*m2, 0.0,
         0.0, 0.0, m3*m3};

  timer = get_time();
}

//-----------------------------------
/****            LOOP           ****/
//-----------------------------------

BLA::Matrix<Nobs> roundMatrix(BLA::Matrix<Nobs> matriz) {
  BLA::Matrix<Nobs> resultado;
  for (int i = 0; i < 2; i++) {
    resultado(i) = roundf(matriz(i)*100.00)/100.00;
  }
  return resultado;
}

void loop() {
  mpu.update();
  DT = 0.112;

  K.F = {1.0,  0.2,  0.2,
         0.0,  1.0,  0.2,
         0.0,  0.0,  1.0};
  get_sensor_data();
  K.update(accel);

  Serial.println(accel(0));
  
  delay(100);
}

//-----------------------------------
/****     GET SENSOR DATA       ****/
//-----------------------------------

void get_sensor_data(){
  // It is your job to fill in this method
  // grab data from your accelerometer, GPS, etc...

  float ax = mpu.getAccX();
  float ay = mpu.getAccY();
  float az = mpu.getAccZ();
  float gx = mpu.getGyroX();
  float gy = mpu.getGyroY();
  float gz = mpu.getGyroZ();
  float ang_x = mpu.getAngleX();
  float ang_y = mpu.getAngleY();
  float ang_z = mpu.getAngleZ();

  accel = roundMatrix({ax, ay, az});
  vel = roundMatrix(vel + accel*DT);
  pos = roundMatrix(pos + vel*DT);
  gyro = roundMatrix({gx,gy,gz});
  angles = roundMatrix({ang_x, ang_y, ang_z});
}

int get_time() {
  return millis();
}


