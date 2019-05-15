import Base from './base';
import * as Entities from '../entities';
import * as MysqlUtils from '../utils/mysql';

class User extends Base {
  private _user: Entities.User = Entities.getDefaultUser()

  private _table: MysqlUtils.Table = {
    Name: 'users',
    AutoUpdateTimeColumns: ['updated_at'],
    DateTimeColumns: ['updated_at', 'created_at'],
  }

  public async createUser(user: Entities.User) {
    const sqlTool = MysqlUtils.createMysqlTool({ table: this._table, type: 'insert' });
    sqlTool.prepareQuery(user);

    const queryString = `INSERT INTO ${sqlTool.getTableName()} (${sqlTool.getColumns()}) VALUES (${sqlTool.getValue()})`;

    try {
      await sqlTool.insert(queryString);
      return { success: true };
    } catch (e) {
      return { success: false, message: e };
    }
  }

  public async getAllUser() {
    const sqlTool = MysqlUtils.createMysqlTool({ table: this._table, type: 'select' });
    sqlTool.prepareQuery(this._user);

    const queryString = `SELECT ${sqlTool.getColumns()} FROM ${sqlTool.getTableName()}`;
    try {
      const result = await sqlTool.select(queryString);
      return { success: true, users: result };
    } catch (e) {
      return { success: false, message: e };
    }
  }
}

export default User;
