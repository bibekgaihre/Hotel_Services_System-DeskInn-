const UserController = require("../modules/User/user.controller");
const jwt = require("jsonwebtoken");
const config = require("config");
const secureAPI = () => {
  return function(req, res, next) {
    try {
      const tok = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(tok, config.get("app.secret"));
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Auth Failed. Must send Valid token" });
    }

    // var token = req.body.access_token || req.query.access_token || req.headers["access_token"];
    // if (!token) throw "Must send access_token";

    // UserController.validateToken(token)
    //   .then(t => {
    //     req.tokenData = t.data;
    //     next();
    //   })
    //   .catch(next);
  };
};

module.exports = secureAPI;
