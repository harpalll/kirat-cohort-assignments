import express from "express";
import cors from "cors";
import {
  addBookmark,
  deleteBookmark,
  getAllBookmarks,
  searchBookmarks,
  toggleFavorite,
} from "./routes/bookmarks.js"; // importing callback functions for routes
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/bookmarks", getAllBookmarks);
app.post("/bookmarks/search", searchBookmarks);
app.get("/bookmarks/toggleFavorite/:id", toggleFavorite);

app.post("/bookmarks", addBookmark);
app.delete("/bookmarks/:id", deleteBookmark);

//  TODO: Can u implement searching bookmark and favorite and unfavorite bookmark route ??

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
