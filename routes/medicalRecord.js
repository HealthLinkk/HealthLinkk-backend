import express from 'express';
const router = express.Router();

import {
  getAllMedicalRecords,
  createMedicalRecord,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} from '../controllers/medicalRecord.js';



router
    .route('/medicalRecordAll')
    .get(getAllMedicalRecords);
// Create a new RendezVous
router
    .post('/', createMedicalRecord);

// Get RendezVous by ID
router.get('/:id', getMedicalRecordById);

// Update RendezVous by ID
router.put('/:id', updateMedicalRecord);

// Delete RendezVous by ID
router.delete('/:id', deleteMedicalRecord);

export default router;
