const express = require('express');
const { addComment } = require('../controller/commentControllers');
const auth = require('../config/auth');

const router = express.Router();

router.post('/:pollId/comments', auth, addComment);

module.exports = router;
