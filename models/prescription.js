import mongoose from 'mongoose'
const {Schema,model} = mongoose
const prescriptionSchema = new mongoose.Schema({
    doctor: {type: String, ref: 'user'},
    patient: {type: String, ref: 'user'},
    prescribedDrugs: [
        {
            drug: { type: String,required : false},
            dosage :{ type: String,required : false} 
        }
    ]
});

const Prescription = mongoose.model('Prescription',prescriptionSchema);

export default model("prescription",prescriptionSchema);