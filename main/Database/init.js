import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect:'sqlite',
    host: './cansat_db.sqlite',
});

export default sequelize;