const amqp = require('amqplib');

const QUEUE = 'paymentQueue';

async function startPaymentService() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    console.log(`[✔] Payment Service waiting for messages on "${QUEUE}"...`);

    channel.consume(QUEUE, async (msg) => {
      if (msg !== null) {
        const paymentData = JSON.parse(msg.content.toString());
        console.log(`[💸] Processing payment for order: ${paymentData.orderId}`);

        // Simulate payment processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log(`[✅] Payment successful for order: ${paymentData.orderId}`);
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('[❌] Payment Service failed:', err);
  }
}

startPaymentService();
