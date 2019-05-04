// const router = require("express").Router();
// const UserController = require("../modules/user/user.controller");

// router.post("/login_process", async (req, res, next) => {
//   console.log(req.body);
//   try {
//     let user = await UserController.login(req.body);
//     let tokenData = await UserController.validateToken(user.token);
//     res.cookie("access-token", user.token);
//     res.cookie("user", JSON.stringify(user));
//     res.json(user);
//   } catch (e) {
//     next(e);
//   }
// });

// router.get("/logout", (req, res, next) => {
//   res.clearCookie("access-token");
//   res.clearCookie("user");
//   res.redirect("/login");
// });

// module.exports = router;
