const { ERROR_STATUSES, ERROR_MESSAGES } = require('../constants');
const BaseError = require('./base-error');

class ErrorNotAcceptable extends BaseError {
  constructor(message) {
    super(message || ERROR_MESSAGES.NOT_ACCEPTABLE, ERROR_STATUSES.NOT_ACCEPTABLE);
  }
}

module.exports = ErrorNotAcceptable;