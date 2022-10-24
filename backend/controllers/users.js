/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const AuthorizationError = require('../errors/authorization-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const ServerError = require('../errors/server-err');

//добавляем NODE_ENV в .env
const { NODE_ENV, JWT_SECRET = 'super-secret-key' } = process.env;

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({
    status: 'Выход выполнен',
  });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthorizationError('Неправильные почта или пароль'));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new AuthorizationError('Неправильные почта или пароль'));
    }
    // в продакшин режиме токен по-новому
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key', { expiresIn: '7d' });
    res.cookie('jwt', token, {
      httpOnly: true,
    });
    // const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    // res.cookie('jwt', token, {
    //   maxAge: 3600000 * 24 * 7,
    //   httpOnly: true,
    //   sameSite: true,
    // });
    return res.status(200).send(user);
  } catch (err) {
    return next(new ServerError('Ошибка сервера'));
  }
};

module.exports.getUserInfo = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    return next(new ServerError('Ошибка сервера'));
  }
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => next(new ServerError('Ошибка сервера')));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return next(new NotFoundError('Пользователь не найден'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегистрирован'),
        );
      } else {
        next(err);
      }
    });
};

// module.exports.createUser = (req, res, next) => {
//   const {
//     name, about, avatar, email, password,
//   } = req.body;
//   bcrypt.hash(password, 10)
//     .then((hash) => {
//       User.create({
//         name, about, avatar, email, password: hash,
//       })
//         .then((user) => {
//           res.send(user);
//         })
//         .catch((err) => {
//           if (err.name === 'ValidationError') {
//             return next(new BadRequestError('Некорректные данные'));
//           }
//           if (err.code === 11000) {
//             return next(new ConflictError('Пользователь с таким email уже существует'));
//           }
//           return next(new ServerError('Ошибка сервера'));
//         });
//     });
// };

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};
