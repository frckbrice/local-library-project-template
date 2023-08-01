const { default: mongoose } = require("mongoose");
const BookInstance = require("../models/bookInstance");
const asyncHandler = require("express-async-handler");

//* Display list of all BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();
console.log(allBookInstances);
  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
});

//* Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  if(mongoose.isValidObjectId(id)) {
 const bookinstance = await BookInstance.findById(id).populate('book').orFail().exec();

 if(!bookinstance) {
  const err = new Error('No bookinstance found');
  err.status = 404;
  return next(err)
 }

 res.render("bookInstance_details", {
   title: "Book Instance Details",
   bookinstance,
 });
  }else {
    console.log('Not valid ObjectId')
  }
 
});

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
});

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
