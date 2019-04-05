import bcrypt from 'bcrypt';
import express from 'express';
import HTTPStatus from 'http-status';
import Base from './base';
import UserModel from '../models/user';
import Middleware from '../middleware';

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
      const salt = bcrypt.genSaltSync(saltRound);
      const hash = bcrypt.hashSync(password, salt);
      const result = await this._model.createUser(username, hash, email);
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
    this._router.get('/', this._middleware.authenJWT, (req: any, res: any) => {
      res.status(HTTPStatus.OK).send({ success: true });
    });
  }
}

export default User;
