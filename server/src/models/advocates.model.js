const companiesdb = require("./companies.mongo");
const advocatesdb = require("./advocates.mongo");
// const { paginatedResultsFindAll, paginatedResultsFindOne } = require("../services/pagination");

async function getAllAdvocates() {
  const advocates = JSON.parse(JSON.stringify(await advocatesdb.find({})));
  const companies = JSON.parse(JSON.stringify(await companiesdb.find({})));
  return advocates.map((advocate) => {
    const company = companies.find((company) => {
      return company.id === advocate.company;
    });
    return { ...advocate, company: company };
  });
}

async function getOneAdvocate(id) {
  const advocate = JSON.parse(JSON.stringify(await advocatesdb.findOne({ id: id })));
  const company = JSON.parse(JSON.stringify(await companiesdb.findOne({ id: advocate.company })));
  return { ...advocate, company: company };
}

async function addNewAdvocate(advocate) {
  try {
    await advocatesdb.updateOne(
      {
        id: advocate.id,
      },
      advocate,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save Advocate ${err}`);
  }
}

// async function DocumentMaker(id, name, company) {
//   const advocateNew = {
//     id: id,
//     url: `http://oct-hackathon-api.adnanshusain.in/advocates/${id}/`,
//     company: company,
//     links: [
//       {
//         name: "YouTube",
//         url: "https://www.youtube.com",
//       },
//       {
//         name: "Twitter",
//         url: "https://twitter.com",
//       },
//     ],
//     name: name,
//     profile_pic: "http://cados.up.railway.app/images/H-niCazg_400x400.jpeg",
//     short_bio: "Full Stack Developer | Software Engineer | Tech Enthusiast",
//     long_bio:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     advocate_since: "2021-04-21",
//   };
//   await addNewAdvocate(advocateNew);
// }

// DocumentMaker(5, "Dave", 1);

module.exports = {
  getAllAdvocates,
  addNewAdvocate,
  getOneAdvocate,
};
