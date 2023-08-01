const asyncHandler = require("express-async-handler");

const Author = require("../models/author");
const Book = require("../models/book");
const { default: mongoose } = require("mongoose");
const { body, validationResult } = require("express-validator");

//*display list of authors
exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();

  res.render("author_list", { title: "Author List", author_list: allAuthors });
});

//* Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (mongoose.isValidObjectId(id)) {
    const [author, authorbooks] = await Promise.all([
      Author.findById(id).exec(),
      Book.find({ author: id }, "title summary").exec(),
    ]);

    if (author == null) {
      const err = new Error("No author found");
      err.status = 404;
      return next(err);
    }

    res.render("author_details", {
      author: author,
      author_books: authorbooks,
    });
  } else {
    console.log("author's bad id. not ObjectId");
  }
});

//* Display Author create form on GET.
exports.author_create_get = (req, res, next) => {
  res.render("author_form", {
    title: "create author",
  });
};

//* Handle Author create on POST.
exports.author_create_post = [
  // validate author fields
  body("firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("firstname field must have at least 2 characters")
    // .isAlphanumeric()
    .withMessage("the name must be of alpha numerical order")
    .escape(),
  //* Never validate names using isAlphanumeric()  there are many names that use other character sets.
  body("familyname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("familyname field must have at least 2 characters")
    // .isAlphanumeric()
    .withMessage("the name must be alpha numerical ")
    .escape(),

  body("date_of_birth").optional({ values: "falsy" }).isISO8601().toDate(),

  body("date_of_birth").optional({ values: "falsy" }).isISO8601().toDate(),

  asyncHandler(async (req, res, next) => {
    // get all the errors from the request object
    const errors = validationResult(req);

    //create an object author from Author constructor
    const author = new Author({
      firstname: req.body.firstname,
      familyname: req.body.familyname,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    //check if there is errors
    if (!errors.isEmpty()) {
      // send back the form with not valid data to user
      return res.render("author_form", {
        title: "create author",
        author,
        errors: errors.array(),
      });
    } else {
      // check if the author already exists
      const authorExists = await Author.findOne(author).exec();
      if (authorExists) {
        console.log("author exists");
        redirect(authorExists.url);
      } else {
        //* we could avoid to check the existance of author because authors may have same name.
        // save author to db
        author.save();
        // redirect to new author record
        return res.redirect(author.url);
      }
    }
  }),
];

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED : Author delete GET");
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED : Author delete POST");
});

//display: author update form on GET
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED : Author update GET");
});

// display: author update on POST
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED : Author update POST");
});
