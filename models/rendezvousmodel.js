import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RendezVousSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  type: {
    type: String, enum: ['Online', 'Physical'],
    required: true
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  paiement: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false
  },
  State: {
    type: String, enum: ['Scheduled', 'Completed','Canceled'],
    default: 'Scheduled'
  },

});


export default model("RendezVous", RendezVousSchema);