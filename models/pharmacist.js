import mongoose from 'mongoose';
import User from '../models/user.js';

const pharmacistSchema = new mongoose.Schema({
    name: {type : Date , required:false},   
  });
  
  const Pharmacist = User.discriminator('Pharmacist',pharmacistSchema);

  export default Pharmacist;