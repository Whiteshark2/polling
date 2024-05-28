const Poll = require('../model/Poll');

exports.createPoll = async (req, res) => {
  const { question, options } = req.body;
  const newPoll = new Poll({
    question,
    options: options.map(option => ({ option, votes: 0 })),
    createdBy: req.user.id
  });

  try {
    const poll = await newPoll.save();
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate('createdBy', 'username');
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate('createdBy', 'username').populate('comments');
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.vote = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    const option = poll.options.find(opt => opt.option === req.body.option);
    option.votes += 1;

    await poll.save();
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
