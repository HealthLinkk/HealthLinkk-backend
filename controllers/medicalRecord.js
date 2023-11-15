import MedicalRecord from '../models/medicalRecord.js';



// Get All Medical Records
export async function getAllMedicalRecords(req, res, next) {
    try {
        const medicalRecords = await MedicalRecord.find({}).exec();
        res.status(200).json(medicalRecords);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(error);
    }
};

// Get Medical Record by ID
export async function getMedicalRecordById(req, res, next) {
    try {
        const medicalRecord = await MedicalRecord.findById(req.params.id).exec();
        if (!medicalRecord) {
            return res.status(404).json({ error: 'Medical Record not found' });
        }
        res.status(200).json(medicalRecord);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(error);
    }
}

// Create a new Medical Record
export async function createMedicalRecord(req, res, next) {
    try {
        const medicalRecord = await MedicalRecord.create(req.body);
        res.status(201).json(medicalRecord);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
        console.error(error);
    }
}

// Update Medical Record by ID
export async function updateMedicalRecord(req, res, next) {
    try {
        const medicalRecord = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).exec();
        if (!medicalRecord) {
            return res.status(404).json({ error: 'Medical Record not found' });
        }
        res.status(200).json(medicalRecord);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
        console.error(error);
    }
}

// Delete Medical Record by ID
export async function deleteMedicalRecord(req, res, next) {
    try {
        const medicalRecord = await MedicalRecord.findByIdAndRemove(req.params.id).exec();
        if (!medicalRecord) {
            return res.status(404).json({ error: 'Medical Record not found' });
        }
        res.status(200).json("Deleted successfully");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(error);
    }
}

export async function getAllergiesByPatient(req, res, next) {
    try {
      // Récupérez l'ID du patient à partir des paramètres de la requête
     
  
      // Recherchez le dossier médical du patient
      const medicalRecord = await MedicalRecord.findOne({ patient: req.params.patient});
      
  
      // Vérifiez si le dossier médical existe
      if (!medicalRecord) {
        return res.status(404).json({ message: 'Dossier médical introuvable pour le patient spécifié' });
      }
  
      // Récupérez les allergies du dossier médical du patient
      const allergies = medicalRecord.allergies;
  
      // Triez les allergies pour afficher d'abord les allergies épinglées
      const sortedAllergies = allergies.sort((a, b) => (b.pinned - a.pinned));
  
      res.status(200).json({ allergies: sortedAllergies });
    } catch (error) {
      next(error);
    }
  }

  export async function pinAllergy(req, res, next) {
    try {
      const { medicalRecordId, allergyId } = req.params;
  
      const medicalRecord = await MedicalRecord.findById(medicalRecordId);
  
      if (!medicalRecord) {
        return res.status(404).json({ message: 'Dossier médical introuvable' });
      }
  
      const allergy = medicalRecord.allergies.find(a => a._id.toString() === allergyId);
  
      if (!allergy) {
        return res.status(404).json({ message: 'Allergie introuvable dans le dossier médical' });
      }
  
      // Inversez l'état de l'option "pinned" pour cette allergie
      allergy.pinned = !allergy.pinned;
  
      await medicalRecord.save();
  
      res.status(200).json({ message: 'Allergie épinglée avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'épinglage de l\'allergie :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  export async function addAllergy(req, res, next) {
    try {
      const { medicalRecordId } = req.params;
      const { substance, reaction } = req.body;
  
      const medicalRecord = await MedicalRecord.findById(medicalRecordId);
  
      if (!medicalRecord) {
        return res.status(404).json({ message: 'Dossier médical introuvable' });
      }
  
      // Créez une nouvelle allergie
      const newAllergy = { substance, reaction, pinned: false };
  
      // Ajoutez l'allergie au dossier médical
      await medicalRecord.addAllergy(newAllergy);
  
      res.status(201).json({ message: 'Allergie ajoutée avec succès', newAllergy });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'allergie :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  export async function getAllergiesForMedicalRecord(req, res, next) {
    try {
      const medicalRecordId = req.params.medicalRecordId;
  
    
  
      const medicalRecord = await MedicalRecord.findById(medicalRecordId).exec();
  
      // Assurez-vous que le dossier médical existe
      if (!medicalRecord) {
        return res.status(404).json({ error: 'Medical Record not found' });
      }
  
      // Triez les allergies avec les éléments épinglés en premier
      const sortedAllergies = medicalRecord.allergies.sort((a, b) => {
        // Les éléments épinglés vont en premier
        if (a.pinned && !b.pinned) {
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        }
        // Ensuite, triez par ordre alphabétique ou selon un autre critère si nécessaire
        return a.substance.localeCompare(b.substance, 'en', { sensitivity: 'base' });
      });
  
      res.status(200).json(sortedAllergies);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      console.error(error);
    }
  }
  