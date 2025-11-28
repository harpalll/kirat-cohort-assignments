const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/taskify");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    priority: {
      type: String,
      enum: ["low", "medium", "urgent"],
      default: "low",
    },
    deadline: Date,
    status: {
      type: String,
      enum: ["to_do", "in_progress", "under_review", "finished"],
      default: "to_do",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  User,
  Todo,
};
