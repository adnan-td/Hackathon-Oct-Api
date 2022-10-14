const express = require("express");
const {
  httpGetAllAdvocates,
  httpAddNewAdvocate,
  httpGetOneAdvocate,
} = require("./advocates.controller");

const advocatesRouter = express.Router();

advocatesRouter.get("/:id", httpGetOneAdvocate);
advocatesRouter.get("/", httpGetAllAdvocates);
advocatesRouter.post("/", httpAddNewAdvocate);

module.exports = advocatesRouter;
