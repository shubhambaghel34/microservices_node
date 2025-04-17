const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const PAYMENT_QUEUE = 'paymentQueue';

 async function startOrderSaga (order, channel) {
  try {
    // Send payment request to Payment Service
    await channel.assertQueue(PAYMENT_QUEUE, { durable: true });
    channel.sendToQueue(PAYMENT_QUEUE, Buffer.from(JSON.stringify(order)));
    console.log('Order sent to payment service');
  } catch (error) {
    console.error('Error in order saga:', error);
  }
};
module.exports={startOrderSaga};