import { BrowserWindow, ipcMain } from 'electron';
import { SerialPort, DelimiterParser } from 'serialport';
import Measurement from '../Models/Measurement.js';


export class SerialPortConnection {
    baudRateValue = 9600;
    serial;
    constructor(port) {
        this.serial = new SerialPort({
            path: port,
            baudRate: this.baudRateValue,
            autoOpen: false,
        });
        const parse = this.serial.pipe(new DelimiterParser({ delimiter: '\n' }));
        parse.on('data', (data) => {
            try {
                let jsonData = data.toString();
                jsonData = jsonData.replace(/\r?\n|\r/g, "");
                jsonData = JSON.stringify(data);
                jsonData = JSON.parse(data);

                Measurement.create({
                    time: 0,
                    temperature: jsonData.temp,
                    pressure: jsonData.pres,
                    velocity: jsonData.vel,
                    height: jsonData.alt,
                    aceleration: jsonData.accel,
                    angle_x: jsonData.ang[0],
                    angle_y: jsonData.ang[1],
                    angle_z: jsonData.ang[2],
                    latitude_cp: jsonData.cp[0],
                    length_cp: jsonData.cp[1],
                    latitude_cs: jsonData.cs[0],
                    length_cs: jsonData.cs[1],
                });

                this.sendToWindow(1, jsonData);
            } catch (err) {
                console.log(`${err.message} : ${jsonData}`);
            }
        });
    }

    open() {
        try {
            return new Promise((res, rej) => {
                this.serial.open(function (err) {
                    if (err) {
                        rej(err.message)
                    } else {
                        res();
                    }
                });
            });
        } catch (error) {
            this.errMsg = error;
        }
    };

    close() {
        try {
            return new Promise((res, rej) => {
                this.serial.close(function (err) {
                    if (err) {
                        rej(err.message)
                    } else {
                        res();
                    }
                });
            });
        } catch (error) {
            this.errMsg = error;
        }
    }

    write(data) {
        try {
            this.serial.write(Buffer.from(data));
        } catch (error) {
            this.errMsg = error.message;
        }
    }

    sendToWindow(windowId, data) {
        BrowserWindow.fromId(windowId).webContents.send('arduino:data', data);     // Send to principal window
    }
};