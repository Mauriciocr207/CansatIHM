import { SerialPortConnection } from "./SerialPortConnection.js";

export class SerialManager {
    errMsg = null;
    connections = {};
    /**
     * 
     * @param {*} port 
     * @returns {SerialPortConnection}
     */
    getConnection(port) {
        if(!this.connections[port]) {
            this.connections[port] = new SerialPortConnection(port);
        }
        return this.connections[port];
    }
}