const { ERROR_STATUSES, ERROR_MESSAGES } = require('../constants');
const BaseError = require('./base-error');

class ErrorNotFound extends BaseError {
  constructor() {
    super(ERROR_MESSAGES.NOT_FOUND, ERROR_STATUSES.NOT_FOUND);
  }
}

module.exports = ErrorNotFound;