import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  diagnoses: [{ type: String, required: false }],
  immunizations: [{
    name: { type: String, required: true },
    date: { type: Date, required: true },
  }],
  allergies: [{
    substance: { type: String, required: true },
    reaction: { type: String, required: true },
  }],
  medicalNotes: { type: String, required: false },
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
