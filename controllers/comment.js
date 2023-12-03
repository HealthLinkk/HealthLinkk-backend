
import Comment from "../models/comment.js";


  export async function  createComment(req, res) {
    const { content, postId , author } = req.body;
    

    try {
      const comment = new Comment({
        content,
        post: postId,
        user: author
       
      });

      await comment.save();

      res.status(201).json({
        message: "Comment created successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

 export async  function getCommentsByPost(req, res) {
    const postId = req.params.postId;

    try {
      const comments = await Comment.find({ post: postId }).sort({ date: -1 });

      res.status(200).json(
        comments);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

 export async  function updateComment(req, res) {
    const commentId = req.params.commentId;
    const { content } = req.body;

    try {
      const comment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });

      if (!comment) {
        res.status(404).json({
          error: "Comment not found",
        });
      }

      res.status(200).json({
        message: "Comment updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  export async function deleteComment(req, res) {
    const commentId = req.params.commentId;

    try {
      await Comment.findByIdAndDelete(commentId);

      res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
}
