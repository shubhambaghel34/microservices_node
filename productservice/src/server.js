require("dotenv").config();
const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Smartphone", price: 800 }
]; // Static product data

// // Add Product
// app.post("/productsdata", (req, res) => {
//     const newProduct = { id: products.length + 1, ...req.body };
//     products.push(newProduct);
//     res.json({ message: "Product added", product: newProduct });
// });

// // Get Products
// app.get("/productsdetails", (req, res) => {
//     res.json(products);
// });
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function consumeQueue(queue) {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  console.log(`📥 Product Service listening for messages on queue: ${queue}`);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const eventData = JSON.parse(msg.content.toString());
      console.log("📦 Product Service received:", eventData);
      channel.ack(msg);
    }
  });
}

// Start listening
consumeQueue("user_registered");

app.listen(4002, () => console.log("Product Service running on port 4002"));
