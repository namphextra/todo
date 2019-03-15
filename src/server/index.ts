import express from 'express';
import models from './models/index';
import Controller from './controllers'
import Middleware from './middleware'

const app = express();
const port = process.env.PORT || 2400;

new Middleware(app);
models.connect();
new Controller(app);
models.end();

app.listen(port);
