import mongoose, { Schema, connect } from "mongoose";

const Message = new Schema({
  text: { type: String, required: true },
  topic: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  messageid: { type: String, required: true },
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

const getAllMessages = async () => {
  try {
    const messages = await MessageModel.find();
    return messages;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const saveMessage = async (
  message: string,
  topic: string,
  messageid: string
) => {
  try {
    await MessageModel.create({
      text: message,
      topic,
      messageid,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB, getAllMessages, saveMessage };
