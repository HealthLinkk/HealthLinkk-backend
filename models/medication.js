import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const medication = mongoose.model('Medication', medicationSchema);
export default medication;
