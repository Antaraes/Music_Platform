const userRouter = require("./UserRouter");
const apiRouter = require("express").Router();

apiRouter.use("/user", userRouter);

module.exports = apiRouter;
