const mysql = require('mysql');
const config = require('../../../config/db.conf');

const connection = mysql.createConnection(config);

export default connection
