import BodyParser from 'body-parser';
import { RequestOptions } from '../defines/interface';
import Middleware from '../middleware/index';

class Base {
  protected app: any;

  protected _middleware: any = new Middleware()

  constructor(app: any) {
    this.app = app;
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));
  }

  request(method: string, endpoint: string, options: RequestOptions, callback: any) {
    const methodFn = this.app[method];
    if (options.auth) {
      methodFn(endpoint, this._middleware.authenJWT, callback());
    } else {
      methodFn(endpoint, callback());
    }
  }
}

export default Base;
