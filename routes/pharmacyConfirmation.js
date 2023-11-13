import express from 'express';
const router = express.Router();
import {getAllPharmacyConfirmations,confirmPrescription} from '../controllers/pharmacyconfirmation.js';

// obtenir toutes les confirmations d'une pharmacie
router.route('/getAllPharmacyConfirmations').get(getAllPharmacyConfirmations);

// Confirmer une Prescription par une Pharmacie
router.route('/confirmPrescription').post(confirmPrescription);

export default router;