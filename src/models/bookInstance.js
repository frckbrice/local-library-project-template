const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

//* Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstances/${this._id}`;
});

//* virtual property for formating date
BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);

// module.exports = (Schema, model) => {

// const BookInstanceSchema = new Schema({
//   book: {
//     type: Schema.Types.ObjectId,
//     ref: "Book",
//     required: true,
//   },
//   imprint: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ["Available", "Maintenance", "Loaned", "Reserved"],
//     default: "Maintenance",
//   },
//   due_back: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// //* define vitual bookInstance's url
// BookInstanceSchema.virtual('url').get(function() {
//   return `/catalogue/bookInstance/${this._id}`
// })

// return model("BookInstance", BookInstanceSchema);
// }
