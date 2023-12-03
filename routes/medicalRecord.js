import express from 'express';
const router = express.Router();

import {
  getAllMedicalRecords,
  createMedicalRecord,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
  getAllergiesByPatient,
  pinAllergy,
  addAllergy,
  getAllergiesForMedicalRecord,
} from '../controllers/medicalRecord.js';



router
    .route('/medicalRecordAll')
    .get(getAllMedicalRecords);
// Create a new RendezVous
router
    .post('/', createMedicalRecord);

// Get RendezVous by ID
router.get('/byid/:id', getMedicalRecordById);

// Get PatientAllergy
router
.route('/allergy/:patient')
.get(getAllergiesByPatient);

router
.route('/getallergy/:medicalRecordId')
.get(getAllergiesForMedicalRecord);

// Update RendezVous by ID
router.put('/:id', updateMedicalRecord);

// Delete RendezVous by ID
router.delete('/:id', deleteMedicalRecord);

router.put('/:medicalRecordId/pin/:allergyId', pinAllergy);

router.post('/:medicalRecordId/allergies', addAllergy);

export default router;
