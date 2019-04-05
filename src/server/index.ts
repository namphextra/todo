import express from 'express';
import Controller from './controllers';

const app = express();
const port = process.env.PORT || 2400;

const controller = new Controller(app);
controller.init();

app.listen(port);
