const Comment = require('../model/Comment');
const Poll = require('../model/Poll');

exports.addComment = async (req, res) => {
  const { text } = req.body;
  const newComment = new Comment({
    text,
    poll: req.params.pollId,
    user: req.user.id
  });

  try {
    const comment = await newComment.save();
    const poll = await Poll.findById(req.params.pollId);
    poll.comments.push(comment);
    await poll.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
