import Base from './base';

class User extends Base {
  public async createUser(username: string, hash: string, email: string) {
    const queryString = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}')`;

    try {
      await this.query(queryString);
      return { success: true };
    } catch (e) {
      return { success: false, message: e };
    }
  }
}

export default User;
