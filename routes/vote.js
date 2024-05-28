const express = require('express');
const router = express.Router();
const { castVote } = require('../controller/voteControllers');
const auth = require('../config/auth');



router.post('/:pollId/vote', auth, castVote);

module.exports = router;
