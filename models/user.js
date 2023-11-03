import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName : { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    numTel: { type: Number, required: false,unique:false },
    picture: { type: String, required : false },
    role: { type: String, enum: ['Doctor', 'Patient', 'Pharmacist', 'AdminSup'], required: true },   
  });

  const User = mongoose.model('User', userSchema);


  //medecin
const doctorSchema = new mongoose.Schema({
  diplomaVerification: {
    isVerified: {type : Boolean,required : false, default : false},  
    verificationDocument: {type : String,required : false},  
    specialization: {type : String,required : false},
   },
   bio: { type: String, required : false }, 
   ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],  //rating medecin
   location: { type: String, required : true}, 
});
const Doctor = User.discriminator('Doctor', doctorSchema);

// Patient 
const patientSchema = new mongoose.Schema({
  dateNaiss: {type : Date , required:false},
  address : { type: String, required: false },
  // Other patient-specific fields
});

const Patient = User.discriminator('Patient',patientSchema);

const pharmacistSchema = new mongoose.Schema({
  name: {type : Date , required:false},
  location : { type: String, required: true },
  // Other patient-specific fields
});

export default model("user",userSchema);