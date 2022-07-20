import mongoose, { Schema, connect } from "mongoose";

const Message = new Schema({
  text: { type: String, required: true },
  topic: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

async function connectDB(URI: string) {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const MessageModel = mongoose.model("Message", Message);

export { MessageModel, connectDB };
