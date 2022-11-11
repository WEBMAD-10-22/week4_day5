const router = require('express').Router();
const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');

/**
 * Todas las rutas empiezas por /post
 */

router.get('/', (req, res) => {
  res.render('post/create');
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  PostModel.findById(id)
    .populate('user', 'username')
    .populate({ path: 'comments', populate: { path: 'user'} })
    .then((post) => {
      console.log(post);
      res.render('post/index', post);
    })
    .catch((err) => next(err));
});

/**
 * ----------- POST -----------
 */

router.post('/create', (req, res, next) => {
  const { title, description, user } = req.body;

  // user -- nombre del user, pero necesito su ID

  UserModel.findOne({ username: user })
    .then((userDB) => {
      if (user) {
        return PostModel.create({ title, description, user: userDB._id });
      } else {
        // :(
      }
    })
    .then((postCreated) => {
      res.redirect(`/post/${postCreated._id}`);
    })
    .catch((err) => next(err));
});

module.exports = router;
