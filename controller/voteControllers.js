const Vote = require('../model/Vote');
const Poll = require('../model/Poll');

exports.castVote = async (req, res) => {
  const { option } = req.body;
  const poll = await Poll.findById(req.params.pollId);

  if (!poll) {
    return res.status(404).json({ msg: 'Poll not found' });
  }

  const vote = new Vote({
    poll: req.params.pollId,
    option,
    user: req.user.id
  });

  poll.options = poll.options.map(opt => {
    if (opt.option === option) {
      return { option: opt.option, votes: opt.votes + 1 };
    }
    return opt;
  });

  try {
    await vote.save();
    await poll.save();
    res.json(vote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
