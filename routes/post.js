import express from "express";

const router = express.Router();
import { getAllPosts , getPostById , createPost , updatePostById ,deletePostById} from "../controllers/post.js"
import { auth } from "../middlewares/auth.js";

// Display all posts
router.get("/Aposts", getAllPosts,auth);


// Display a specific post by its ID
router.get("/Iposts/:id", getPostById);

// // Add a new post
router.post("/Cposts", createPost);

// Modify an existing post by its ID
router.put("/Uposts/:id", updatePostById);

// Delete an existing post by its ID
router.delete("/Dposts/:id", deletePostById);

export default router;