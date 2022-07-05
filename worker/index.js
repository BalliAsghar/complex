const keys = require("./keys");
const redis = require("redis");

const client = redis.createClient({
  url: keys.redisHost,
});
const sub = client.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on("message", (channel, message) => {
  client.hSet("values", message, fib(parseInt(message)));
});

client.subscribe("insert");
