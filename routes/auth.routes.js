// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const UserModel = require('../models/User.model');

/**
 * todas empiezan con /auth
 */

/**
 * ------------- GET -----------------
 */

router.get('/login', (req, res, next) => {
  res.render('index');
});

router.get('/user', (req, res, next) => {
  const user = {
    username: 'Pepe4',
    email: 'nose4@pepe.com',
    password: '4234',
  };

  UserModel.create(user)
    .then((userCreated) => {
      console.log(userCreated);
      res.render('user/user', userCreated);
    })
    .catch((err) => next(err));
});

router.get('/signup', (req, res) => {
  res.render('user/create');
});

router.get('/users', (req, res) => {
  UserModel.find()
    .then((users) => {
      res.render('user/users', { users });
    })
    .catch((err) => next(err));
});

router.get('/user/:id', (req, res, next) => {
  const { id } = req.params;

  UserModel.findById(id)
    .then((user) => {
      res.render('user/user', user);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/user/:idEdit/edit', (req, res, next) => {
  const { idEdit } = req.params;

  UserModel.findById(idEdit)
    .then((user) => {
      res.render('user/edit', user);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/user/:idDelete/delete', (req, res, next) => {
  const { idDelete } = req.params;

  UserModel.findByIdAndDelete(idDelete)
    .then(() => {
      res.redirect('/auth/users')
    })
    .catch((err) => {
      next(err);
    });
});

/**
 *  --------------- POST ---------------
 */

router.post('/signup', (req, res, next) => {
  console.log(req.body); // --> { username, emai, password }
  const { username, email, password } = req.body;
  UserModel.create({ username, email, password })
    .then((userCreated) => {
      console.log(userCreated);
      res.render('user/user', userCreated);
    })
    .catch((err) => next(err));
});

router.post('/user/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  // UserModel.updateOne({ _id: id }, { username, email, password })
  //   .then(() => {
  //     res.redirect(`/auth/user/${id}`);
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
  UserModel.findByIdAndUpdate(id, { username, email, password }, { new: true })
    .then((userEdit) => {
      res.render('user/user', userEdit);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
