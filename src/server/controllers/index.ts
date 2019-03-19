import User from './user'
import Authentication from './authentication'

class Controller {
  constructor(app: any) {
    const user: any = new User(app);
    const auth: any = new Authentication(app);
    user.createUser();
    auth.createCredential();
    app.get('/api/v1/user', (req: any, res: any) => {
      console.log(res);
      res.send({ success: true });
    });


  }
}

export default Controller
