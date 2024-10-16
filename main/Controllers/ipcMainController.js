import { SerialPort } from "serialport";
import { SerialManager } from "../Serial/SerialManager.js";
import Measurement from "../Models/Measurement.js";
const serialManager = new SerialManager();

export class ipcMainController {
    static async serialConnectionOpen(e, data) {
      const { port, id } = data;
      try {
        await serialManager.getConnection(port).open();
        e.reply(`serial:open:${id}`, {
          port, status: true, message: "Conectado Correctamente"
        });
      } catch (error) {
        e.reply(`serial:open:${id}`, {
          port, status: false, message: `Hubo un error. ${error}`
        });
      }
    }

    static async serialConnectionClose(e, data) {
      const { port, id } = data;
      try {
        await serialManager.getConnection(port).close();
        e.reply(`serial:close:${id}`, {
          port, status: true, message: "Puerto Cerrado"
        });
      } catch (error) {
        e.reply(`serial:close:${id}`, {
          port, status: false, message: `Hubo un error. ${error}`
        });
      }        
    }

    static serialListPorts(e) {
      SerialPort.list()
        .then(ports => e.reply('serial:list-ports', ports))
        .catch(err => console.log('error en ipcmain', err.message));
    }

    static async dbGetByPage(e, data) {
      try {
        const { page } = data;
        const perPage = 10;
        const {count, rows: measurementInstances} = await Measurement.findAndCountAll({
          offset: (+page - 1) * perPage, limit: perPage,
        });
        const measurements = measurementInstances.map(({dataValues}) => dataValues);
        e.reply('db:get-by-page', {
          status: true,
          measurements,
          pagination: {
            perPage,
            page,
            count,
            pages: Math.ceil(count / perPage),
          }
        })
      } catch (error) {
        e.reply('db:get-by-page', {
          status: false, message: "Ocurrió un error al obtener los datos"
        });
      }
    }

    static async dbGetAll(e, data) {
      try {
        const measurementInstances = await Measurement.findAll();
        const measurements = measurementInstances.map(({dataValues}) => dataValues);
        return {measurements};
      } catch (error) {
        return {
          status: false,
          message: `Ocurrió un error al obtener los datos: ${error.message}`
        }
      }
    }
}