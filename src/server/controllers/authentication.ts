import express from 'express';
import HTTPStatus from 'http-status';
import Base from './base';
import Model from '../models/authentication';
import OAuth from '../utils/google/oAuth';

class Authentication extends Base {
  private _model: any = new Model()

  private _router = express.Router()

  public init() {
    this.app.use('/api/v1/auth', this._router);
    this._createCredential();
    this._getGoogleURL();
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

  private _verifyGoogleOAuth() {
    this._router.get('/google-auth-callback', (req: any, res: any) => {

    });
  }

  private _getGoogleURL() {
    this._router.get('/google-auth', (req: any, res: any) => {
      const oAuth = new OAuth();
      res.status(HTTPStatus.OK).send({
        success: true,
        url: oAuth.getAuthURL(),
      });
    });
  }
}

export default Authentication;
