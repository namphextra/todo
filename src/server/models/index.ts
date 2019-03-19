import mysql from 'mysql'
import config from '../../../config/db.conf'

const connection = mysql.createConnection(config);

export default connection
