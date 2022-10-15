const { getAllAdvocates, addNewAdvocate, getOneAdvocate } = require("../../models/advocates.model");

async function httpGetAllAdvocates(req, res) {
  const query = req.query.query;
  const page = +req.query.page;
  const limit = +req.query.limit;
  const result = await getAllAdvocates(query, page, limit);
  res.send(result);
}

async function httpAddNewAdvocate(req, res) {
  const advocate = req.body;

  // if (!name && !email && !password) {
  //   res.status(406).send("Please fill all the required fields");
  // }
  await addNewAdvocate(advocate);
  res.status(200);
}

async function httpGetOneAdvocate(req, res) {
  const id = req.params.id;
  const result = await getOneAdvocate(id);
  res.send(result);
}

module.exports = {
  httpGetAllAdvocates,
  httpAddNewAdvocate,
  httpGetOneAdvocate,
};
