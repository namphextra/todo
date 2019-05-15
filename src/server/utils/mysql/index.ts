import Moment from 'moment';
import Util from 'util';
import Connection from '../../models/database';
import * as Utils from '../index';

export interface Table {
  Name: string,
  DateTimeColumns: Array<string>,
  AutoUpdateTimeColumns: Array<string>,
}

interface CreateToolInput {
  table: Table
  type: string
}

class MysqlFactory {
  private readonly _type: string = 'select';

  private _table: Table = { Name: '', DateTimeColumns: [], AutoUpdateTimeColumns: [] };

  private _column: Array<string> = [];

  private _value: Array<string> = [];

  private _entity: any = {};

  private query: any = Util.promisify(Connection.query).bind(Connection);

  constructor(args: CreateToolInput) {
    this._table = args.table;
    this._type = args.type;
  }

  public prepareQuery(entities: object): void {
    const keys = Utils.convertCamelCaseToSnakeCase(Object.keys(entities));
    const values = Object.values(entities);

    for (let i = 0; i < keys.length; i += 1) {
      this._entity[keys[i]] = values[i];
    }

    switch (this._type) {
      case 'insert':
      case 'update': {
        this._entity = MysqlFactory.removePrimaryKey(this._entity);
        this._value = this.overrideValueOfAutoUpdateColumns();
        this._column = Utils.convertCamelCaseToSnakeCase(Object.keys(this._entity));
        break;
      }
      case 'select':
        this._column = Utils.convertCamelCaseToSnakeCase(Object.keys(this._entity));
        break;
      default:
        break;
    }
  }

  public getColumns(): string {
    return this._column.join(',');
  }

  public getValue(): string {
    const queryColumn = this._value.map(v => `"${v}"`);
    return queryColumn.join(',');
  }

  public getTableName(): string {
    return this._table.Name;
  }

  public async select(queryString: string) {
    const queryResult = await this.query(queryString);
    const queryKeys = Object.keys(queryResult);
    const queryValues: any = Object.values(queryResult);
    let result: any = [];
    for (let i = 0; i < queryKeys.length; i += 1) {
      const rowKeys = Object.keys(queryValues[i]);
      const rowValues: any = Object.values(queryValues[i]);
      const rows: any = {};
      for (let j = 0; j < rowKeys.length; j += 1) {
        if (this._table.DateTimeColumns.indexOf(rowKeys[j]) !== -1) {
          rowValues[j] = Math.floor(new Date(rowValues[j]).getTime() / 1000);
        }
        rows[rowKeys[j]] = rowValues[j];
      }
      result = [...result, rows];
    }
    return result;
  }

  public async insert(queryString: string) {
    const queryResult = await this.query(queryString);
    return queryResult;
  }

  public async update(queryString: string) {
    const queryResult = await this.query(queryString);
    return queryResult;
  }

  private overrideValueOfAutoUpdateColumns(): Array<string> {
    const values: any = Object.values(this._entity);
    const keys = Object.keys(this._entity);
    const currentTimeStamp = Moment().unix();
    for (let i = 0; i < keys.length; i += 1) {
      if (this._table.AutoUpdateTimeColumns.indexOf(keys[i]) !== -1) {
        values[i] = Moment(currentTimeStamp * 1000).format('YYYY-MM-DD HH:MM:SS');
        continue;
      }
      if (this._table.DateTimeColumns.indexOf(keys[i]) !== -1) {
        values[i] = Moment(values[i] * 1000).format('YYYY-MM-DD HH:MM:SS');
      }
      if (typeof values[i] === 'boolean') {
        values[i] = values[i] ? 1 : 0;
      }
    }
    return values;
  }

  private static removePrimaryKey(entities: object): object {
    const keys = Object.keys(entities);
    const values = Object.values(entities);
    let entitiesReal: object = {};
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== 'Id') {
        entitiesReal = { ...entitiesReal, ...{ [keys[i]]: values[i] } };
      }
    }
    return entitiesReal;
  }
}


export function createMysqlTool(input: CreateToolInput) {
  return new MysqlFactory(input);
}
