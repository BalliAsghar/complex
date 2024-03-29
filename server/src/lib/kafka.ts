import { Kafka, Partitioners, logLevel } from "kafkajs";
import { randomUUID } from "node:crypto";
import { saveMessage } from "./db";

async function connectKafka() {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
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

  await saveMessage(message, topic, randomID);

  console.log("Message saved to database");
  await producer.disconnect();

  return true;
}
