const { getAllCompanies, getOneCompany } = require("../../models/advocates.model");

async function httpGetAllCompanies(req, res) {
  const result = await getAllCompanies();
  res.status(200).send(result);
}

async function httpGetOneCompany(req, res) {
  const id = req.params.id;
  const query = req.query.query;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const result = await getOneCompany(id, query, page, limit);
  res.send(result);
}

module.exports = {
  httpGetAllCompanies,
  httpGetOneCompany,
};
