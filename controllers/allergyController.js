// controllers/allergyController.js
import Allergy from '../models/allergys.js';
import request from 'request';
import cheerio from 'cheerio';

// Middleware de scraping
export function scrapeAllergies(req, res, next) {
  try {
    // URL de la source fictive des allergies (à remplacer par une source réelle)
    const sourceUrl = 'https://fr.wikipedia.org/wiki/Liste_des_principaux_allerg%C3%A8nes';

    request(sourceUrl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);

        // Sélectionnez les éléments HTML contenant les noms d'allergies
        const allergyElements = $('ul.allergies-list li');

        // Parcourez les éléments et enregistrez les noms dans la base de données
        allergyElements.each(async (index, element) => {
          const allergyName = $(element).text();
          const allergy = new Allergy({ name: allergyName });

          await allergy.save();
        });

        res.status(200).json({ message: 'Noms d\'allergies scrapés et stockés avec succès' });
      } else {
        next(new Error('Impossible de récupérer la source des allergies'));
      }
    });
  } catch (error) {
    next(error);
  }
}


