import Util from 'util'
import Connection from './index';

class Base {
  query: any = Util.promisify(Connection.query).bind(Connection);
}

export default Base
