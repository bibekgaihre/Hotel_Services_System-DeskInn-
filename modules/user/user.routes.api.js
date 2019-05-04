// const router = require("express").Router();
// const UserController = require("./user.controller");
// const { SecureAPI } = require("../../utils/secureAPI");

// router.post("/", SecureAPI, (req, res, next) => {
//   console.log(req.body);
//   let payload = Object.assign({}, req.body);
//   UserController.createUsingEmail(payload)
//     .then(d => res.json(d))
//     .catch(e => next(e));
// });

// module.exports = router;
