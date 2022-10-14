const { getAllCompanies, addNewCompany, getOneCompany } = require("../../models/companies.model");

async function httpGetAllCompanies(req, res) {
  const result = await getAllCompanies();
  res.send(result);
}

async function httpAddNewCompany(req, res) {
  const company = req.body;

  // if (!name && !email && !password) {
  //   res.status(406).send("Please fill all the required fields");
  // }
  await addNewCompany(company);
  res.status(200);
}

async function httpGetOneCompany(req, res) {
  const id = req.params.id;
  const result = await getOneCompany(id);
  res.send(result);
}

module.exports = {
  httpGetAllCompanies,
  httpAddNewCompany,
  httpGetOneCompany,
};
