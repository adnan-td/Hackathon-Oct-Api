const advocatesdb = require("./advocates.mongo");
const { paginatedResults } = require("../services/pagination");
const { paginatedResults2 } = require("../services/pagination-c");

async function getAllAdvocates(query, page, limit) {
  const result = await paginatedResults(advocatesdb, page, limit, query);
  return result;
}

async function getOneAdvocate(username) {
  const advocate = await advocatesdb.findOne({ username: username.toLocaleLowerCase() });
  return advocate;
}

async function addNewAdvocate(advocate) {
  try {
    await advocatesdb.updateOne({ username: advocate.username }, advocate, {
      upsert: true,
    });
  } catch (err) {
    console.error(`Could not save Advocate ${err}`);
  }
}

const uniqSort = (arr = []) => {
  const map = {};
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i]]) {
      map[arr[i]] = true;
      res.push(arr[i]);
    }
  }
  return res.sort((a, b) => a - b);
};

async function getAllCompanies() {
  const advocates = await advocatesdb.find();
  const Clist = [];
  advocates.map((advocate) => {
    advocate.companies.map((item) => {
      Clist.push(item);
    });
  });
  const shortClist = uniqSort(Clist);
  const companies = [];
  for (item of shortClist) {
    let counter = 0;
    for (i of Clist) {
      if (i == item) {
        counter++;
      }
    }
    companies.push({
      id: item,
      advocates: counter,
    });
  }

  const result = {
    available_companies: shortClist.length,
    companies: companies, // list of companies with objects having no of advocates in company and its id
  };
  return result;
}

async function getOneCompany(id, query, page, limit) {
  const result = await paginatedResults2(advocatesdb, page, limit, query, id);
  return result;
}

module.exports = {
  getAllAdvocates,
  addNewAdvocate,
  getOneAdvocate,
  getAllCompanies,
  getOneCompany,
};
