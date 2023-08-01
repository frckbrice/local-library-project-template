const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

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

    if (!genre) {
      const err = new Error("Genre not found");
      err.status = 404;
      res.send("Failed to fetch genre and books", err);
      return next(err);
    }

    res.render("genre_detail", {
      title: "Genre detail",
      Genre_name: genre.name,
      books_in_genre: booksOfGenre,
    });
  }
});

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "create Genre" });
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // validate and sanitize the name field
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // process request after validation and sanitization

  asyncHandler(async (req, res, next) => {
    // extract the validation errors from a request
    const errors = validationResult(req);

    //create a genre object with escaped and trimed data
    const genre = new Genre({ name: req.body.name });

    //check the errors
    if (!errors.isEmpty()) {
      //there are errors. render the form again with sanitized/errors messages.
      return res.render("genre_form", {
        title: "create Genre",
        genre: genre,
        errors: errors.array(),
      });
    } else {
      // data from form is valid.
      //Check if the Genre with the same name already exists
      const genreExists = await Genre.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
        console.log(genreExists)
      if (genreExists) {
        //Genre exists, rediret to its detail page
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        // new genre saved. redirect to its detail page.
        res.redirect(genre.url);
      }
    }
   
  }),
];

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
