
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { Model } = require("mongoose");
const basename = path.basename(__filename);

const db = {};
db.model = {};
db.mongoose = mongoose;

//*fetch all the file of this repository except "index.js" and add models required to db object through models object.
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== -1 && file !== basename && file.slice(-2) === "js"
    );
  })
  .forEach((file) => {
    //* file
    console.log(file);
    let model = require(path.join(__dirname, file))(
      mongoose.Schema,
      mongoose.model
    );
    //* model
    console.log('typeof: '+ typeof model, 'model:' ,model);
    const fileBasename = path.basename(path.join(__dirname, file));
    let name =
      fileBasename[0].toString().toUpperCase() +
      fileBasename.toString().slice(1,-3);
      //* basename
      console.log(name)
    db.model[name] = model;
    //* model
     console.log("model name", db.model[name]);
  });


module.exports = db;
