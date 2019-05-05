const router = require("express").Router();
const UserController = require("./user.controller");
const bcrypt = require("bcryptjs");
const config = require("config");
const UserModel = require("./user.model");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  payload = req.body;
  UserModel.find({ email: payload.email })
    .exec()
    .then(user => {
      if (user.length > 0) {
        return res.status(409).json({ message: "Email already exists" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(payload.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              const user = new UserModel({
                name: payload.name,
                email: payload.email,
                password: hash,
                roles: [payload.roles]
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        });
      }
    });
});
router.post("/login", (req, res, next) => {
  let payload = req.body;
  UserModel.find({ email: payload.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({ message: "Email not found." });
      }
      bcrypt.compare(payload.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            config.get("app.secret"),
            {
              expiresIn: "24h"
            }
          );
          return res
            .cookie("token", token)
            .status(200)
            .json({ message: "Login Success", token: token });
        } else {
          return res.status(401).json({
            message: "Email or password is incorrect. Please try again"
          });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
