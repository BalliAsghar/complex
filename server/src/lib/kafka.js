import { Kafka, Partitioners } from "kafkajs";

async function connectKafka() {
  const kafka = new Kafka({
    clientId: "server",
    brokers: ["balliasgharsair:9092"],
    logLevel: "debug",
  });

  return kafka;
}

export async function relayMessage(topic, message) {
  const KafkaInit = await connectKafka();

  const producer = KafkaInit.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  await producer.connect();

  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });

  await producer.disconnect();

  return true;
}
