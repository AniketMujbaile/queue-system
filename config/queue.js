const amqp = require('amqplib');

async function connectQueue() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672'); // Change 'rabbitmq' to 'localhost'
    console.log('RabbitMQ connected');
    return connection;
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    throw error;
  }
}

module.exports = connectQueue;
