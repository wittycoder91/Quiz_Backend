const express = require("express");
const privateRouter = express.Router();

const user = require("./user.js");
const quiz = require("./quiz.js");


privateRouter.use("/user", user);
privateRouter.use("/quiz", quiz);

module.exports = privateRouter;
