const { getAllAdvocates, addNewAdvocate, getOneAdvocate } = require("../../models/advocates.model");

async function httpGetAllAdvocates(req, res) {
  const query = req.query.query;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const result = await getAllAdvocates(query, page, limit);
  res.status(200).send(result);
}

async function httpAddNewAdvocate(req, res) {
  const advocate = req.body;

  if (!advocate.name && !advocate.username) {
    res.status(406).send("Please fill all the required fields");
  }
  await addNewAdvocate(advocate);
  res.status(200);
}

async function httpGetOneAdvocate(req, res) {
  const username = req.params.username;
  const result = await getOneAdvocate(username);
  res.send({
    advocate: result,
  });
}

module.exports = {
  httpGetAllAdvocates,
  httpAddNewAdvocate,
  httpGetOneAdvocate,
};
