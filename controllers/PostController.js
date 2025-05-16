const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['created_at', 'DESC']]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({ title, content });
        res.status(201).json(post);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                errors: error.errors.map(e => e.message)
            });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title && !content) {
            return res.status(400).json({
                error: 'Provide title or content to update'
            });
        }

        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (title) post.title = title;
        if (content) post.content = content;

        await post.save();
        res.json(post);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                errors: error.errors.map(e => e.message)
            });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await post.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
