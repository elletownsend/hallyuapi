const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

router.param('id', groupController.checkId);

router.route('/').get(groupController.getAllGroups);
router.route('/:id').get(groupController.getGroup);

module.exports = router;
