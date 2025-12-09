import dotenv from 'dotenv';
import { config } from './env.js';

dotenv.config();

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
    // production: {
    //       username: config.db.username,
    //     password: config.db.password,
    //     database: config.db.name,
    //     host: config.db.name,
    //     port: config.db.port,
    //     dialect: "postgres",
    // }
};