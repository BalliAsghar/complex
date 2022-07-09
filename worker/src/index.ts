import { Kafka } from "kafkajs";

async function main() {
  const kafka = new Kafka({
    clientId: "worker",
    brokers: ["balliasgharsair:9092"],
  });

  const consumer = kafka.consumer({
    groupId: "worker-group",
  });

  await consumer.connect();
  await consumer.subscribe({
    topic: "message",
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `Received message ${message.toString()}, from Topic ${topic}`
      );
    },
  });
}

main();
