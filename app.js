const express = require("express");
const app = express();
const auth = require("./auth");
const post = require("./post");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", auth);

app.use("/api/user", post);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
