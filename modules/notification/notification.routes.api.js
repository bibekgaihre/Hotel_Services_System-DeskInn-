const router = require("express").Router();
const SecureAPI = require("../../utils/secureAPI");
const NotificationController = require("./notification.controller");

router.get("/", SecureAPI(), async (req, res, next) => {
  const data = await NotificationController.read();
  try {
    res.json(data);
  } catch (e) {
    return e;
  }
});

module.exports = router;
