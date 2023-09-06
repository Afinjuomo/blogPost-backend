import { DataTypes, Model } from "sequelize";
import { db } from "../config";

export type IBlogPost = {
  id: string; 
  title: string;
  content: string;
  author: string;
 
};

class BlogPost extends Model<IBlogPost> {
    id!: string;
    title!: string;
    content!: string;
    author!: string;
}

BlogPost.init(
  {
    id: {
      type: DataTypes.UUID, 
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "blogPost",
  }
);

export default BlogPost;
