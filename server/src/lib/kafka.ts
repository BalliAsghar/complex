import { Kafka, Partitioners, logLevel } from "kafkajs";
import { config } from "dotenv";

config();

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
