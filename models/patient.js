import mongoose from 'mongoose';
import User from '../models/user.js';

const patientSchema = new mongoose.Schema({
  dateNaiss: { type: Date, required: true },
  Doctors: [{ type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Doctor' }],
});

const Patient = User.discriminator('Patient', patientSchema);

export default Patient;