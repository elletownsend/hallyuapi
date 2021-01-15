const groupRoutes = (app, fs) => {
    const dataPath = '../data/all_groups.json';

    const getData = () => {
        data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    };

    // GET .../API/GROUPS
    app.get('/api/groups', (req, res) => {
        let data = getData();

        if (req.query.q != undefined || req.query.q != null) {
            let query = req.query.q.toLowerCase().replace(/\s|[^\w]/g, '');
            let response = data.filter(item => item.Name.toLowerCase().replace(/\s|[^\w]/g, '').includes(query));

            res.json(response);
        } else {
            res.json(data);
        }
    });

    // GET .../API/GROUPS/:ID
    app.get('/api/groups/:id', (req, res) => {
        let data = getData();
        let id = req.params.id;

        let response = data.find(item => item.Id == id);

        if (response) {
            res.json(response);
        } else res.sendStatus(404);
    });
};

module.exports = groupRoutes;
