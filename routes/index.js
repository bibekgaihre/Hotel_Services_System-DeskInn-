const router = require("express").Router();
// const uiRouter = require("./ui");
// const apiRouter = require("./api");
const BotRouter = require("./bot/alexa");
const authRouter = require("./ui.routes.auth");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("login", { title: "DeskInn Login" });
});

// router.use("/", uiRouter);
// router.use("/api/v1", apiRouter);
router.use("/bot", BotRouter);
router.use("/", authRouter);

module.exports = router;
