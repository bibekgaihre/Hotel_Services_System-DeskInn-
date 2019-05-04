const UserController = require("../modules/User/user.controller");

const secureAPI = () => {
  return function(req, res, next) {
    var token = req.body.access_token || req.query.access_token || req.headers["access_token"];
    if (!token) throw "Must send access_token";

    UserController.validateToken(token)
      .then(t => {
        req.tokenData = t.data;
        next();
      })
      .catch(next);
  };
};

module.exports = { secureAPI };
