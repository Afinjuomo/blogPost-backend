import { Request, Response } from "express";
import BlogPost from "../models/blogPostModel";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

export const checkPostExists = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createBlogPost = async (req: Request, res: Response) => {
    const { title, content, author,  } = req.body;
    const id = uuidv4(); 
     

  
    try {
      const post = await BlogPost.create({
        id,
        title,
        content,
        author,
      });
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

export const getAllBlogPosts = async (
  req: Request,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;

  
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const posts = await BlogPost.findAll({
      offset,
      limit,
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get a specific blog post by ID
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateBlogPosts = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content required",
      });
    }

    const post = await BlogPost.findByPk(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const searchBlogPosts = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const posts = await BlogPost.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteBlogPosts = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();
    res.json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
function v4() {
    throw new Error("Function not implemented.");
}

