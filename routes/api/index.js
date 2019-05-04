const apiRouter = require("express").Router();
const usersRouter = require("../../modules/user/user.routes.api");
const requestRouter = require("../../modules/request/request.routes.api");
apiRouter.use("/user", usersRouter);
apiRouter.use("/request", requestRouter);
module.exports = apiRouter;
