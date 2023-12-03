import express from 'express';
const router = express.Router();
import {createPrescription,getPatientPrescriptions,getPrescriptionDrugs} from '../controllers/prescription.js';

// créer une nouvelle prescription
import {auth} from '../middlewares/auth.js';
router.route('/createPrescription').post(auth,createPrescription);

// obtenir toutes les prescriptions d'un patient
router.route('/getPatientPrescriptions').get(getPatientPrescriptions);

// obtenir les médicaments d'une prescription
router.route('/:id').get(getPrescriptionDrugs);

export default router;