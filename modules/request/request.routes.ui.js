const router = require("express").Router();

const SecureUI = require("../../utils/secureUI");

router.get("/new", SecureUI(), async (req, res, next) => {
  res.render("request/createrequest", {
    name: "Create Request",
    title: "DeskInn"
  });
});
router.get("/reports", SecureUI(), async (req, res, next) => {
  res.render("request/reports", {
    name: "Reports",
    title: "DeskInn"
  });
});

module.exports = router;
