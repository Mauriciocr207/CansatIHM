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
            let jsonData = data.toString();
            try {
                jsonData = jsonData.replace(/\r?\n|\r/g, "");
                jsonData = JSON.stringify(data);
                jsonData = JSON.parse(data);

                // here save on db
                
                this.sendToWindow(1, jsonData);
            } catch (err) {
                console.log(`${err.message} : ${jsonData}`); 
            }                                                                             
        });
    }

    open() {
        try {
            return new Promise((res, rej) => {
                this.serial.open(function(err) {
                    if(err) {
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
                this.serial.close(function(err) {
                    if(err) {
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