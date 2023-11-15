import express from "express";


import { createLike , createDislike , deleteLike ,deleteDislike} from "../controllers/LikeDislike.js"
const router = express.Router();

router.post("/likes", createLike);
router.post("/dislikes", createDislike);
router.delete("/likes/:postId", deleteLike);
router.delete("/dislikes/:postId", deleteDislike);

export default  router;