const Handler = require('../handler');
const GameController = require('../../controller/game');
const { PATHS } = require('../../constants');

class UserHandler extends Handler {
  constructor() {
    super(PATHS.GAME.PREFIX);

    this.init();
  }

  async init() {
    this.post(PATHS.GAME.CREATE, GameController.create);
    this.get(PATHS.GAME.LIST, GameController.getList);
    this.get(PATHS.GAME.ID, GameController.getById);
    this.delete(PATHS.GAME.DELETE, GameController.deleteById);
    this.put(PATHS.GAME.UPDATE, GameController.updateById);
  }
}

module.exports = UserHandler;