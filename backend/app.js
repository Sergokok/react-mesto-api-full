require('dotenv').config();

/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');

//добавляем новые зависимости
const helmet = require('helmet'); //для установки заголовков безопасности
const cors = require('cors'); // для к другим доменам
const rateLimit = require('express-rate-limit'); //для ограничения количества запросов

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser, login, logout } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const ServerError = require('./errors/server-err');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

const app = express();

const allowedCors = [
  'https://ТВОЙ ДОМЕН',
  'http://ТВОЙ ДОМЕН',
  'https://localhost:3000',
  'http://localhost:3000',
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowedCors.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false, credentials: true };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

// подключаемся к серверу
// app.use(
//   cors({
//     origin: [
//       'https://ТВОЙ ДОМЕН',
//       'http://ТВОЙ ДОМЕН',
//     ],
//     credentials: true,
//   }),
// );

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use(errorLogger);

async function start(req, res, next) {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await app.listen(PORT);
  } catch (err) {
    next(new ServerError('Ошибка сервера'));
  }
}
start();

// роут для авторизации выхода
app.get('/logout', logout);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// eslint-disable-next-line no-undef
app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
});

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
