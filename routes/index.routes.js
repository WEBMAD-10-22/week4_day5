const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {

  const arr = [1, 2, 3];
  res.render("index");
});

module.exports = router;
