import Express from "express";
import { relayMessage } from "./lib/kafka";
import { config } from "dotenv";
import { connectDB, getAllMessages } from "./lib/db";
import cors from "cors";

config();

const app = Express();
app.use(Express.json());
app.use(cors());

// Connect to MongoDB
connectDB(process.env.MONGODB_URI!);

app.post("/message", async (req: Express.Request, res: Express.Response) => {
  const { message } = req.body;
  await relayMessage(process.env.KAFKA_TOPIC!, message);
  res.send("Message sent");
});

app.get("/messages", async (req: Express.Request, res: Express.Response) => {
  try {
    const messages = await getAllMessages();

    messages.length > 0 ? res.json(messages) : res.send("No messages");
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
