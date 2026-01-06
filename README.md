# 🛰️ CanSat IHM – Human-Machine Interface

![Electron](https://img.shields.io/badge/Electron-Desktop%20App-47848F?style=for-the-badge&logo=electron)
![React](https://img.shields.io/badge/React-HMI%20Frontend-61DAFB?style=for-the-badge&logo=react)
![Arduino](https://img.shields.io/badge/Arduino-Telemetry%20%26%20Sensors-00979D?style=for-the-badge&logo=arduino)

This project was developed as part of the **Ibero-American CanSat Competition**.  
It is a **desktop application** designed to work as a **ground station** for a CanSat, allowing real-time monitoring, visualization, and storage of telemetry data.

My main role in this project was the **development of the Human-Machine Interface (HMI)**. In addition, I made important contributions to the **telemetry system**, including data communication, sensor handling, and integration between the CanSat and the desktop application.

---

## 🎯 Project Goals

- Monitor telemetry data sent by a CanSat in real time
- Visualize sensor data using charts and simple 3D models
- Connect the CanSat to the ground station using serial communication
- Store important measurements for later analysis

---

## 🧩 Project Structure

The repository is organized into three main parts:

### 1️⃣ Arduino (Embedded Systems)

`arduino_skecthes/`

Contains Arduino sketches for:

- Primary payload
- Secondary payload
- Ground station
- Communication tests (LoRa, serial)
- Sensor tests (IMU, gyroscope)
- Data filtering and JSON transmission

These sketches handle sensor readings, data processing, and data transmission.

---

### 2️⃣ Desktop Backend (Electron)

`main/`

Responsible for:

- Running the Electron main process
- Managing serial communication with the CanSat
- Handling IPC communication between backend and frontend
- Managing the database using Sequelize and SQLite
- Error handling and application configuration

---

### 3️⃣ Frontend (React)

`renderer/`

Includes:

- User interface built with React and Vite
- Real-time charts for telemetry data
- Simple 3D visualization for orientation and movement
- Data tables with export functionality
- Modern UI styling with TailwindCSS

---

## 🛠️ Technologies Used

### Desktop & Backend

![Electron](https://img.shields.io/badge/Electron-Desktop%20App-47848F?style=for-the-badge&logo=electron)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=for-the-badge&logo=sequelize)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)

### Frontend

![React](https://img.shields.io/badge/React-HMI-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss)
![Chart.js](https://img.shields.io/badge/Chart.js-Data%20Visualization-FF6384?style=for-the-badge&logo=chartdotjs)
![ECharts](https://img.shields.io/badge/ECharts-Data%20Visualization-AA344D?style=for-the-badge)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Visualization-000000?style=for-the-badge&logo=threedotjs)

### Embedded Systems

![Arduino](https://img.shields.io/badge/Arduino-Embedded%20Systems-00979D?style=for-the-badge&logo=arduino)
![IMU](https://img.shields.io/badge/IMU-Sensors-blueviolet?style=for-the-badge)
![Serial Communication](https://img.shields.io/badge/Serial%20Communication-Telemetry-critical?style=for-the-badge)
![LoRa](https://img.shields.io/badge/LoRa-Wireless%20Communication-2C2255?style=for-the-badge)
![Kalman Filter](https://img.shields.io/badge/Kalman%20Filter-Signal%20Processing-success?style=for-the-badge)

---

## 📦 Requirements

- **Node.js 18.20.0**  
  This project requires **Node.js version 18.20.0**, which is specified in the `.npmrc` file.  
  The recommended way to install this version is using **nvm (Node Version Manager)**.  
  The version is fixed because this repository is no longer actively maintained and is kept as a storage and reference resource.

- **npm**  
  npm is installed automatically when using Node.js with nvm.

- **Arduino IDE**  
  Required to upload and modify the Arduino sketches included in the project.

- **A CanSat or Arduino device connected via serial port**  
  Needed to send telemetry data to the desktop application.  
  The project can also be tested using a **basic Arduino setup with potentiometers**, by uploading the example sketches located in the **`arduino_skecthes/`** folder. These sketches simulate sensor data and allow testing the interface without a full CanSat.

<img src="./documentation/img/pot.png" alt="Arduino potentiometer test setup" width="400px" />

---

## ▶️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/CansatIHM.git
cd CansatIHM
```

Install dependencies:

```bash
npm install
```

🚀 Run in Development Mode

```bash
npm run dev
```

This command:

- Starts the React frontend using Vite

- Launches the Electron desktop application in development mode

## 🏗️ Build the Application

To generate a production build:

```bash
npm run build
```

This will:

- Build the frontend

- Package the Electron application

## 🗃️ Database

The project uses SQLite with Sequelize.

To initialize the database:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 📊 Data Flow

- Sensors collect data on the CanSat

- Data is sent to the ground station via serial communication

- Electron backend processes and stores the data

- Frontend displays the data using charts and 3D views

## 🖼️ Project Images

The following images show different stages of the **CanSat project**, including the construction process, hardware setup, testing, and the desktop application used as the ground station.

These images are intended to give a general overview of the project development and the integration between hardware and software.

<div style="display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:10px">
<img src="./documentation/img/1.png" alt="Project wide view 2" style="width:400px" /><img src="./documentation/img/2.png" alt="Project tall view 1" style="width:400px" />
<img src="./documentation/img/3.png" alt="Project tall view 2" style="width:600px" />
<img src="./documentation/img/6.png" alt="Project random 3" style="width:300px" />
<img src="./documentation/img/5.jpeg" alt="Project random 2" style="width:300px" />
<img src="./documentation/img/4.png" alt="Project random 1"  style="width:600px"/>
<img src="./documentation/img/7.png" alt="Project random 4" style="width:500px" />
</div>

