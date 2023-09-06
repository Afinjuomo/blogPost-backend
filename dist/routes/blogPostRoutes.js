"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogPostController_1 = require("../controllers/blogPostController"); // Import your controller functions
const router = express_1.default.Router();
// Define your routes
router.get('/posts', blogPostController_1.getAllBlogPosts);
router.get('/posts/:id', blogPostController_1.getPostById);
router.post('/create', blogPostController_1.createBlogPost);
router.put('/posts/:id', blogPostController_1.updateBlogPosts);
router.delete('/posts/:id', blogPostController_1.deleteBlogPosts);
router.get('/search', blogPostController_1.searchBlogPosts);
exports.default = router;
