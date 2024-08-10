const { sendToQueue } = require('../services/queueService');

exports.enqueueRequest = async (req, res) => {
  try {
    await sendToQueue(req.userId, JSON.stringify(req.body));
    res.status(200).json({ message: 'Request enqueued' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
