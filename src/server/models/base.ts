import Util from 'util';
import Connection from './database';

class Base {
  protected query: any = Util.promisify(Connection.query).bind(Connection);
}

export default Base;
