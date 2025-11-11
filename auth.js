const express = require("express");
const router = express.Router();
const { user } = require("./db");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const data = req.body;
  data.email = data.email.toLowerCase();
  (async () => {
    try {
      const isExist = await user.findOne({ email: data.email });

      if (isExist) {
        res.status(403).json({ isSuccess: false, err: "Email already exists" });
      } else {
        const newUser = (await user.create(data)).toObject();
        if (newUser) {
          delete newUser.password;
          const token = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
          );
          res.status(200).json({ isSuccess: true, token, user: newUser });
        }
      }
    } catch (err) {
      console.log(err);
      res.json({ isSuccess: false, err: "Something went wrong" });
    }
  })();
});

router.post("/login", (req, res) => {
  const data = req.body;
  data.email = data.email.toLowerCase();

  (async () => {
    try {
      const isExist = await user
        .findOne({ email: data.email, password: data.password })
        .lean();

      if (isExist) {
        const token = jwt.sign(
          { email: isExist.email },
          process.env.JWT_SECRET,
        );
        res.status(200).json({ isSuccess: true, token, user: isExist });
      } else {
        res.status(404).json({ isSuccess: false, err: "User not found" });
      }
    } catch (err) {
      console.log(err);
      res.json({ isSuccess: false, err: "Something went wrong" });
    }
  })();
});

module.exports = router;
