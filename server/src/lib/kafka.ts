import { Kafka, Partitioners, logLevel } from "kafkajs";
async function connectKafka() {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [
      `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`,
      `${process.env.KAFKA_HOST}2:${process.env.KAFKA_PORT2}`,
      `${process.env.KAFKA_HOST3}3:${process.env.KAFKA_PORT3}`,
    ],
    logLevel: logLevel.INFO,
  });

  return kafka;
}

export async function relayMessage(topic: string, message: string) {
  const KafkaInit = await connectKafka();

  const producer = KafkaInit.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
  });
  producer.logger().setLogLevel(logLevel.INFO);

  await producer.connect();

  await producer.send({
    topic,
    messages: [
      {
        value: message,
      },
    ],
  });

  console.log("Message sent to Kafka");

  await producer.disconnect();

  return true;
}
