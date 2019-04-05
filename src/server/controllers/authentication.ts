import express from 'express';
import HTTPStatus from 'http-status';
import Base from './base';
import Model from '../models/authentication';

class Authentication extends Base {
  private _model: any = new Model()

  private _router = express.Router()

  public init() {
    this.app.use('/api/v1/auth', this._router);
    this._createCredential();
  }

  private _createCredential() {
    this._router.post('/credentials', async (req: any, res: any) => {
      const { username } = req.body;
      const { password } = req.body;
      const result = await this._model.createCredential(username, password);
      if (result.success) {
        res.status(HTTPStatus.OK).send({ success: true, token: result.token });
      } else {
        res.status(HTTPStatus.UNAUTHORIZED).send({ success: false, message: result.message });
      }
    });
  }
}

export default Authentication;
