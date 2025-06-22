const amqp=require('amqp');
const dotenv = require('dotenv');

dotenv.config();

async function processShipping(order, channel) {
  try {
    const shippingSuccess = true; // Simulate shipping process
    if (shippingSuccess) {
      console.log('Order shipped successfully');
    } else {
      console.log('Shipping failed');
    }
  } catch (error) {
    console.error('Error processing shipping:', error);
  }
};
module.exports={processShipping};