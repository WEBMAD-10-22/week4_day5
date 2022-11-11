const router = require('express').Router();
const CommentModel = require('../models/Comment.model');
const PostModel = require('../models/Post.model');

router.post('/:idPost', (req, res, next) => {
  const { title, user } = req.body;
  const { idPost } = req.params;

  CommentModel.create({ title, user })
  .then((comment) => {
    return PostModel.findByIdAndUpdate(idPost, { $push: { comments: comment._id} })
  })
  .then(() => {
    res.redirect(`/post/${idPost}`);
  }).catch((err) => {
    next(err);
  })
});

module.exports = router;