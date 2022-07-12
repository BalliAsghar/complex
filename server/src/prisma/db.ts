import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMessage(text: string, topic: string) {
  const message = await prisma.message.create({
    data: {
      text,
      topic,
    },
  });
  return message;
}

export async function getMessages(topic: string) {
  const messages = await prisma.message.findMany({
    where: {
      topic,
    },
  });
  return messages;
}
