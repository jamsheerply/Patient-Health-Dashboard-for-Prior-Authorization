import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error(
      "⛔ MONGODB_URI is not defined in the environment variables."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("🍃 Connected to the database successfully");
  } catch (error) {
    console.error(
      "⛔ Failed to connect to the database:",
      (error as Error).message
    );
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected. Attempting to reconnect...");
  });

  process.on("SIGINT", async () => {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (err) {
      console.error(
        "Error during MongoDB connection closure:",
        (err as Error).message
      );
      process.exit(1);
    }
  });
};

export default connectToDatabase;
