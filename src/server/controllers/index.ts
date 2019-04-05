import User from './user';
import Authentication from './authentication';

class Controller {
  private _user: any = null

  private _auth: any = null

  constructor(app: any) {
    this._user = new User(app);
    this._auth = new Authentication(app);
  }

  public init() {
    this._user.init();
    this._auth.init();
  }
}

export default Controller;
