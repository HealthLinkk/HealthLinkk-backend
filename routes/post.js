import express from "express";

const router = express.Router();
import { getAllPosts , getPostById , createPost , updatePostById ,deletePostById} from "../controllers/post.js"
import { auth } from "../middlewares/auth.js";

// Display all posts
router.get("/posts", getAllPosts,auth);


// Display a specific post by its ID
router.get("/posts/:id", getPostById);

// // Add a new post
router.post("/posts",auth, createPost);

// Modify an existing post by its ID
router.put("/posts/:id", updatePostById);

// Delete an existing post by its ID
router.delete("/posts/:id", deletePostById);

export default router;