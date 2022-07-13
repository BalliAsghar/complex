import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateMessage(message_id: string) {
  await prisma.message.update({
    where: { message_id },
    data: {
      received: true,
    },
  });
}
