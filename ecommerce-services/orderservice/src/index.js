const amqp = require('amqplib');

async function startOrderSaga() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const paymentQueue = 'paymentQueue';
  const inventoryQueue = 'inventoryQueue';
  const orderResponseQueue = 'orderResponseQueue';

  await channel.assertQueue(paymentQueue, { durable: true });
  await channel.assertQueue(inventoryQueue, { durable: true });
  await channel.assertQueue(orderResponseQueue, { durable: true });

  const order = {
    orderId: 'order_' + Date.now(),
    userId: 'user123',
    productId: 'product123',
    amount: 250,
    quantity: 3
  };

  // Step 1: Send to payment service
  channel.sendToQueue(paymentQueue, Buffer.from(JSON.stringify(order)));
  console.log(`[🧾] Order sent to Payment:`, order);

  // Step 2: Listen for response from payment service
  channel.consume(orderResponseQueue, (msg) => {
    const response = JSON.parse(msg.content.toString());
    console.log(`[📬] Order service received response:`, response);

    if (response.status === 'PAYMENT_SUCCESS') {
      // Forward to inventory service
      channel.sendToQueue(inventoryQueue, Buffer.from(JSON.stringify(order)));
      console.log(`[📦] Forwarded to Inventory service.`);
    }

    channel.ack(msg);
  });
}

startOrderSaga().catch(console.error);
