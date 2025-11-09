const express = require("express");
const router = express.Router();
const { post } = require("./db");
const mongoose = require("mongoose");

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
    const result = await post.updateOne(
      { _id: data.postId },
      {
        $addToSet: {
          likes: { id: data.likedBy.id, email: data.likedBy.email },
        },
      },
    );
    if (result.acknowledged) {
      console.log("post like");
      res
        .status(200)
        .json({
          isSuccess: true,
          like: { id: data.likedBy.id, email: data.likedBy.email },
        });
    } else {
      res.status(404).json({ isSuccess: false, err: "Not Found" });
    }

    // console.log(result);
  })();
});

module.exports = router;
