const nodemailer = require('nodemailer');
const config = require("../config/email.config.js")

const transporter = nodemailer.createTransport(config.transport);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async (kafka, groupId) => {
  const consumer = kafka.consumer({ groupId });

  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'notifications', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        let payload = JSON.parse(message.value.toString());
        // transporter.sendMail({
        //   from: config.transport.auth.user,
        //   to: payload.email,
        //   subject: payload.subject,
        //   text: payload.text,
        // }, (error) => console.log(error));

        console.log(payload);
        await sleep(1000);
      },
    });
  }
  catch (error) {
    console.log(`failed to start consumer: ${error}`);
  };

  return consumer;
}
