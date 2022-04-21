const Router = require('@koa/router');

class Handler extends Router {
  constructor(prefix) {
    super();

    this.prefix(prefix);
  }

  async init() {}
}

module.exports = Handler;