import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error((err as Error).message); // Explicitly cast `err` to `Error` type
    process.exit(1);
  }
};

export default connectDB;
