  
import mongoose from 'mongoose';

const specialtySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const Specialty = mongoose.model('Specialty', specialtySchema);

export default Specialty;
