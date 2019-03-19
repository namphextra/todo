import Connection from './index'
import Util from 'util'

class User {
  public async createUser (username: string, hash: string, email: string) {
    const queryString = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}')`;

    const query = Util.promisify(Connection.query);
    const result = await query(queryString);
    console.log(result);
  }
}

export default User
