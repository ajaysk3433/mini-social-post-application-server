const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.hobczgc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Unable to connect to MongoDB", err);
  }
})();

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
});

const likesSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    email: String,
  },
  { timestamps: true, _id: false },
);

const commentsSchema = new mongoose.Schema(
  {
    email: String,
    comment: String,
  },
  { timestamps: true },
);

const authorSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    email: String,
  },
  { _id: false },
);

const postSchema = new mongoose.Schema(
  {
    author: authorSchema,
    post: String,
    likes: [likesSchema],
    comments: [commentsSchema],
  },
  { timestamps: true },
);

const user = mongoose.model("User", userSchema);
const post = mongoose.model("Post", postSchema);

module.exports = { user, post };
