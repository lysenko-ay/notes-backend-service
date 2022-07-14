const { Kafka } = require('kafkajs');
const Producer = require("./producer.kafka.js");
const Consumer = require("./consumer.kafka.js");

const kafka = new Kafka({
  clientId: 'notifications-app',
  brokers: ['192.168.99.100:9092'],
})

let producer;

module.exports = {
  start: async () => {
    producer = await Producer(kafka);
    await Consumer(kafka, "e-mail-group");
  },

  send: async (data) => {
    let success = await producer.send({
      topic: 'notifications',
      messages: [{ value: data }],
    })

    return success;
  }
};
