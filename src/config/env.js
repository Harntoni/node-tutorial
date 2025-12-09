import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    access: process.env.ACCESS,
    nodeEnv: process.env.NODE_ENV,
    URL: process.env.DATABASE_URL,
    db:{
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
    }

};