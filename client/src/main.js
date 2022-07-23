import Alpine from "alpinejs";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
window.Alpine = Alpine;

Alpine.store("title", "Send Message Via Kafka");

Alpine.store("app", {
  init() {
    async function getMessages(messages) {
      const response = await fetch("http://localhost:3000/messages");
      const data = await response.json();
      messages.push(...data);
    }
    getMessages(this.messages);
  },
  message: "",
  messages: [],
  formatDate(date) {
    return dayjs(date).fromNow();
  },
  sendMessage() {
    async function postMessage(message) {
      const body = JSON.stringify({ message });
      const response = await fetch("http://localhost:3000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const data = await response.json();
      console.log(data);
    }
    postMessage(this.message);
    this.message = "";
  },
});

Alpine.start();
