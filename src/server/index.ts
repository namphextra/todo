import express from 'express';
import Controller from './controllers';

const cors = require('cors');

const app = express();
const port = process.env.PORT || 2400;

app.use(cors({
  origin: '*',
  optionSuccessStatus: 200,
}));

const controller = new Controller(app);

controller.init();

console.log('Init app done!!!');
app.listen(port);
