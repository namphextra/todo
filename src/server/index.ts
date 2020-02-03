import { Express } from 'express';
import Controller from './controllers';

const express = require('express');

const app: Express = express();
const port = process.env.PORT || 2400;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello bitch');
})

const controller = new Controller(app);

controller.init();

console.log('Init app done!!!');
app.listen(port);
