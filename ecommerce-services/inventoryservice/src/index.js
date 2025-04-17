const amqp = require('amqplib');

async function startInventoryService() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const inventoryQueue = 'inventoryQueue';

  await channel.assertQueue(inventoryQueue, { durable: true });

  console.log(`[📦] Inventory service waiting on ${inventoryQueue}...`);

  channel.consume(inventoryQueue, (msg) => {
    const inventoryRequest = JSON.parse(msg.content.toString());
    console.log(`[✅] Inventory reserved for order: ${inventoryRequest.orderId}`);

    channel.ack(msg);
  });
}

startInventoryService().catch(console.error);
