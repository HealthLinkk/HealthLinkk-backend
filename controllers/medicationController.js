import Medication from '../models/medication.js';
import fs from 'fs';
import { exec } from 'child_process';

// Middleware de scraping pour les médicaments
export function scrapeMedications(req, res, next) {
  try {
    // Chemin vers le fichier JSON contenant les données de médicaments
    const filePath = 'C:\\Users\\Aziz Bouharb\\Desktop\\scraped_medications.json';
    
    // Chemin vers le script Python
    const pythonScriptPath = 'med.py';

    // Exécutez le script Python
    const command = `python ${pythonScriptPath}`;
    exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors de l'exécution du script Python: ${error}`);
        return next(error);
      }

      // Lisez le contenu du fichier JSON généré par le script Python
      const rawData = fs.readFileSync(filePath);
      const medicationsData = JSON.parse(rawData);

      // Utilisez Promise.all pour attendre que toutes les opérations asynchrones soient terminées
      const saveMedicationsPromises = medicationsData.map(async (medicationName) => {
        if (medicationName.trim() !== '') {
            const medication = new Medication({ name: medicationName });
            await medication.save();
          }
      });

      await Promise.all(saveMedicationsPromises);

      res.status(200).json({ message: 'Noms de médicaments lus depuis le fichier JSON et stockés avec succès' });
    });
  } catch (error) {
    next(error);
  }
}
