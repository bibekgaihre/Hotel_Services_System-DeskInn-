const UserController = require("../modules/users/user.controller");

const SecureUI = () => {
  return function(req, res, next) {
    var token =
      req.cookies.access_token ||
      req.query.access_token ||
      req.body.access_token ||
      req.headers["access_token"];
    if (!token) {
      res.redirect("/login");
      res.end();
    }

    UserController.validateToken(token)
      .then(t => {
        req.tokenData = t.data;
        next();
      })
      .catch(err => {
        res.redirect("/login");
        res.end();
      });
  };
};

module.exports = SecureUI;
