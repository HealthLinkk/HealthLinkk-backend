import mongoose from 'mongoose';
import dotenv from 'dotenv';

//connexiondatabase

const connectToDatabase = async () => {
  try {
    const mongoURI ="mongodb+srv://Bourguiba:k7H0HlqRuNTEll6i@cluster0.xqvj5bn.mongodb.net/HealthLink";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas HealthLink');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectToDatabase;