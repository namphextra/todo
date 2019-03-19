import Base from './base'
import Model from '../models/authentication'

class Authentication extends Base{
  private _model: any = new Model();
  constructor (app: any) {
    super(app)
  }
  public createCredential() {
    this.app.post('/auth/credentials', (req: any, res: any) => {
      const { username } = req.body;
      const { password } = req.body;
      const result = this._model.createCredential(username, password)
      if (result.success) {

      }
    });
  }
}

export default Authentication
