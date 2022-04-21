const Router = require('@koa/router');
const ApiRouter = require('./api');
const { PATHS } = require('../constants');

/**
 * Класс основного роутера
 * @module Routes
 * @extends Router
 * @return {Routes}
 */
class Routes extends Router {
  constructor() {
    super();

    this.apiRouter = new ApiRouter(PATHS.PREFIX);

    this.init();
  }

  async init() {
    this.use(this.apiRouter.routes());
    this.use(this.apiRouter.allowedMethods());
  }
}

module.exports = Routes;
