const fs = require('fs');

const groups = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/all_groups.json`)
);

const firstGroup = groups[0].Id;

const checkId = (req, res, next, value) => {
  if (value * 1 < firstGroup) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }
  next();
};

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
  const group = groups.find((item) => item.Id === id);

  res.status(200).json({
    status: 'success',
    data: {
      group
    }
  });
};

module.exports = {
  checkId,
  getAllGroups,
  getGroup
};
