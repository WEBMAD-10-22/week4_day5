const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  user: { type: Types.ObjectId , ref: "User" }
}, {
  timestamps: true,
  versionKey: false
});

const CommentModel = model('Comment', commentSchema);

module.exports = CommentModel;
