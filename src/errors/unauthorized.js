const { ERROR_STATUSES, ERROR_MESSAGES } = require('../constants');
const BaseError = require('./base-error');

class ErrorUnauthorized extends BaseError {
  constructor() {
    super(ERROR_MESSAGES.UNAUTHORIZED, ERROR_STATUSES.UNAUTHORIZED);
  }
}

module.exports = ErrorUnauthorized;