const express = require('express');
const actorController = require('../controllers/actorController');

const router = express.Router();

router.param('id', actorController.checkId);

router.route('/').get(actorController.getAllActors);
router.route('/:id').get(actorController.getActor);

module.exports = router;
