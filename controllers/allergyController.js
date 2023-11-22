import Allergy from '../models/allergys.js';
import fs from 'fs';
import path from 'path';

// Middleware de scraping
export function scrapeAllergies(req, res, next) {
  try {
    // Chemin vers le fichier JSON contenant les données d'allergies
    const filePath = '../scraped_data.json';

    // Lisez le contenu du fichier JSON
    const rawData = fs.readFileSync(filePath);
    const allergiesData = JSON.parse(rawData);

    // Parcourez les données et enregistrez les noms dans la base de données
    allergiesData.forEach(async (allergyName) => {
      const allergy = new Allergy({ name: allergyName });

      await allergy.save();
    });

    res.status(200).json({ message: 'Noms d\'allergies lus depuis le fichier JSON et stockés avec succès' });
  } catch (error) {
    next(error);
  }
}

