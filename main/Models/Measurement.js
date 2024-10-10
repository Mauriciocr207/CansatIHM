import { DataTypes, Model } from 'sequelize';
import sequelize from '../Database/init.js';

export default class Measurement extends Model {}

Measurement.init({
  time: DataTypes.INTEGER,
  temperature: DataTypes.FLOAT,
  pressure: DataTypes.FLOAT,
  velocity: DataTypes.FLOAT,
  height : DataTypes.FLOAT,
  aceleration: DataTypes.FLOAT,
  angle_x: DataTypes.FLOAT,
  angle_y: DataTypes.FLOAT,
  angle_z: DataTypes.FLOAT,
  latitude_cp: DataTypes.FLOAT,
  length_cp: DataTypes.FLOAT,
  latitude_cs: DataTypes.FLOAT,
  length_cs: DataTypes.FLOAT,
}, {
  sequelize,
  timestamps: false,
  modelName: 'measurement',
});
