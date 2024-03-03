const mongoose = require("mongoose");
const post = require("../models/post");

const getPostsByIdController = async (req, res) => {
  try {
    const blog = await post.findOne({ _id: req.params.id });

    if (!blog || blog.length === 0) {
      return res.status(404).send("Blog not found");
    }
    console.log(blog);
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};
const getPostsByTitleController = async (req, res) => {
  try {
    console.log(req.params.title);
    const blog = await post.find({ title: req.params.title });

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    console.log(blog);
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};
const getPostsByAuthorController = async (req, res) => {
  try {
    const blog = await post.find({ author: req.params.author });

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    console.log(blog);
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

const getPostsController = async (req, res) => {
  try {
    const blog = await post.find();

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    console.log(blog);
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

const createPostController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.session.user.id;
    //console.log(req.session.user.id);
    await post.insertMany({ title, content, author });

    res.status(201).send("Posts created successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updatPostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.session.user.id;
    const isAdmin = req.session.user.roles === "admin";
    let query = { _id: postId };

    if (!isAdmin) {
      query.author = userId;
    }

    const updatedPost = await post.updateOne(query, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res
        .status(404)
        .send("Post not found or you are not authorized to update this post");
    }

    console.log(updatedPost);
    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

const deletePostController = async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.user.id;
  const isAdmin = req.session.user.roles === "admin";

  try {
    let query = { _id: postId };

    if (!isAdmin) {
      query.author = userId;
    }

    const postDelet = await post.deleteOne(query);
    if (postDelet.deletedCount === 0) {
      return res
        .status(404)
        .send("Post not found or you are not authorized to delete this post");
    }
    res.status(201).send("Deleted!!!!");
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};
module.exports = {
  createPostController,
  getPostsByIdController,
  getPostsByTitleController,
  getPostsByAuthorController,
  updatPostController,
  deletePostController,
  getPostsController,
};
