const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const {DateTime} = require('luxon')

const AuthorSchema = new Schema({
  firstname: {
    type: String,
    maxLength: 100,
    // required: true,
  },
  familyname: {
    type: String,
    maxLength: 100,
    // required: true,
  },
  date_of_birth: {
    type: Date,
  },
  date_of_death: Date,
});

//* create virtual for fullname
//* no arrow function because of the use of this
AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.firstname && this.familyname) {
    fullname = `${this.familyname}, ${this.firstname}`;
  }
  return fullname;
});
//* create virtual for author's name
AuthorSchema.virtual("url").get(function () {
  return `/catalog/authors/${this._id}`;
});

//* virtual date formatted
AuthorSchema.virtual("date_of_birth_formated").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
});

AuthorSchema.virtual("date_of_death_formated").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("Author", AuthorSchema);

// module.exports = (Schema, model) => {
//   const AuthorSchema = new Schema({
//     firstname: {
//       type: String,
//       required: true,
//       maxLength: 100,
//     },
//     familyname: {
//       type: String,
//       maxLength: 100,
//       required: true,
//     },
//     date_of_birth: {
//       type: Date,
//     },
//     date_of_death: Date,
//   });

//   //* create virtual for fullname
//   //* no arrow function because of the use of "this"
//   AuthorSchema.virtual("name").get(function () {
//     let fullname = "";
//     if (this.firstname && this.familyname) {
//       fullname = `${this.familyname}, ${this.firstname}`;
//     }
//     return fullname;
//   });

//   //* create virtual for author's name
//   AuthorSchema.virtual("url").get(function () {
//     return `/catalog/author/${this.author}`;
//   });

//   return  model("Author", AuthorSchema);
// };
