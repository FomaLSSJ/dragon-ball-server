const { map } = require('lodash');
const GameModel = require('../model/Game');
const ErrorBase = require('../errors/base-error');
const ErrorNotFound = require('../errors/not-found');

/**
 * @typedef {Object} CreateGameItem
 * @property {String} name - название игры
 * @property {String} jpname - название игры на японском
 * @property {String} image - URL картинки
 * @property {String} region - регион (Japan|USA|Europe|Other)
 * @property {String} condition - состояние (Mint|Good|Bad)
 * @property {Array} kit - комплектация (Cartridge|Disk|Box|Manual|Bonus|Limited)
 * @property {String} note - какие-то записи
 */

/**
 * @typedef {Object} GameItem
 * @property {ObjectId} _id - идентификатор ObjectId
 * @property {String} name - название игры
 * @property {String} jpname - название игры на японском
 * @property {String} image - URL картинки
 * @property {String} region - регион (Japan|USA|Europe|Other)
 * @property {String} condition - состояние (Mint|Good|Bad)
 * @property {Array} kit - комплектация (Cartridge|Disk|Box|Manual|Bonus|Limited)
 * @property {String} note - какие-то записи
 * @property {Date} createdAt - время создания
 * @property {Date} updatedAt - время обновления
 */

/**
 * Контроллер с обработчиками для Games методов
 * @module GameController
 * @return GameController
 */
class GameController {
  /**
   * Метод создания новой записи
   * @public
   * @param {KoaContext} ctx - контекст входящего запроса
   * @param {CreateGameItem} body - объект из которого создаётся новая запись
   * @returns {GameItem} 
   */
  static async create(ctx) {
    const { body } = ctx.request;

    try {
      const result = await GameModel.create(body);

      ctx.status = 200;
      ctx.body = result;
    } catch (err) {
      throw new ErrorBase(err.message);
    }
  }

  /**
   * Метод поиска записи по ObjectId
   * @public
   * @param {KoaContext} ctx - контекст входящего запроса
   * @param {String} ctx.params.id - идентификатор записи
   * @returns {GameItem} 
   */
  static async getById(ctx) {
    const { id } = ctx.params;

    const game = await GameModel.findById(id);

    if (!game) {
      throw new ErrorNotFound();
    }

    ctx.status = 200;
    ctx.body = game.toObject();
  }

  /**
   * Метод получения списка записей
   * @public
   * @param {KoaContext} ctx - контекст входящего запроса
   * @returns {Array<GameItem>}
   */
  static async getList(ctx) {
    const { query } = ctx;

    const games = await GameModel.find(query);

    ctx.status = 200;
    ctx.body = map(games, (x) => x.toObject());
  }

  /**
   * Метод создания обновления записи по ObjectId
   * @public
   * @param {KoaContext} ctx - контекст входящего запроса
   * @param {String} ctx.params.id - идентификатор записи
   * @param {CreateGameItem} body - объект из которого обновляется запись
   * @returns {GameItem} 
   */
  static async updateById(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    try {
      const game = await GameModel.findByIdAndUpdate(id, {
        $set: body
      }, {
        new: true
      });

      ctx.status = 200;
      ctx.body = game;
    } catch (err) {
      throw new ErrorBase(err.message);
    }
  }

  /**
   * Метод для удаления записи по ObjectId
   * @public
   * @param {KoaContext} ctx - контекст входящего запроса
   * @returns
   */
  static async deleteById(ctx) {
    const { id } = ctx.params;

    try {
      await GameModel.deleteOne({ _id: id });

      ctx.status = 204;
      ctx.body = {};
    } catch (err) {
      throw new ErrorBase(err.message);
    }
  }
}

module.exports = GameController;
