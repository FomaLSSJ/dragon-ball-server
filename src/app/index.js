const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const mount = require('koa-mount');

const Database = require('../system/database');
const Router = require('../router');
const Config = require('../system/config');
const ErrorMiddleware = require('../middleware/error');

/**
 * Класс инстанса сервер
 * @module Server
 * @extends Koa
 * @returns {Server}
 */
class Server extends Koa {
  /**
   * Конструктор класса расширяется Koa
   * @public
   * @returns
   */
  constructor() {
    super();

    this.host = Config.host;
    this.port = Config.port;
    this.router = new Router();

    this.init();
  }

  /**
   * Функция инициализации сервера
   * Запуска базы данных и подключения роутера
   * @private
   * @returns
   */
  async init() {
    await Database.init();

    this
    .use(cors())
    .use(bodyParser())
    .use(ErrorMiddleware)
    .use(this.router.routes())
    .use(this.router.allowedMethods())
    .use(mount('/public', serve('./public')));
  }

  /**
   * Функция запуска сервера
   * @public
   * @returns
   */
  async start() {
    this.listen(this.port, this.host, () => console.log(`Server started on ${ this.host }:${ this.port }`));
  }
}

module.exports = Server;
