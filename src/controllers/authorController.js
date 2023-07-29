const asyncHandler = require("express-async-handler");

const Author = require('../models/author')

//*display list of authors
exports.author_list = asyncHandler(async(req, res, next) => {
  res.send('NOT IMPLEMENTED: Author list')
})

//* Display detail page for a specific Author.
exports.author_detail = asyncHandler(async(req, res,next) => {
  res.send(`NOT IMPLEMENTED: Author detail ${req.params.id}`);
});

//* Display Author create form on GET.
exports.author_create_get = asyncHandler(async(req, res, next) => {
  res.send('NOT IMPLEMENTED : Author create GET')
});

//* Handle Author create on POST.
exports.author_create_post = asyncHandler(async(req, res, next) => {
  res.send("NOT IMPLEMENTED : Author create POST")
});

// *Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async(req, res, next) => {
  res.send("NOT IMPLEMENTED : Author delete GET");
})

//* Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async(req, res, next) =>{
  res.send('NOT IMPLEMENTED : Author delete POST');
})

//* display: author update form on GET
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED : Author update GET");
});

//* display: author update on POST
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED : Author update POST");
});