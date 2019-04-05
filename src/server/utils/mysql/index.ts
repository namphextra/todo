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
  private readonly _type: string = 'select'

  private _table: Table = { Name: '', DateTimeColumns: [], AutoUpdateTimeColumns: [] }

  private _column: Array<string> = []

  private _value: Array<string> = []

  constructor(args: CreateToolInput) {
    this._table = args.table;
    this._type = args.type;
  }

  public prepareQuery(entities: any): void {
    this._column = Object.keys(entities);

    switch (this._type) {
      case 'insert':
      case 'update':
        this._value = Object.values(entities);
        break;
      case 'get':
        break;
      default:
        break;
    }
  }

  public getColumns(): string {
    return this._column.join(',');
  }

  public getValue(): string {
    return this._value.join(',');
  }

  public getTableName(): string {
    return this._table.Name;
  }
}


export function createMysqlTool(input: CreateToolInput) {
  return new MysqlFactory(input);
}
