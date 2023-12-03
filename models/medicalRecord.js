import mongoose from 'mongoose';

const allergySchema = new mongoose.Schema({
  substance: { type: String, required: true },
  reaction: { type: String, required: true },
  pinned: { type: Boolean, default: false },
});

const medicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  diagnoses: [{ type: String, required: false }],
  immunizations: [{
    name: { type: String, required: false },
    date: { type: Date, required: false },
  }],
  allergies: [allergySchema],  // Utiliser le schéma défini ci-dessus pour chaque allergie
  medicalNotes: { type: String, required: false },
});


medicalRecordSchema.methods.addAllergy = async function(allergy) {
  this.allergies.push(allergy);
  await this.save();
};
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
