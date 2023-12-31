import express from 'express'
import dotenv from 'dotenv'
import config from "./config/dbConfig";
import { HttpError } from 'http-errors';
import blogPostRoutes from './routes/blogPostRoutes';
import cors from "cors";
import logger from "morgan";
import { db } from "./config";


const { PORT } = config;

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.use('/blog', blogPostRoutes)

app.get("/", (req, res) => {
    return res.send("Hello World!");
  });


db.sync({})
.then(() => {
  console.log("Database is connected");
})
.catch((err: HttpError) => {
  console.log(err);
});



const port = PORT;

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

export default app;