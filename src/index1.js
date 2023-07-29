// const mongoose = require("mongoose");

// const fs = require("fs");
// const path = require("path");
// const { config } = require("dotenv");
// const Sequelize = require("sequelize");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
// const db = {};
// let sequeize;
// if (config.use_env_variable) {
//   sequeize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequeize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== -1 && file !== basename && file.slice(-3) === "js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequeize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelname) => {
//   if (db[modelname].associate) {
//     db[modelname].associate(db);
//   }
// });

// db.sequeize = sequeize;
// db.Sequelize = Sequelize;

// module.exports = mongoose;
