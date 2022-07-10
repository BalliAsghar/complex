import { App } from "@slack/bolt";
import { config } from "dotenv";

// load env variables
config();

export async function SendMessage(message: string) {
  const app = new App({
    token: process.env.BOT_TOKEN,
    signingSecret: process.env.SIGNING_SECRET,
    // socketMode: true,
    // appToken: process.env.APP_TOKEN,
  });

  const PORT = process.env.PORT || 3001;

  await app.start(PORT);
  console.log(`⚡️ Bolt app is running on port ${PORT}`);

  // const channelIds = channles.channels?.map((channel) => channel.id);

  await app.client.chat.postMessage({
    channel: "C02LBV7GR96",
    text: message,
  });

  // close the app
  await app.stop();

  console.log("⚡️ Bolt app is stopped");
}
