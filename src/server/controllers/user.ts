import Base from './base';
import bcrypt from "bcrypt";
import UserModel from '../models/user';

class User extends Base {
  private _model: any = new UserModel();
  constructor(app: any) {
    super(app)
  }
  public createUser() {
    this.app.post('/api/v1/user', (req: any, res: any) => {
      const { username } = req.body;
      const { password } = req.body;
      const { email } = req.body;
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(password, salt);
      this._model.createUser(username, hash, email);
      res.send({ success: true })
    });
  }
}

export default User
