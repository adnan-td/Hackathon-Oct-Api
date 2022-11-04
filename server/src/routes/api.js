const express = require("express");
const advocatesRouter = require("./advocates/advocates.router");
const companiesRouter = require("./companies/companies.router");

const api = express.Router();

api.use("/advocates", advocatesRouter);
api.use("/companies", companiesRouter);

module.exports = api;
