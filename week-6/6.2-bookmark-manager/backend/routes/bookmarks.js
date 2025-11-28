let bookmarks = [];
let ids = 1;
export async function addBookmark(req, res, next) {
  const { bookmarkUrl, bookmarkCategory } = req.body;

  bookmarks.push({
    id: ids,
    bookmarkUrl,
    bookmarkCategory,
    isFavorite: false,
  });
  ids++;

  res.status(200).json({
    message: "Bookmark Added Successfully.",
    bookmarks,
  });
}

export async function deleteBookmark(req, res, next) {
  const id = parseInt(req.params.id);
  const filteredBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);

  bookmarks = filteredBookmarks;
  res.status(200).json({
    message: "Bookmark Deleted Successfully.",
    bookmarks,
  });
}

export async function getAllBookmarks(req, res, next) {
  res.status(200).json({
    message: "Bookmarks Fetched Successfully.",
    bookmarks,
  });
}

export async function searchBookmarks(req, res) {
  const { searchQuery } = req.body;

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.bookmarkUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.bookmarkCategory
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  if (filteredBookmarks.length === 0) {
    return res.status(400).json({
      message: "No Bookmarks Found",
    });
  }

  res.status(200).json({
    message: "Bookmarks Searched Successfully.",
    filteredBookmarks,
  });
}

export async function toggleFavorite(req, res) {
  const id = parseInt(req.params.id);
  const bookmark = bookmarks.find((bookmark) => bookmark.id === id);

  if (bookmark) {
    bookmark.isFavorite = !bookmark.isFavorite;
    res.status(200).json({
      message: "Bookmark Toggled",
      bookmark,
    });
  } else {
    return res.status(400).json({
      message: "Cannot find the bookmark",
    });
  }
}
