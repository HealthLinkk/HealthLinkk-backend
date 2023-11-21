import Medication from '../models/medication.js';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

export async function scrapeMedications(req, res, next) {
  try {
    // Chemin vers le fichier JSON contenant les données de médicaments
    const filePath = new URL('../scraped_medications.json', import.meta.url);

    // Lisez le contenu du fichier JSON
    const rawData = fs.readFileSync(filePath);
    const medicationsData = JSON.parse(rawData);

    // Parcourez les données et enregistrez les noms dans la base de données
    medicationsData.forEach(async (medicationName) => {
      const medication = new Medication({ name: medicationName });

      await medication.save();
    });

    const allMedications = await Medication.find();

    res.status(200).json({ medications: allMedications });
  } catch (error) {
    next(error);
  }
}

