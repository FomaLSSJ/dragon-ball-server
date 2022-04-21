const mongoose = require('mongoose');
const Config = require('../config');

/**
 * Класс для работы c MongoDB
 * @private
 * @module Database
 * @returns 
 */
class Database {
  /**
   * Метод инициализации и подключения к MongoDB
   * @public
   * @returns
   */
  static async init() {
    const url = Config.dbconnect;

    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    mongoose.connection
      .once('open', () => console.log('Connected to database!'))
      .on('error', (err) => console.error('Connection error!', err));
  }
}

module.exports = Database;
