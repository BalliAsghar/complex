import Express from "express";
import { relayMessage } from "./lib/kafka";
const app = Express();
app.use(Express.json());

app.post("/message", async (req: Express.Request, res: Express.Response) => {
  const { message } = req.body;
  const { KAFKA_TOPIC } = process.env;
  await relayMessage(KAFKA_TOPIC!, message);
  res.send("Message sent");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
