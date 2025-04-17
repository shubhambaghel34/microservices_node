const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const ORDER_QUEUE = 'orderQueue';

(async () => {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(ORDER_QUEUE, { durable: true });

    const order = {
      orderId: Math.floor(Math.random() * 1000),
      userId: 'u11111',
      items: [{ id: 'i456', qty: 5 }],
      amount: 101,
    };

    channel.sendToQueue(ORDER_QUEUE, Buffer.from(JSON.stringify(order)));
    console.log('Order initiated:', order);

    setTimeout(() => {
      conn.close();
    }, 500);
  } catch (err) {
    console.error('Failed to trigger order:', err);
  }
})();
