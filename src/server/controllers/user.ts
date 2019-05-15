import bcrypt from 'bcrypt';
import express from 'express';
import HTTPStatus from 'http-status';
import Base from './base';
import UserModel from '../models/user';
import * as Entities from '../entities';

class User extends Base {
  private _model = new UserModel()

  private _router = express.Router()

  public init() {
    this.app.use('/api/v1/user', this._router);
    this._createUser();
    this._getUser();
  }

  private _createUser() {
    this._router.post('/', async (req: any, res: any) => {
      const { username } = req.body;
      const { password } = req.body;
      const { email } = req.body;
      const saltRound = 5;
      const salt = await bcrypt.genSaltSync(saltRound);
      const hash = await bcrypt.hashSync(password, salt);
      const user: Entities.User = Entities.getDefaultUser();
      user.Email = email;
      user.Password = hash;
      user.Username = username;
      user.CreatedAt = Math.floor(new Date().getTime() / 1000);

      const result = await this._model.createUser(user);
      if (result.success) {
        res.status(HTTPStatus.CREATED).send({ success: true });
      } else {
        res
          .status(HTTPStatus.INTERNAL_SERVER_ERROR)
          .send({ success: false, message: result.message });
      }
    });
  }

  private _getUser() {
    this._router.get('/', this._middleware.authenJWT, async (req: any, res: any) => {
      const result = await this._model.getAllUser();

      if (result.success) {
        res.status(HTTPStatus.OK).send({ success: true, users: result.users });
      } else {
        res
          .status(HTTPStatus.INTERNAL_SERVER_ERROR)
          .send(result.message);
      }
    });
  }
}

export default User;
