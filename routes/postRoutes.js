const express = require("express");
const verifyToken = require('../middleware/virefyToken')
const router = express.Router();
const   Posts= require("../controllers/postController");

router.get("/",verifyToken,Posts.getAllPostsController);
router.get('/search',verifyToken,Posts.searchPostController);
router.get('/:id',verifyToken,Posts.getPostsByIdController);
router.post('/',verifyToken,Posts.createPostController);
router.put('/:id',verifyToken,Posts.updatPostController);
router.delete('/:id',verifyToken,Posts.deletePostController);



module.exports = router;
