import user from '../models/user.js';

export async function findByRole(role) {
  try {
      const users = await user.find({ role: role }).exec();
      return users;
  } catch (error) {
      throw new Error(`Error finding users with role ${role}: ${error.message}`);
  }
}
export async function findByRoleAndId(role, userId) {
  try {
    const user = await user.findOne({ _id: userId, role: role }).exec();
    return user;
  } catch (error) {
    throw new Error(`Error finding user with ID ${userId} and role ${role}: ${error.message}`);
  }
}

export async function getAllPharmacies (req, res) {
    try {
        const pharmacies = await findByRole("Pharmacist",);
        res.status(200).json(pharmacies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//afficher une pharmacie par location

export async function findPharmacyByLocation (req, res) {
    try {
        const { location } = req.query;

        if (!location) {
            return res.status(400).json({ error: 'Location parameter is missing' });
        }

        // Utilisez une expression régulière pour effectuer une recherche insensible à la casse
        const regex = new RegExp(location, 'i');

        const pharmacies = await findBy(user,"Pharmacist", regex );

        res.json(pharmacies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// mettre à jour une pharmacie

export async function updatePharmacy (req, res) {
        try {
            const { name, location } = req.body;
            const updatedPharmacy = await user.findByIdAndUpdate(req.params.pharmacyId, { name, location }, { new: true });
            if (!updatedPharmacy) {
                return res.status(404).json({ error: 'Pharmacy not found' });
            }
            res.json(updatedPharmacy);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};

// afficher la pharmacie la plus proche

export async function getNearestPharmacy (req, res) {
    const { latitude, longitude } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }
  
    try {
      const userLocation = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      };
  
      const pharmacies = await Pharmacy.find({
        location: {
          $near: {
            $geometry: userLocation,
            $maxDistance: 5000, // Distance maximale en mètres (ajustez selon vos besoins)
          },
        },
      });
  
      res.json(pharmacies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  