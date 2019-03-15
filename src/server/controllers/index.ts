import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connection from '../models'
import config from '../../../config/dev.conf'

class Controller {
  constructor(app: any) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/v1/user', (req: any, res: any) => {
      const { username } = req.body;
      const { password } = req.body;
      const { email } = req.body;
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(password, salt);
      const queryString = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}')`;

      connection.query(queryString, (err: any) => {
        if (err) throw err;
        res.send({ success: true });
      });
    });

    app.get('/api/v1/user', (req: any, res: any) => {
      console.log(res);
      res.send({ success: true });
    });

    app.post('/auth/credentials', (req: any, res: any) => {
      const { username } = req.body;
      const { password } = req.body;
      const queryString = `SELECT * FROM users WHERE username = '${username}'`;

      connection.query(queryString, (err: any, result: any) => {
        if (err) throw err;
        const validate = bcrypt.compareSync(password, result[0].password);
        const payload = { check: true };

        if (validate) {
          const token = jwt.sign(payload, config.secret, { expiresIn: 60 });
          res.json({
            success: true,
            token,
          });
        } else {
          res.send({ message: 'Invalid user or password' });
        }
      });
    });
  }
}

export default Controller
