// routes/allergyRoutes.js
import express from'express';
const router = express.Router();
import {scrapeAllergies} from '../controllers/allergyController.js';
import {getAllAllergys} from '../controllers/allergyController.js';

// Middleware pour déclencher le scraping
router
.route('/scrape-allergies')
.get(scrapeAllergies);


router
  .route('/get')
  .get(getAllAllergys);

export default router;
