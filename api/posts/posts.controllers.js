const Author = require("../../models/Author");
const Post = require("../../models/Post");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    await Author.findByIdAndUpdate(req.author.id, {
      $push: { posts: newPost._id },
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res) => {
  try {
    const posts = await Post.find({}, "-createdAt -updatedAt")
      .populate("authorId", "name")
      .populate("tags", "name");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
