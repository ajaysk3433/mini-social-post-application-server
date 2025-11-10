const express = require("express");
const router = express.Router();
const { post } = require("./db");
const mongoose = require("mongoose");
const { overwriteMiddlewareResult } = require("mongoose");
const { route } = require("express/lib/application");

router.post("/post/create", (req, res) => {
  const data = req.body;
  (async () => {
    try {
      const result = await post.create({
        author: { id: data.author._id, email: data.author.email },
        post: data.post,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ isSuccess: false, err: "Something went wrong" });
    }
  })();
});

router.get("/posts", (req, res) => {
  (async () => {
    try {
      const allPosts = await post.find().lean().sort({ createdAt: -1 });
      res.json(allPosts);
    } catch (err) {
      res.status(500).json({ isSuccess: false, err: "Something went wrong" });
    }
  })();
});

router.post("/post/like", (req, res) => {
  const data = req.body;
  // console.log(data);
  (async () => {
    const isAlreadyLiked = await post
      .find({ "likes.id": data.likedBy.id })
      .lean();
    //if already liked remove the like
    if (isAlreadyLiked.length > 0) {
      console.log("isAlreadyLiked");
      const result = await post.updateOne(
        { _id: data.postId },
        {
          $pull: {
            likes: { id: data.likedBy.id, email: data.likedBy.email },
          },
        },
      );

      res.status(200).json({
        isSuccess: false,
        like: { id: data.likedBy.id, email: data.likedBy.email },
      });
    } else {
      // if not liked add like
      console.log("not alreadyLike");
      const result = await post.updateOne(
        { _id: data.postId },
        {
          $addToSet: {
            likes: { id: data.likedBy.id, email: data.likedBy.email },
          },
        },
      );

      res.status(200).json({
        isSuccess: true,
        like: { id: data.likedBy.id, email: data.likedBy.email },
      });
    }

    // console.log(result);
  })();
});

router.get("/likes/list/:id", (req, res) => {
  const postID = req.params.id;
  (async () => {
    try {
      const result = await post.findById(postID, { likes: 1 }).lean();

      res.status(200).json({ likes: result.likes });
    } catch (err) {
      console.log(err);
      res.status(500).json({ isSuccess: false, err: "Something went wrong" });
    }
  })();
});

router.get("/comments/list/:id", (req, res) => {
  const postID = req.params.id;
  (async () => {
    try {
      const result = await post
        .findById(postID, { comments: 1 })
        .lean()
        .sort({ createdAt: -1 });
      res.status(200).json({ comments: result.comments });
    } catch (err) {
      console.log(err);
      res.status(500).json({ isSuccess: false, err: "Something went wrong" });
    }
  })();
});

router.post("/comments/create", (req, res) => {
  const data = req.body;
  (async () => {
    try {
      const result = await post.updateOne(
        { _id: data.postID },
        { $push: { comments: { email: data.email, comment: data.comment } } },
      );
      console.log(result);
      if (result.acknowledged) {
        res.status(200).json({ isSuccess: true });
      } else {
        res.status(500).json({ isSuccess: false, err: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ isSuccess: false, err: "Something went wrong" });
    }
  })();
});

router.delete("/comments/delete", (req, res) => {
  const postID = req.query.postID;
  const commentID = req.query.commentID;
  (async () => {
    try {
      const result = await post.updateOne(
        { _id: postID },
        { $pull: { comments: { _id: commentID } } },
      );
      if (result.acknowledged) {
        res.status(200).json({ isSuccess: true });
      } else {
        res.status(500).json({ isSuccess: false, err: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ isSuccess: false, err: "Something went wrong" });
    }
  })();
});
module.exports = router;
