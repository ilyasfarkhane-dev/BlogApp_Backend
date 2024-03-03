const express = require("express");
const verifyToken = require("../middleware/isAuthenticated");
const router = express.Router();
const Posts = require("../controllers/postController");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");

router.get("/", isAuthenticated, Posts.getPostsController);

router.get("/:id", isAuthenticated, Posts.getPostsByIdController);
router.get("/title/:title", isAuthenticated, Posts.getPostsByTitleController);
router.get(
  "/author/:author",
  isAuthenticated,
  Posts.getPostsByAuthorController
);
router.post("/", isAuthenticated, Posts.createPostController);
router.put("/:id", isAuthenticated, Posts.updatPostController); // user can update just there posts
router.delete("/:id", isAuthenticated, Posts.deletePostController); // user can delete just there posts

module.exports = router;
