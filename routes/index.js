const router = require("express").Router();
const uiRouter = require("./ui");
const apiRouter = require("./api");
const BotRouter = require("./bot/alexa");
// const authRouter = require("./ui.routes.auth");

router.use("/", uiRouter);
router.use("/api/v1", apiRouter);
router.use("/bot", BotRouter);
/* GET Login page. */
router.get("/login", function(req, res, next) {
  res.render("login", { title: "DeskInn Login" });
});

// router.use("/", authRouter);

module.exports = router;
