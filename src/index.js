import express from 'express';
import { Router } from 'express';
import { config } from './config/env.js';

const tony = express();

const router = Router();

tony.use(router);

tony.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`)
});

router.get('/', (req, res) => {
    // console.log("This is the landing page")
    res.send("Hello World")
});

router.get('/users', (req, res) => {
    // console.log("This is the landing page")
    res.send("This is the user page")
});