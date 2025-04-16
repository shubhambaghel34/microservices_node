// src/producer.js
const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = process.env.QUEUE_NAME || 'sample_queue';

async function sendToQueue() {
  try {
    // Create a connection to RabbitMQ server
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Assert the queue (ensure it exists)
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    // Create a sample message
    const sampleMessage = { type: 'test', timestamp: Date.now() };
    
    // Send the message to the queue
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(sampleMessage)));
    console.log(`Sent message: ${JSON.stringify(sampleMessage)}`);

    // Close the connection after sending
    setTimeout(() => {
      connection.close();
    }, 500);
    
  } catch (error) {
    console.error('Error in producer:', error);
  }
}

// Call the function to send the message
sendToQueue();
