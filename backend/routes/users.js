const userRouter = require('express').Router();
// eslint-disable-next-line import/no-unresolved
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserInfo,
  getUserId,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);

userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().regex(/^[0-9a-f]{24}$/i),
    }),
  }),
  getUserId,
);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
  }),
}), updateAvatar);

module.exports = userRouter;
