import Alpine from "alpinejs";
import "./index.css";

window.Alpine = Alpine;

Alpine.store("hero", "Send Message Via Kafka");

Alpine.store("app", {
  init() {
    fetch("http://localhost:3000/messages")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.messages = data;
      });
  },
  message: "",
  messages: [],
  sendMessage() {
    fetch("http://localhost:3000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: this.message,
      }),
    });
    this.message = "";
  },
});

Alpine.start();
