const companiesdb = require("./companies.mongo");
const advocatesdb = require("./advocates.mongo");
const { paginatedResultsFindAll } = require("../services/pagination");

async function getAllCompanies(query, page, limit) {
  const result = await paginatedResultsFindAll(companiesdb, page, limit, query);
  const companies = result.results;
  const advocates = JSON.parse(
    JSON.stringify(await advocatesdb.find({}, "id name profile_pic url company"))
  );
  // let advocates = JSON.parse(JSON.stringify(await advocatesdb.find({})));
  // advocates = advocates.map((advocate) => {
  //   return {
  //     id: advocate.id,
  //     name: advocate.name,
  //     profile_pic: advocate.profile_pic,
  //     url: advocate.url,
  //     company: advocate.company,
  //   };
  // });
  const newcompanies = companies.map((company) => {
    const advocatesInCompany = advocates.filter((advocate) => {
      return company.id === advocate.company;
    });
    return { ...company, advocates: advocatesInCompany };
  });
  result.results = newcompanies;
  return result;
}

async function getOneCompany(id) {
  const company = JSON.parse(JSON.stringify(await companiesdb.findOne({ id: id })));
  let advocates = JSON.parse(JSON.stringify(await advocatesdb.find({ company: id })));
  advocates = advocates.map((advocate) => {
    return {
      id: advocate.id,
      name: advocate.name,
      profile_pic: advocate.profile_pic,
      url: advocate.url,
      company: advocate.company,
    };
  });
  return { ...company, advocates: advocates };
}

async function addNewCompany(company) {
  try {
    await companiesdb.updateOne(
      {
        id: company.id,
      },
      company,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save Advocate ${err}`);
  }
}

// async function DocumentMaker() {
//   let companyNew = {
//     id: 4,
//     url: "http://cados.up.railway.app/companies/4/",
//     links: [],
//     name: "Agora",
//     logo: "http://cados.up.railway.app/images/agora-blue-logo-transparent-bkg.png",
//     summary:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to",
//   };
//   await addNewCompany(companyNew);

//   companyNew = {
//     id: 5,
//     url: "http://cados.up.railway.app/companies/5/",
//     links: [],
//     name: "Vercel",
//     logo: "http://cados.up.railway.app/images/vercel-icon-512x449-3422jidz.png",
//     summary:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to",
//   };
//   await addNewCompany(companyNew);

//   companyNew = {
//     id: 6,
//     url: "http://cados.up.railway.app/companies/6/",
//     links: [],
//     name: "Daily.Dev",
//     logo: "http://cados.up.railway.app/images/Daily.dev_logo.png",
//     summary:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to",
//   };
//   await addNewCompany(companyNew);
// }

// DocumentMaker();

module.exports = {
  getAllCompanies,
  addNewCompany,
  getOneCompany,
};
