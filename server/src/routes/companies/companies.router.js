const express = require("express");
const { httpGetAllCompanies, httpGetOneCompany } = require("./companies.controller");

const companiesRouter = express.Router();

companiesRouter.get("/:id", httpGetOneCompany);
companiesRouter.get("/", httpGetAllCompanies);

module.exports = companiesRouter;
