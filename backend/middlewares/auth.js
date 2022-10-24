// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');

// добавляем NODE_ENV
// const { NODE_ENV, JWT_SECRET = 'super-secret-key' } = process.env;
const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    let payload;
    // тут меняем  и делаем вариант с NODE_ENV
    // try {
    //   payload = jwt.verify(token, JWT_SECRET);
    // } catch (err) {
    //   return next(new AuthorizationError('Необходима авторизация'));
    // }
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
    } catch (err) {
      return next(new AuthorizationError('Необходимо авторизоваться'));
}

    req.user = payload;

    next();
  } else {
    return next(new AuthorizationError('Необходима авторизация'));
  }
};

module.exports = auth;
