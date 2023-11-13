import Prescription from '../models/prescription.js';

//create prescription

export async function createPrescription (req, res) {
    try {
        const newPrescription = await Prescription.create(req.body);
        return res.status(201).json(newPrescription)
    }
    catch(error) { 
        console.error(error);
        res.status(500).json({ error })};

};

//extraire les medicaments d'une prescription

export async function getPrescriptionDrugs(req, res) {
        try {
           const prescription = await Prescription.findById(req.params.id)
                .populate('prescribedDrugs.drug').exec();

            if (!Prescription) {
                return res.status(404).json({ error: 'Prescription not found' });
            }

            if (!prescription.prescribedDrugs || prescription.prescribedDrugs.length === 0) {
                return res.status(404).json({ error: 'Prescription has no prescribed drugs' });
            }
            const medications = prescription.prescribedDrugs.map(item => ({
                drug: item.drug,
                dosage: item.dosage
            }));

            res.status(201).json( { Drugs : medications }
                );
        } catch (error) {
            console.log("id=" , req.params.id )
            res.status(500).json({ error: error.message });
        }
    };

// extraire les prescriptions d'un patient

export async function getPatientPrescriptions (req, res) {
    try {
        const prescriptions = await Prescription.find({ patient: req.params.patientId }).populate('prescribedDrugs.drug');
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// extraire les prescriptions d'un patient pour le pharmacien

export async function getPatientPrescriptionsByID (req,res){
    try {
        const prescriptions = await Prescription.find({patient:req.params.patientId}).populate('prescribedDrugs.drug');
        res.json(prescriptions);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

