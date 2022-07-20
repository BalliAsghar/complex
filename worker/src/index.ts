import { Kafka } from "kafkajs";
import { SendMessage } from "./lib/slack";
import { config } from "dotenv";
import { updateMessage } from "./lib/db";

config();

async function main() {
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
    connectionTimeout: 10000,
    retry: {
      initialRetryTime: 100,
      retries: 10,
    },
  });

  const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID!,
  });

  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC!,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `Received message: ${message?.value?.toString()}, from Topic ${topic}`
      );
      await SendMessage(message?.value?.toString()!);
      // Message needs to be updated to acknowledge that it has been seen
      await updateMessage(message?.key?.toString()!, process.env.MONGODB_URI!);
    },
  });
}

main();
