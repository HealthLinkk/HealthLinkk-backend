import mongoose from "mongoose"
const {Schema,model} = mongoose
const prescriptionSchema = new mongoose.Schema({
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    prescriptedDrugs: [
        {
            drug: { type: mongoose.Schema.ObjectId, ref: 'Drug'},
            dosage :{ type: String,required : true} 
        }
    ]
});
const Prescription = mongoose.model('Prescription',prescriptionSchema);

export default model("prescription",prescriptionSchema);