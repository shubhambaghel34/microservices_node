const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'kafkaservice',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const sendMessage = async (topic, messages) => {
  await producer.send({ topic, messages });
};

module.exports = {
  connectProducer,
  sendMessage,
};
