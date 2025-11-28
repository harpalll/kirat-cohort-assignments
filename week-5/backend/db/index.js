import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const todoSchema = mongoose.Schema({
  title: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completed: Boolean,
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

export { User, Todo, connectToDatabase };
