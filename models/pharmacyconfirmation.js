import mongoose from "mongoose"
const {Schema,model} = mongoose
const pharmacyConfirmationSchema = new mongoose.Schema({
    pharmacy: {type: mongoose.Schema.Types.ObjectId,ref: 'Pharmacy'},
    prescription: {type: mongoose.Schema.Types.ObjectId, ref: 'Prescription'},
    isConfirmed: {type: Boolean,default: false}
})
const pharmacyConfirmation = mongoose.model('PharmacyConfirmation',pharmacyConfirmationSchema);

export default model("pharmacyConfirmation",pharmacyConfirmationSchema);