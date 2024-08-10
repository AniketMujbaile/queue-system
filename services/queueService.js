const connectRabbitMQ = require('../config/rabbitmq');

let channel;

const initialize = async () => {
  channel = await connectRabbitMQ();
};

const sendToQueue = async (userId, message) => {
  await channel.assertQueue(userId, { durable: true });
  await channel.sendToQueue(userId, Buffer.from(message), { persistent: true });
};

module.exports = { initialize, sendToQueue };
