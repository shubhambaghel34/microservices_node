const express = require('express');
const dotenv = require('dotenv');
const { connectProducer, sendMessage } = require('./producer');
const { connectConsumer } = require('./consumer');

dotenv.config();
const app = express();
app.use(express.json());

(async () => {
  await connectProducer();

  await connectConsumer(['user-events', 'product-events'], (topic, msg) => {
    console.log(`[${topic}]`, msg);
  });
})();

app.post('/publish/:topic', async (req, res) => {
  const { topic } = req.params;
  const { key, value } = req.body;

  try {
    await sendMessage(topic, [{ key, value }]);
    res.json({ status: 'Message sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Kafka Service running on http://localhost:${PORT}`);
});
