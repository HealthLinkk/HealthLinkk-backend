import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateNaiss: {type : Date , required:true},
    numtel: { type: Number, required: true,unique:true },
    role: { type: String, enum: ['Doctor', 'Patient', 'Pharmacist', 'AdminSup'], required: true },
    diplomaVerification: {
    isVerified: {type : Boolean,required : true},  
    verificationDocument: {type : String,required : true},  
    specialization: {type : String,required : true},
   },
    
    picture: { type: String, required : true },   
    bio: { type: String, required : true },    
    location: { type: String, required : true },  
   
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],  //rating medecin
  });