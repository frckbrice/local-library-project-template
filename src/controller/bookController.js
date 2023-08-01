const { mongoose } = require("mongoose");
const Book = require("../models/book");
const BookInstance = require("../models/bookInstance");
const Author = require("../models/author");
const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

//* Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  return res.render("book_list", { title: "Book List", book_list: allBooks });
  // in http : one request = one response. otherwise an error is thrown.
});

//* Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (mongoose.isValidObjectId(id)) {
    const [book, BookIstances] = await Promise.all([
      Book.findById(id).populate("author").populate("genre").exec(),
      BookInstance.find({ book: id }).sort({ title: 1 }).exec(),
    ]);

    if (!book) {
      const err = new Error("book not found");
      err.status = 404;
      return next(err);
    }

    console.log("book", book);
    console.log("BookInstance", BookInstance);

    res.render("book_detail", {
      title: "Book Details",
      book,
      book_instances: BookIstances,
    });
  }
});

//* Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
  //here we need to find all the authors and genre that we can add to book
  const [allauthors, allgenres] = await Promise.all([
    Author.find().exec(),
    Genre.find().exec(),
  ]);

  res.render("book_form", {
    title: "create Book",
    authors: allauthors,
    genres: allgenres,
  });
});

//* Handle book create on POST.
exports.book_create_post = [
  // Convert the genre to array
  (req, res, next) => {
    if (
      !Array.isArray(req.body.genre) ||
      typeof req.body.genre == "undefined"
    ) {
      req.body.genre = [req.body.genre];
    }
    next();
  },
  //validate and sanitize fields
  body("title",'title must not be empty').trim().isLength({ min: 1 }).escape(),

  body("summary","the summary must not be empty").trim().isLength({ min: 1 }).escape(),

  body('author','author must not be empty').trim().isLength({ min: 2}).escape(),

  body('isbn','isbn must not be empty').trim().isLength({ min: 4}).escape(),

  body('genre.*').escape(),

  //process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {}),
];

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
