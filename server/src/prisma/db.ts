import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMessage(
  message_id: string,
  text: string,
  topic: string
) {
  await prisma.message.create({
    data: {
      message_id,
      text,
      topic,
    },
  });
}

export async function getMessages(topic: string) {
  const messages = await prisma.message.findMany({
    where: {
      topic,
    },
  });
  return messages;
}
