import Express from "express";
import { relayMessage } from "./lib/kafka";
import { config } from "dotenv";
import { connectDB } from "./lib/db";

config();

const app = Express();
app.use(Express.json());

// Connect to MongoDB
connectDB(process.env.MONGODB_URI!);

app.post("/message", async (req: Express.Request, res: Express.Response) => {
  const { message } = req.body;
  await relayMessage(process.env.KAFKA_TOPIC!, message);
  res.send("Message sent");
});

// app.get("/messages", async (req: Express.Request, res: Express.Response) => {
//   // const { topic } = req.body;
//   const messages = await getMessages("message");
//   res.json(messages);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
