// src/consumer.js
const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = process.env.QUEUE_NAME || 'sample_queue';

async function receiveFromQueue() {
  try {
    // Create a connection to RabbitMQ server
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Assert the queue (ensure it exists)
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);

    // Consume messages from the queue
    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        console.log('Received message:', messageContent);
        channel.ack(msg); // Acknowledge the message
      }
    });
  } catch (error) {
    console.error('Error in consumer:', error);
  }
}

// Call the function to start consuming messages
receiveFromQueue();
