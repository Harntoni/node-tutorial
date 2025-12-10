import { config } from './env.js';


export default {
    development: {
        username: config.db.username,
        password: config.db.password,
        database: config.db.name,
        host: config.db.host,
        port: config.db.port,
        dialect: "postgres",
    },
    // test: {
    //      username: config.db.username,
    //     password: config.db.password,
    //     database: config.db.name,
    //     host: config.db.name,
    //     port: config.db.port,
    //     dialect: "postgres",
    // },
    production: {
          use_env_variable: "DATABASE_URL",
         dialect: "postgres",
         dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
         }
    }
};