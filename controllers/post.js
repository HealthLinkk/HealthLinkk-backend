import Post from "../models/post.js";


  // **Display all posts**
  export async function getAllPosts(req, res) {
    const posts = await Post.find();

    res.status(200).json(posts);
  }

  // **Display a specific post by its ID**
 export async function getPostById(req, res) {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({
        error: "Post not found",
      });
    }

    res.status(200).json({
      post,
    });
  }

  // **Add a new post**
 export async function createPost(req, res) {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
       author: req.body.author,
    });

    try {
      await post.save();
      res.status(201).json({
        message: "Post created successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  // **Modify an existing post by its ID**
  export async function updatePostById(req, res) {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({
        error: "Post not found",
      });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    try {
      await post.save();
      res.status(200).json({
        message: "Post updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  // **Delete an existing post by its ID**
  export async function deletePostById(req, res) {
    const postId = req.params.id;

    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      res.status(404).json({
        error: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
    });
  }

