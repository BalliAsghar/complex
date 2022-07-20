import mongoose, { Schema, connect, disconnect } from "mongoose";

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

const updateMessageRead = async (id: string) => {
  const message = await MessageModel.findOne({ messageid: id });
  if (message) {
    message.read = true;
    await message.save();
  }

  return message;
};

const updateMessage = async (id: string, URI: string) => {
  try {
    await connectDB(URI);
    await updateMessageRead(id);
    console.log("Message updated");
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log("Error updating message");
    console.log(error);
    process.exit(1);
  }
};

export { updateMessage };
