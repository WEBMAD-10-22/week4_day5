const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  user: { type: Types.ObjectId, ref: "User" },
  comments: [{ type: Types.ObjectId, ref: "Comment"}]
}, {
  timestamps: true,
  versionKey: false
});

const PostModel = model('Post', postSchema);


module.exports = PostModel;
