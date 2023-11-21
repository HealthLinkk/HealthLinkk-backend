import express from 'express';
const router = express.Router();
import { scrapeMedications } from '../controllers/medicationController.js';
import { getAllMedications } from '../controllers/allergyController.js';
// Middleware pour déclencher le scraping des médicaments
router
  .route('/')
  .get(scrapeMedications);



export default router;