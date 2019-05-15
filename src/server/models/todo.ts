import Base from './base';
import * as MysqlUtils from '../utils/mysql/index';
import * as Entities from '../entities/index';

class Todo extends Base {
  private _todo: Entities.Todo = Entities.getDefaultTodo()

  private _table: MysqlUtils.Table = {
    Name: 'todos',
    AutoUpdateTimeColumns: ['updated_at'],
    DateTimeColumns: ['updated_at', 'created_at'],
  }

  public async createTodo(todo: Entities.Todo) {
    const sqlTool = MysqlUtils.createMysqlTool({ table: this._table, type: 'insert' });
    sqlTool.prepareQuery(todo);
    const queryString = `INSERT INTO ${sqlTool.getTableName()} (${sqlTool.getColumns()}) VALUES (${sqlTool.getValue()})`;

    try {
      await sqlTool.insert(queryString);
      return { success: true };
    } catch (e) {
      return { success: false, message: e };
    }
  }

  public async getAllTodo() {
    const sqlTool = MysqlUtils.createMysqlTool({ table: this._table, type: 'select' });
    sqlTool.prepareQuery(this._todo);
    const queryString = `SELECT ${sqlTool.getColumns()} FROM ${sqlTool.getTableName()}`;

    try {
      const result = await sqlTool.select(queryString);
      return { success: true, todos: result };
    } catch (e) {
      return { success: false, message: e };
    }
  }
}

export default Todo;
