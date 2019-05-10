const router = require("express").Router();
const SecureAPI = require("../../utils/secureAPI");
const { Socket } = require("../../utils/socket");
const RequestController = require("./request.controller");

router.get("/", SecureAPI(), async (req, res, next) => {
  let limit = parseInt(req.query.limit) || 25;
  let start = parseInt(req.query.start) || 0;
  let page = parseInt(start) / parseInt(limit) + 1;
  let status = req.query.status || "inbox";
  let data = await RequestController.read({
    limit,
    start,
    page,
    status
  });
  try {
    res.json(data);
  } catch (e) {
    return e;
  }
});
router.post("/", SecureAPI(), async (req, res, next) => {
  const data = await RequestController.create(req.body);
  try {
    return res.json(data);
  } catch (e) {
    return e;
  }
});
router.get("/:id", SecureAPI(), async (req, res, next) => {
  const data = await RequestController.readById(req.params.id);
  try {
    return res.json(data);
  } catch (e) {
    return e;
  }
});
router.put("/:id", SecureAPI(), async (req, res, next) => {
  const data = await RequestController.update(req.params.id, req.body);
  try {
    return res.json(data);
  } catch (e) {
    return e;
  }
});
router.put("/:id/status", SecureAPI(), async (req, res, next) => {
  console.log(req.params.id);
  console.log("hello");
  const data = await RequestController.changeStatus(req.params.id, req.body.note, req.body.status);
  try {
    return res.json(data);
  } catch (e) {
    return e;
  }
});
module.exports = router;
