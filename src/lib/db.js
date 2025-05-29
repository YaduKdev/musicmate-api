import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};
