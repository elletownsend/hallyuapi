const express = require('express');
const artistController = require('../controllers/artistController');

const router = express.Router();

router.param('id', artistController.checkId);

router.route('/').get(artistController.getAllArtists);
router.route('/:id').get(artistController.getArtist);

module.exports = router;
