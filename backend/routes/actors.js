const groupRoutes = (app, fs) => {
    const dataPath = '../data/all_actors.json';

    const getData = () => {
        data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    };

    // GET .../API/ACTORS
    app.get('/api/actors', (req, res) => {
        let data = getData();

        if (req.query.q != undefined || req.query.q != null) {
            let query = req.query.q.toLowerCase().replace(/\s|[^\w]/g, '');

            let response = data.filter(item =>
                item.FullName.toLowerCase().replace(/\s|[^\w]/g, '').includes(query) ||
                item.StageName.toLowerCase().replace(/\s|[^\w]/g, '').includes(query)
            );

            res.json(response);
        } else {
            res.json(data);
        }
    });

    // GET .../API/ACTORS/:ID
    app.get('/api/actors/:id', function (req, res) {
        let data = getData();
        let id = req.params.id;

        let response = data.find(item => item.Id == id);

        if (response) {
            res.json(response);
        } else res.sendStatus(404);

    });

};

module.exports = groupRoutes;
