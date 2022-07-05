const keys = require("./keys");

// Express Setup
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Postgres Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("error", (err) => console.log(err));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch((err) => console.log(err));

// Redis Setup

const redis = require("redis").createClient({
  url: keys.redisHost,
  retry_strategy: () => 1000,
});

const redisPub = redis.duplicate();

// Express Route Handlers
app.get("/", (req, res) => res.send("Hi"));

app.get("/values/all", async (req, res) => {
  try {
    const values = await pgClient.query("SELECT * FROM values");
    res.send(values.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/values/current", async (req, res) => {
  try {
    const values = await redis.hGetAll("values");
    res.send(values);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }

  try {
    redis.hSet("values", index, "Nothing yet!");
    redisPub.publish("insert", index);
    pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
    res.send({ working: true });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log("Listening on port 5000"));
