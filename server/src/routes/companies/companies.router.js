const express = require("express");
const {
  httpGetAllCompanies,
  httpAddNewCompany,
  httpGetOneCompany,
} = require("./companies.controller");

const companiesRouter = express.Router();

companiesRouter.get("/:id", httpGetOneCompany);
companiesRouter.get("/", httpGetAllCompanies);
companiesRouter.post("/", httpAddNewCompany);

module.exports = companiesRouter;
