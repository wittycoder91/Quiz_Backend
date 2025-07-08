const express = require("express");
const publicRouter = express.Router();
const auth = require("./auth.js");
const settings = require("./settings.js");

publicRouter.use("/auth", auth);
publicRouter.use("/settings", settings);

module.exports = publicRouter;
