const fs = require('fs');

const artists = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/all_artists.json`)
);

const firstArtist = artists[0].Id;
const lastArtist = artists[artists.length - 1].Id;

const checkId = (req, res, next, value) => {
  if (value * 1 < firstArtist || value * 1 > lastArtist) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }
  next();
};

const getAllArtists = (req, res) => {
  let results = [];

  if (req.query.q != undefined || req.query.q != null) {
    let query = req.query.q.toLowerCase().replace(/\s|[^\w]/g, '');

    results = artists.filter(
      (item) =>
        item.FullName.toLowerCase()
          .replace(/\s|[^\w]/g, '')
          .includes(query) ||
        item.StageName.toLowerCase()
          .replace(/\s|[^\w]/g, '')
          .includes(query) ||
        item.Group.toLowerCase()
          .replace(/\s|[^\w]/g, '')
          .includes(query)
    );
  } else {
    results = artists;
  }

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
};

const getArtist = (req, res) => {
  const id = req.params.id * 1;
  const artist = artists.find((item) => item.Id === id);

  res.status(200).json({
    status: 'success',
    data: {
      artist
    }
  });
};

module.exports = {
  checkId,
  getAllArtists,
  getArtist
};
