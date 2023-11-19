// routes/allergyRoutes.js
import express from'express';
const router = express.Router();
import {scrapeAllergies} from '../controllers/allergyController.js';

// Middleware pour déclencher le scraping
router
.route('/scrape-allergies')
.get(scrapeAllergies);

export default router;
