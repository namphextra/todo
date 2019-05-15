import User from './user';
import Todo from './todo';
import Authentication from './authentication';

class Controller {
  private _user: any = null

  private _auth: any = null

  private _todo: any = null

  constructor(app: any) {
    this._user = new User(app);
    this._auth = new Authentication(app);
    this._todo = new Todo(app);
  }

  public init() {
    this._user.init();
    this._auth.init();
    this._todo.init();
  }
}

export default Controller;
