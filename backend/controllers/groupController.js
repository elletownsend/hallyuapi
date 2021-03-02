const fs = require('fs');

const groups = JSON.parse(
  fs.readFileSync(`${__dirname}/data/all_artists.json`)
);

const getAllGroups = (req, res) => {
  let results = [];

  if (req.query.q != undefined || req.query.q != null) {
    let query = req.query.q;

    query = req.query.q.toLowerCase().replace(/\s|[^\w]/g, '');

    results = groups.filter((item) =>
      item.Name.toLowerCase()
        .replace(/\s|[^\w]/g, '')
        .includes(query)
    );
  } else {
    results = groups;
  }

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
};

const getGroup = (req, res) => {
  const id = req.params.id * 1;
  const group = groups.find((item) => item.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      group
    }
  });
};

module.exports = {
  getAllGroups,
  getGroup
};
