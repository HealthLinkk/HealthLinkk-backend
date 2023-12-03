
import LikeDislike from "../models/LikeDislike.js";


  export async function  createLike(req, res) {
    const likeDislike = new LikeDislike({
      user: req.user.id,
      post: req.body.postId,
      type: "like",
    });

    try {
      await likeDislike.save();
      res.status(201).json({
        message: "Like created successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  export async function createDislike(req, res) {
    const likeDislike = new LikeDislike({
      user: req.user.id,
      post: req.body.postId,
      type: "dislike",
    });

    try {
      await likeDislike.save();
      res.status(201).json({
        message: "Dislike created successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  export async function deleteLike(req, res) {
    const likeDislike = await LikeDislike.findOneAndDelete({
      post: req.params.postId,
      user: req.user.id,
    });

    if (!likeDislike) {
      res.status(404).json({
        error: "Like not found",
      });
    }

    res.status(200).json({
      message: "Like deleted successfully",
    });
  }

  export async function  deleteDislike(req, res) {
    const likeDislike = await LikeDislike.findOneAndDelete({
      post: req.params.postId,
      user: req.user.id,
    });

    if (!likeDislike) {
      res.status(404).json({
        error: "Dislike not found",
      });
    }

    res.status(200).json({
      message: "Dislike deleted successfully",
    });
  }
