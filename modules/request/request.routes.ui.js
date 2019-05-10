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
router.get("/:id", SecureUI(), async (req, res, next) => {
  const request_id = req.params.id;
  res.render("request/details", {
    name: "Request Detail",
    title: "DeskInn",
    request_id
  });
});

module.exports = router;
