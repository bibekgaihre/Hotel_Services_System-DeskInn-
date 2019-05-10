const router = require("express").Router();
const SecureUI = require("../../utils/secureUI");
const RequestRouter = require("../../modules/request/request.routes.ui");

router.use("/request", RequestRouter);

router.get("/", SecureUI(), (req, res, next) => {
  res.render("index", {
    title: "DeskInn"
  });
});

router.get("/feedback", SecureUI(), (req, res, next) => {
  res.render("feedback", {
    title: "DeskInn"
  });
});
module.exports = router;
