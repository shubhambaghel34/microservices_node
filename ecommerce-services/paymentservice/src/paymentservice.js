const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const INVENTORY_QUEUE = 'inventoryQueue';

async function  processPayment  (order, channel) {
  try {
    const paymentSuccess = true; // Simulate payment process
    if (paymentSuccess) {
      // Send inventory request to Inventory Service
      await channel.assertQueue(INVENTORY_QUEUE, { durable: true });
      channel.sendToQueue(INVENTORY_QUEUE, Buffer.from(JSON.stringify(order)));
      console.log('Payment processed, sent to inventory');
    } else {
      console.log('Payment failed');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
  }
};

module.exports={processPayment}