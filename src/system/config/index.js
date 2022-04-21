const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 3000,
  dbconnect: process.env.APP_DB_CONNECT || 'mongodb://localhost:27017/dragon-ball-games',
};
