const express = require("express");
const router = express.Router();

// Temporary in-memory storage
let posts = [{ content: "Welcome to DecentraNet!" }];

// GET all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// POST new post
router.post("/", (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  const newPost = { content };
  posts.push(newPost);
  res.status(201).json({ message: "Post created", post: newPost });
});

module.exports = router;
