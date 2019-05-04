const router = require("express").Router();
const SecureUI = require("../../utils/secureUI");

router.get("/", SecureUI(), (req, res, next) => {
  console.log("hello");
  res.render("index", {
    title: "DeskInn"
  });
});

module.exports = router;
