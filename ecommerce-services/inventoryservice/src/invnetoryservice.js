const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const SHIPPING_QUEUE = 'shippingQueue';

async function processInventory  (order, channel){
  try {
    const inventorySuccess = true; // Simulate inventory update
    if (inventorySuccess) {
      // Send shipping request to Shipping Service
      await channel.assertQueue(SHIPPING_QUEUE, { durable: true });
      channel.sendToQueue(SHIPPING_QUEUE, Buffer.from(JSON.stringify(order)));
      console.log('Inventory processed, sent to shipping');
    } else {
      console.log('Inventory update failed');
    }
  } catch (error) {
    console.error('Error processing inventory:', error);
  }
};

module.exports={processInventory}