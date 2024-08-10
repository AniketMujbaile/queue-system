const amqp = require('amqplib');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const startWorker = async () => {
  try {
    await client.connect();
    const db = client.db('queueSystem');
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    channel.consume(process.env.WORKER_QUEUE, async (msg) => {
      if (msg !== null) {
        const request = JSON.parse(msg.content.toString());
        console.log(`Processing request: ${request}`);
        
        // Process the request here
        await db.collection('processedRequests').insertOne(request);
        
        channel.ack(msg);
      }
    }, { noAck: false });

    console.log('Worker started');
  } catch (error) {
    console.error('Worker error:', error);
  }
};

startWorker();
