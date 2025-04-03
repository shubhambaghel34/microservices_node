require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");

app.use(express.json());

const users = []; // Static array to store users

// // Register User
// app.post("/register", async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     users.push({ username, password: hashedPassword });
//     console.log("here in register route")
//     res.json({ message: "User registered successfully" });
// });

// // Login User
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token });
// });

// // Get User Info (Protected)
// app.get("/profile", (req, res) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = users.find(u => u.username === decoded.username);
//         res.json(user);
//     } catch {
//         res.status(401).json({ message: "Invalid token" });
//     }
// });


const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function consumeQueue(queue) {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  console.log(`📥 User Service listening for messages on queue: ${queue}`);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      try {
        // ✅ Ensure valid JSON before parsing
        const eventData = JSON.parse(msg.content.toString());
        console.log("✅ Received:", eventData);
      } catch (error) {
        console.error("❌ Error parsing JSON:", error.message);
      }
      channel.ack(msg); // Acknowledge the message
    }
  });  
}


  
consumeQueue("user_registered");
app.listen(4001, () => console.log("User Service running on port 4001"));
