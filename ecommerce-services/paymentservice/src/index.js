const amqp = require('amqplib');

async function startPaymentService() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const paymentQueue = 'paymentQueue';
  const orderResponseQueue = 'orderResponseQueue';

  await channel.assertQueue(paymentQueue, { durable: true });
  await channel.assertQueue(orderResponseQueue, { durable: true });

  console.log(`[💳] Waiting for messages on ${paymentQueue}...`);

  channel.consume(paymentQueue, async (msg) => {
    const paymentInfo = JSON.parse(msg.content.toString());
    console.log(`[💰] Processing payment for order:`, paymentInfo.orderId);

    await new Promise((res) => setTimeout(res, 1000));

    const response = {
      orderId: paymentInfo.orderId,
      status: 'PAYMENT_SUCCESS',
    };

    channel.sendToQueue(orderResponseQueue, Buffer.from(JSON.stringify(response)));
    console.log(`[📤] Sent payment response:`, response);

    channel.ack(msg);
  });
}

startPaymentService().catch(console.error);
