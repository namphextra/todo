import BodyParser from 'body-parser';
import Middleware from '../middleware/index';

class Base {
  protected app: any;

  protected _middleware: any = new Middleware()

  constructor(app: any) {
    this.app = app;
    this.app.use(BodyParser.urlencoded({ extended: false }));
    this.app.use(BodyParser.json());
  }
}

export default Base;
