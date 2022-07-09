import Express from "express";

const app = Express();
app.use(Express.json());

app.post("/message", async (req: Express.Request, res: Express.Response) => {
  const { message } = req.body;
  console.log(message);
  res.send("OK");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
