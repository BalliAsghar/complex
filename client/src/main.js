import Alpine from "alpinejs";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
window.Alpine = Alpine;

Alpine.store("title", "Send Message Via Kafka");

Alpine.store("app", {
  init() {
    this.getMessages()
      .then((messages) => {
        this.messages = messages;
      })
      .catch((err) => console.log(err));
  },
  message: "",
  messages: [],
  formatDate(date) {
    return dayjs(date).fromNow();
  },
  sendMessage() {
    async function postMessage(message) {
      const body = JSON.stringify({ message });
      await fetch("http://localhost:3000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
    }
    postMessage(this.message);
    this.message = "";
    // reload the page
    // need to figure out how to do this without reloading the page
    window.location.reload();
  },
  getMessages() {
    async function grabMessages() {
      const response = await fetch("http://localhost:3000/messages");
      const data = await response.json();

      return data;
    }
    return grabMessages();
  },
});

Alpine.start();
