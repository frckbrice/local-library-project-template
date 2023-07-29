var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", { title: "mdn express-locallibrary-tutorial" });
  next();
});

//GET home page.
// router.get("/", (req, res, next) => {
//   console.log('index')
//   res.redirect("/catalog");
//   next() ;
// });


module.exports = router;
