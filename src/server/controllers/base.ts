import BodyParser from 'body-parser';

class Base {
  app: any;
  constructor(app: any) {
    this.app = app;
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));
  }
}

export default Base
