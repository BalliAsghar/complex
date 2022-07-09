import { Kafka, Partitioners, logLevel } from "kafkajs";

async function connectKafka() {
  const kafka = new Kafka({
    clientId: "server",
    brokers: ["balliasgharsair:9092"],
    logLevel: logLevel.ERROR,
  });

  return kafka;
}

export async function relayMessage(topic, message) {
  const KafkaInit = await connectKafka();

  const producer = KafkaInit.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });
  producer.logger().setLogLevel(logLevel.DEBUG);

  await producer.connect();

  await producer.send({
    topic,
    messages: [
      {
        value: message,
      },
    ],
  });

  await producer.disconnect();

  return true;
}
