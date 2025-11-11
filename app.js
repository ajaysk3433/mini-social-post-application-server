const express = require("express");
const app = express();
const auth = require("./auth");
const post = require("./post");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", auth);

app.use("/api/user", (req, res, next) => {
  try {
    const token = String(req.headers.authorization).split("Bearer ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded === null) {
      res.status(401).json({ isScucsse: false, err: "Unauthorized" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ isScucsse: false, err: "Unauthorized" });
  }
});

app.use("/api/user", post);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
