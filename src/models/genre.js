
// module.exports = function(Schema, model)  {
//   const GenreSchema = new Schema({
//     name: {
//       type: String,
//       required: true,
//       minLength: 3,
//       maxLength: 100,
//     },
//   });
//   //*define virtual for genreSchema
//   GenreSchema.virtual("url").get(function () {
//     return `/catalogue/genre/${this._id}`;
//   });

//   return model("Genre", GenreSchema);
// };


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength:3,
    maxLength:100,
  }
})

GenreSchema.virtual("url").get(function(){
  return `/catalog/genres/${this._id}`;
})

module.exports = mongoose.model('Genre', GenreSchema)


