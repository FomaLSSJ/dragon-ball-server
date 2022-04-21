const Handler = require('./handler');
const GameRouter = require('./handler/game');
const UploadRouter = require('./handler/upload');

class ApiRouter extends Handler {
  constructor(prefix) {
    super(prefix);

    this.gameRouter = new GameRouter();
    this.uploadRouter = new UploadRouter();

    this.init();
  }

  async init() {
    this.use(this.gameRouter.routes());
    this.use(this.gameRouter.allowedMethods());
    this.use(this.uploadRouter.routes());
    this.use(this.uploadRouter.allowedMethods());
  }
}

module.exports = ApiRouter;
