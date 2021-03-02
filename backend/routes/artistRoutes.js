const express = require('express');
const artistController = require('../controllers/artistController');

const router = express.Router();

router.route('/').get(artistController.getAllArtists);
router.route('/:id').get(artistController.getArtist);

module.exports = router;
