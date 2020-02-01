import { Express } from 'express';
import cors from 'cors';
import Controller from './controllers';

const express = require('express');

const app: Express = express();
const port = process.env.PORT || 2400;
// const corsOptions: cors.CorsOptions = {
//   origin: '*',
//   methods: 'GET,POST,DELETE,PUT,PATCH,HEAD,OPTIONS',
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
// };

app.use(cors);

const controller = new Controller(app);

controller.init();

console.log('Init app done!!!');
app.listen(port);
