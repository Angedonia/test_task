const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/PostController');

router.get('/', PostsController.getAllPosts);
router.get('/:id', PostsController.getPostById);
router.post('/', PostsController.createPost);
router.put('/:id', PostsController.updatePost);
router.delete('/:id', PostsController.deletePost);

module.exports = router;
