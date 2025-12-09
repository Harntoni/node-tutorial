import { Sequelize } from "sequelize";
import { config } from "./env.js";

// export const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
//   host: config.db.host,
//   port: config.db.port,
//   dialect:'postgres'
// });



const isProduction = config.nodeEnv === 'production';


export const sequelize = new Sequelize(config.URL, {
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: isProduction ? {
      require: true,
      rejectUnauthorized: false
    } : false   // DISABLE SSL FOR LOCAL DEVELOPMENT
  }
});