const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'kafkaservice',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'kafka-group' });

const connectConsumer = async (topics, handleMessage) => {
  await consumer.connect();

  // Subscribe to each topic BEFORE running the consumer
  for (const topic of topics) {
    await consumer.subscribe({ topic, fromBeginning: true });
  }

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      handleMessage(topic, {
        key: message.key?.toString(),
        value: message.value?.toString(),
        offset: message.offset,
      });
    },
  });
};

module.exports = {
  connectConsumer,
};
