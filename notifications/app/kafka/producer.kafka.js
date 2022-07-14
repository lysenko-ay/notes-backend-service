
module.exports = async (kafka) => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
}
