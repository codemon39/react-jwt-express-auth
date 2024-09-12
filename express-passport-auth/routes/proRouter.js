const express = require("express");

const router = express.Router();

router.get("/protfoilo", (req, res) => {
  res.send("hello world!");
});
// Form validation
module.exports = router;
