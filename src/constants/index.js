const PATHS = Object.freeze({
  PREFIX: '/api',
  GAME: {
    PREFIX: '/games',
    CREATE: '/',
    LIST: '/',
    ID: '/:id',
    UPDATE: '/:id',
    DELETE: '/:id'
  },
  UPLOAD: {
    PREFIX: '/upload',
    CREATE: '/'
  }
});

const ERROR_STATUSES = Object.freeze({
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406
});

const ERROR_MESSAGES = Object.freeze({
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND: 'Not found',
  NOT_ACCEPTABLE: 'Not acceptable'
});

module.exports = {
  PATHS,
  ERROR_STATUSES,
  ERROR_MESSAGES
};