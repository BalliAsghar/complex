import Express from "express";
import { relayMessage } from "./lib/kafka";
const app = Express();
app.use(Express.json());

app.post("/message", async (req: Express.Request, res: Express.Response) => {
  const { message, topic } = req.body;
  await relayMessage(topic, message);
  res.send("Message sent");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
