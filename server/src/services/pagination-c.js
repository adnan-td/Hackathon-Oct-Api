async function paginatedResults2(model, page, limit, query, id) {
  const results = {
    pagination: {
      results_found: 0,
      total_pages: 0,
      current_page: 0,
      has_prev: false,
      has_next: false,
      pages: [],
    },
    showing_results: 0,
    advocates: [],
  };

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  results.pagination.current_page = page;

  if (query) {
    var advocates = (await model.find({})).filter((advocate) => {
      return (
        (advocate.username?.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          advocate.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase())) &&
        advocate.companies.find((cid) => {
          return cid === +id;
        })
      );
    });
  } else {
    var advocates = (await model.find({})).filter((advocate) => {
      return advocate.companies.find((cid) => {
        return cid === +id;
      });
    });
  }

  if (endIndex < advocates.length) {
    results.pagination.has_next = true;
    results.pagination.next = page + 1;
  }
  if (startIndex > 0) {
    results.pagination.has_prev = true;
    results.pagination.prev = page - 1;
  }
  results.pagination.results_found = advocates.length;
  results.pagination.total_pages = totalpages(results.pagination.results_found, limit);
  results.pagination.pages = pagesList(results.pagination.total_pages, page);
  results.advocates = advocates.slice(startIndex, startIndex + limit);
  results.showing_results = results.advocates.length;
  return results;
}

module.exports = { paginatedResults2 };

const totalpages = (total, limit) => {
  if (total <= limit) {
    return 1;
  }
  if (total % 2 === 0) {
    return total / limit;
  } else {
    return (total - (total % limit)) / limit + 1;
  }
};

const pagesList = (totalpages, current_page) => {
  if (totalpages <= 10) {
    const list = [];
    for (let i = 1; i <= totalpages; i++) {
      list.push(i);
    }
    return list;
  } else if (totalpages - current_page <= 10) {
    const list = [];
    for (let i = totalpages - 9; i <= totalpages; i++) {
      list.push(i);
    }
    return list;
  } else {
    let list = [];
    for (let i = current_page; i < current_page + 10; i++) {
      list.push(i);
    }
    return list;
  }
};
