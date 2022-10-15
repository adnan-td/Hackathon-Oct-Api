async function paginatedResultsFindAll(model, page, limit, query) {
  let obj;
  if (!query) {
    obj = {};
  } else {
    obj = { name: new RegExp("^" + query + "$", "i") };
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await model.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    results.results = JSON.parse(
      JSON.stringify(await model.find(obj).limit(limit).skip(startIndex).exec())
    );
    return results;
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = { paginatedResultsFindAll };
