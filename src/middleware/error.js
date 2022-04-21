module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);

    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
    ctx.app.emit('error', err, ctx);
  }
};
