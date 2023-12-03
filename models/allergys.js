import mongoose from 'mongoose';

const allergySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const allergy = mongoose.model('Allergy', allergySchema);
export default allergy;