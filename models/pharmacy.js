import mongoose from "mongoose"
const {Schema,model} = mongoose
const pharmacySchema = new mongoose.Schema({
    name: String,
    location: String,
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacist' }],
});
  
const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);