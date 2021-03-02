const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

router.route('/').get(groupController.getAllGroups);
router.route('/:id').get(groupController.getGroup);

module.exports = router;
