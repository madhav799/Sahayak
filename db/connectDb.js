import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in .env file');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    // 🔁 Return cached connection if already connected
    return cached.conn;
  }

  if (!cached.promise) {
    console.log(`🔌 Connecting to MongoDB: ${MONGODB_URI}`);

    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "sahayak", // ✅ specify your DB name here if needed
    });
  }

  cached.conn = await cached.promise;
  console.log(`✅ MongoDB Connected: ${cached.conn.connection.host}`);
  return cached.conn;
};

export default connectDB;
