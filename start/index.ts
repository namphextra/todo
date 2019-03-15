require('babel-register')({
  preset: ['env'],
});

module.exports = require('../src/server/index');
