const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// *Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allgenres = await Genre.find().sort({ name: 1 }).exec();

  res.render("genre_list", { title: "Genre List", genre_list: allgenres });
});

//* Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (mongoose.isValidObjectId(id)) {
    const [genre, booksOfGenre] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: id }, "title summary").exec(),
    ]);
    console.log(genre);
    console.log(booksOfGenre);
    if (!genre) {
      const err = new Error("Genre not found");
      err.status = 404;
      res.send("Failed to fetch genre and books", err);
      return next(err);
    }
  }

  res.render("genre_detail", {
    title: "Genre detail",
    datail_genre: genre,
    books_in_genre: booksOfGenre,
  });
});

// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// Handle Genre create on POST.
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
