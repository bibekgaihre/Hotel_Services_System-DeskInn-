const apiRouter = require("express").Router();
const usersRouter = require("../../modules/user/user.routes.api");
const requestRouter = require("../../modules/request/request.routes.api");
const notificationRouter = require("../../modules/notification/notification.routes.api");
apiRouter.use("/user", usersRouter);
apiRouter.use("/request", requestRouter);
apiRouter.use("/notification", notificationRouter);
module.exports = apiRouter;
