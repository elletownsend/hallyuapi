const groupRoutes = require('./groups');
const artistRoutes = require('./artists');
const actorRoutes = require('./actors');

const appRouter = (app, fs) => {
    app.get('/api', (req, res) => {
        // ROOT - send routes for each resource
        res.send({
            "groups": "route/api/groups",
            "artists": "route/api/artists",
            "actors": "route/api/actors"
        });
    });

    app.get('/api/hello', (req, res) => res.send("안녕!"));

    // Data Routes
    groupRoutes(app, fs);
    artistRoutes(app, fs);
    actorRoutes(app, fs);
};

module.exports = appRouter;