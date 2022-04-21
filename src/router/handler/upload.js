const multer = require('@koa/multer');
const Handler = require('../handler');
const { PATHS } = require('../../constants');

class UploadHandler extends Handler {
  constructor() {
    super(PATHS.UPLOAD.PREFIX);

    this.diskStorage = multer.diskStorage({
      destination: './public',
      filename: (_, file, cb) => cb(null, file.originalname)
    });

    this.upload = multer({ storage: this.diskStorage });

    this.init();
  }

  async init() {
    this.put(PATHS.UPLOAD.CREATE, this.upload.single('image'), (ctx) => {
      ctx.body = ctx.file;  
    });
  }
}

module.exports = UploadHandler;
