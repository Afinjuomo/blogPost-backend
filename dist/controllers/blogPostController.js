"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPosts = exports.searchBlogPosts = exports.updateBlogPosts = exports.getPostById = exports.getAllBlogPosts = exports.createBlogPost = exports.checkPostExists = void 0;
const blogPostModel_1 = __importDefault(require("../models/blogPostModel"));
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
const checkPostExists = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await blogPostModel_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.checkPostExists = checkPostExists;
const createBlogPost = async (req, res) => {
    const { title, content, author, } = req.body;
    const id = (0, uuid_1.v4)();
    try {
        const post = await blogPostModel_1.default.create({
            id,
            title,
            content,
            author,
        });
        res.json(post);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.createBlogPost = createBlogPost;
const getAllBlogPosts = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    try {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const posts = await blogPostModel_1.default.findAll({
            offset,
            limit,
        });
        res.json(posts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.getAllBlogPosts = getAllBlogPosts;
// Get a specific blog post by ID
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await blogPostModel_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getPostById = getPostById;
const updateBlogPosts = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    try {
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content required",
            });
        }
        const post = await blogPostModel_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }
        post.title = title;
        post.content = content;
        await post.save();
        res.json(post);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.updateBlogPosts = updateBlogPosts;
const searchBlogPosts = async (req, res) => {
    const { query } = req.query;
    try {
        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }
        const posts = await blogPostModel_1.default.findAll({
            where: {
                title: {
                    [sequelize_1.Op.like]: `%${query}%`,
                },
            },
        });
        res.json(posts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.searchBlogPosts = searchBlogPosts;
const deleteBlogPosts = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await blogPostModel_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        await post.destroy();
        res.json({
            message: "Post deleted successfully",
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.deleteBlogPosts = deleteBlogPosts;
function v4() {
    throw new Error("Function not implemented.");
}
