import express from 'express';
const router = express.Router();
import { scrapeMedications } from '../controllers/medicationController.js';
import { getAllMedications } from '../controllers/medicationController.js';
// Middleware pour déclencher le scraping des médicaments
router
  .route('/')
  .get(scrapeMedications);

router
  .route('/get')
  .get(getAllMedications);



export default router;