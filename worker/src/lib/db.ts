import mongoose, { Schema, connect, disconnect } from "mongoose";

const Message = new Schema({
  text: { type: String, required: true },
  topic: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  sent: { type: Boolean, default: false },
  messageid: { type: String, required: true },
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
  try {
    await MessageModel.findOneAndUpdate({ messageid: id }, { sent: true });
  } catch (error) {
    console.log("Error updating message");
    console.log(error);
    process.exit(1);
  }
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
