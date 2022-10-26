const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/authorization-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
      },
      message: 'Некорректный URL',
    },
  },
  password: {
    type: String,
    required: [true, 'Данное поле должно быть заполнено'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Данное поле должно быть заполнено'],
    unique: true,
    validate: {
      validator:
        validator.isEmail,
      message: 'Неверный формат почты',
    },
  },
});

// сравнение пароля введенного пользователем и пароля из базы
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};
// метод для хеширования пароля
userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject(); // возвращает объект без метаданных
  delete user.password; // удаляем пароль из объекта
  return user; // возвращаем объект без пароля
};

module.exports = mongoose.model('user', userSchema);
