const artistRoutes = (app, fs) => {
    const dataPath = '../data/all_artists.json';

    const getData = () => {
        data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    };

    // GET .../API/ARTISTS
    app.get('/api/artists', (req, res) => {
        let data = getData();

        if (req.query.q != undefined || req.query.q != null) {
            let query = req.query.q.toLowerCase().replace(/\s|[^\w]/g, '');

            let response = data.filter(item =>
                item.FullName.toLowerCase().replace(/\s|[^\w]/g, '').includes(query) ||
                item.StageName.toLowerCase().replace(/\s|[^\w]/g, '').includes(query) ||
                item.Group.toLowerCase().replace(/\s|[^\w]/g, '').includes(query)
            );

            res.json(response);
        } else {
            res.json(data);
        }
    });

    // GET .../API/ARTISTS/:ID
    app.get('/api/artists/:id', (req, res) => {
        let data = getData();
        let id = req.params.id;

        let response = data.find(item => item.Id == id);

        if (response) {
            res.json(response);
        } else res.sendStatus(404);

    });

};

module.exports = artistRoutes;