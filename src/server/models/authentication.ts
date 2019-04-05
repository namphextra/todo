import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config/dev.conf';
import Base from './base';

interface CreateCredential {
  success: boolean,
  token: string,
  message: string
}

class Authentication extends Base {
  public async createCredential(username: string, password: string): Promise<CreateCredential> {
    const queryString = `SELECT * FROM users WHERE username = '${username}'`;
    const response: CreateCredential = {
      success: true,
      message: '',
      token: '',
    };
    try {
      const result = await this.query(queryString);
      const validate = bcrypt.compareSync(password, result[0].password);
      const payload: object = { check: true };
      if (validate) {
        const token = jwt.sign(payload, config.secret, { expiresIn: 3600 });
        response.success = true;
        response.token = token;
      } else {
        response.success = false;
        response.message = 'Invalid user or password';
      }
      return response;
    } catch (e) {
      return {
        success: false,
        message: e,
        token: '',
      };
    }
  }
}

export default Authentication;
