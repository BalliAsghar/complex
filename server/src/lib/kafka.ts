import { Kafka, Partitioners, logLevel } from "kafkajs";
import { randomUUID } from "node:crypto";

async function connectKafka() {
  const brokers = () => {
    if (process.env.DEVELOPMENT) {
      return [`localhost:9092`];
    }
    return [
      `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`,
      `${process.env.KAFKA_HOST}2:${process.env.KAFKA_PORT}`,
      `${process.env.KAFKA_HOST}3:${process.env.KAFKA_PORT}`,
    ];
  };

  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: brokers(),
    logLevel: logLevel.INFO,
  });

  return kafka;
}

export async function relayMessage(topic: string, message: string) {
  const KafkaInit = await connectKafka();

  const randomID = randomUUID().toString();

  const producer = KafkaInit.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
  });
  producer.logger().setLogLevel(logLevel.INFO);

  await producer.connect();

  await producer.send({
    topic,
    messages: [{ key: randomID, value: message }],
  });

  console.log("Message sent to Kafka");

  // console.log("Message saved to database");

  await producer.disconnect();

  return true;
}
