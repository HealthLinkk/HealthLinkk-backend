import express from 'express';
const router = express.Router();
import {getAllPharmacies,updatePharmacy,getNearestPharmacy,findPharmacyByLocation} from '../controllers/pharmacist.js' ;
import {getPatientPrescriptionsByID} from '../controllers/prescription.js';


//obtenir toutes les pharmacies
router.route('/getAllPharmacies').get(getAllPharmacies);

//obtenir les prescriptions relatives à un patient 
router.route('/:id').get(getPatientPrescriptionsByID);

//recherche de Pharmacies par Emplacement
router.route('/findPharmacyByLocation').get(findPharmacyByLocation);

//mettre à jour une pharmacie
router.route('/updatePharmacy').put(updatePharmacy);

//récuperer les pharmacies les plus proches
router.route('/getNearestPharmacy').get(getNearestPharmacy);

export default router;