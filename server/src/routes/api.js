const express = require("express");
const companiesRouter = require("./companies/companies.router");
const advocatesRouter = require("./advocates/advocates.router");

const api = express.Router();

api.use("/companies", companiesRouter);
api.use("/advocates", advocatesRouter);

module.exports = api;
