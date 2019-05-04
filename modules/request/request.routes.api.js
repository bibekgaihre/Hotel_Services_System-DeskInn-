const router = require("express").Router();
const SecureAPI = require("../../utils/secureAPI");
const { Socket } = require("../../utils/socket");
const RequestController = require("./request.controller");

router.get("/", SecureAPI(), async (req, res, next) => {
  res.sendStatus(200);
});
router.post("/", SecureAPI(), async (req, res, next) => {
  const data = await RequestController.create(req.body);
  try {
    return res.json(data);
  } catch (e) {
    return e;
  }
});
router.get("/:id", SecureAPI(), async (req, res, next) => {});
router.put("/:id", SecureAPI(), async (req, res, next) => {});
router.put("/:id/status", SecureAPI(), async (req, res, next) => {});
module.exports = router;
