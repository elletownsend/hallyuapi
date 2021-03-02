const fs = require('fs');

const actors = JSON.parse(fs.readFileSync(`${__dirname}/data/all_actors.json`));

const checkId = (req, res, next, value) => {
  if (value * 1 > actors.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }
};

const getAllActors = (req, res) => {
  let results = [];

  if (req.query.q != undefined || req.query.q != null) {
    let query = req.query.q.toLowerCase().replace(/\s|[^\w]/g, '');

    results = actors.filter(
      (item) =>
        item.FullName.toLowerCase()
          .replace(/\s|[^\w]/g, '')
          .includes(query) ||
        item.StageName.toLowerCase()
          .replace(/\s|[^\w]/g, '')
          .includes(query)
    );
  } else {
    results = actors;
  }

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
};

const getActor = (req, res) => {
  const id = req.params.id * 1;
  const actor = actors.find((item) => item.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
};

module.exports = {
  checkId,
  getAllActors,
  getActor
};
