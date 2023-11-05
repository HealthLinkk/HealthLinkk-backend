import mongoose from 'mongoose';
import User from '../models/user.js';

const doctorSchema = new mongoose.Schema({
  
  diplomaVerification: {
    isVerified: { type: Boolean, required: true, default: false },
    verificationDocument: { type: String, required: false },
    specialization: { type: String, required: false },
  },
  bio: { type: String, required: false },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
 
});

const Doctor = User.discriminator('Doctor', doctorSchema);

export default Doctor;