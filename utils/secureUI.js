const jwt = require("jsonwebtoken");
const config = require("config");
const SecureUI = () => {
  return function(req, res, next) {
    try {
      const tok = req.cookies.token;
      const decoded = jwt.verify(tok, config.get("app.secret"));
      req.userData = decoded;
      next();
    } catch (err) {
      res.redirect("/login");
      res.end();
    }
  };
};

module.exports = SecureUI;
