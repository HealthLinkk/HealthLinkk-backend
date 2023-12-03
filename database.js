import mongoose from 'mongoose';
import dotenv from 'dotenv';

//connexiondatabase
dotenv.config();

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.DB_URL;

    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas HealthLink');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectToDatabase;