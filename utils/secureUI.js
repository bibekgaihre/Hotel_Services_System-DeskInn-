const jwt = require("jsonwebtoken");
const config = require("config");
const SecureUI = () => {
  console.log("hello");
  return function(req, res, next) {
    try {
      const tok = req.cookies.authorization.split(" ")[1];
      console.log(tok);
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
