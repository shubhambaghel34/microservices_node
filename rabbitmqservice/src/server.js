// message-queue-service/src/index.js

const amqp=require('amqplib')
const dotenv = require('dotenv');

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = 'sample_queue';

// Function to handle message consumption and publishing
const connectToRabbitMQ = async () => {
  let connection;
  try {
    // Connect to RabbitMQ server
    connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Ensure the queue exists (if not, create it)
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`Connected to RabbitMQ. Listening on queue: ${QUEUE_NAME}`);

    // Consume messages from the queue
    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        console.log(`Received message: ${msg.content.toString()}`);
        channel.ack(msg); // Acknowledge that the message has been processed
      }
    });

    // Example message to send to the queue
    const sampleMessage = { type: 'test', timestamp: Date.now() };
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(sampleMessage)));
    console.log(`Sent sample message to queue: ${JSON.stringify(sampleMessage)}`);

    // Graceful shutdown on process termination
    process.on('SIGINT', async () => {
      console.log('Closing RabbitMQ connection...');
      await channel.close();
      await connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    if (connection) {
      await connection.close();
    }
  }
};

connectToRabbitMQ();
