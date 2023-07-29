// module.exports = (Schema, model) => {
//   const BookSchema = new Schema({
//     title: {
//       type: String,
//       require: true,
//     },
//     summary: {
//       type: String,
//       required: true,
//     },
//     isbn: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: Schema.Types.ObjectId,
//       ref: "Author",
//     },
//     genre: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Genre",
//         required: true,
//       },
//     ],
//   });
//   //* virtual for book url
//   BookSchema.virtual("url").get(function () {
//     return `catalog/book/${this._id}`;
//   });

//   return model("Book", BookSchema);
// };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  summary: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
});

// //* virtual for book url
BookSchema.virtual("url").get(function () {
  return `catalog/book/${this._id}`;
});

module.exports = mongoose.model("book", BookSchema);
