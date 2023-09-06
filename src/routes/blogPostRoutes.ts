import express from 'express';
import {
  getAllBlogPosts,
  getPostById,
  createBlogPost,
  updateBlogPosts,
  deleteBlogPosts,
  searchBlogPosts,
} from '../controllers/blogPostController'; // Import your controller functions

const router = express.Router();

// Define your routes
router.get('/posts', getAllBlogPosts);
router.get('/posts/:id', getPostById);
router.post('/create', createBlogPost);
router.put('/posts/:id', updateBlogPosts);
router.delete('/posts/:id', deleteBlogPosts);
router.get('/search', searchBlogPosts);

export default router;
