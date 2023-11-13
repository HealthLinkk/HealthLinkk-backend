import PharmacyConfirmation from '../models/pharmacyconfirmation.js';
import '../routes/pharmacist.js'
import '../routes/user.js'
import '../routes/pharmacyConfirmation.js'

//afficher toutes les confirmations d'une pharmacie

export async function getAllPharmacyConfirmations (req, res) {
    try {
        const confirmations = await PharmacyConfirmation.find({ pharmacist: req.params.pharmacyId }).populate('prescription');
        res.json(confirmations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//confirmer une prescription

export async function confirmPrescription (req, res) {
    try {
        const newConfirmation = await PharmacyConfirmation.create({
            pharmacy: req.params.pharmacyId,
            prescription: req.params.prescriptionId,
            isConfirmed: true 
        });

        res.json(newConfirmation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

