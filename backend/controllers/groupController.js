const fs = require('fs');

const groups = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/all_groups.json`)
);

const firstGroup = groups[0].Id;
const lastGroup = groups[groups.length - 1].Id;

const checkId = (req, res, next, value) => {
  if (value * 1 < firstGroup || value * 1 > lastGroup) {
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
    let query = decodeURIComponent(req.query.q.toLowerCase());

    results = groups.filter(
      (item) =>
        item.Name.toLowerCase().includes(query) ||
        item.ShortName.toLowerCase().includes(query) ||
        item.KoreanName.toLowerCase().includes(query)
    );
    if (results.length == 0) {
      return res.status(404).json({
        status: 'failed',
        message: 'No entry found matching given criteria'
      });
    }
  } else {
    results = groups;
  }

  res.status(200).json({
    status: 'success',
    count: results.length,
    results: results
  });
};

const getGroup = (req, res) => {
  const id = req.params.id * 1;
  const group = groups.find((item) => item.Id === id);

  res.status(200).json({
    status: 'success',
    results: group
  });
};

module.exports = {
  checkId,
  getAllGroups,
  getGroup
};
