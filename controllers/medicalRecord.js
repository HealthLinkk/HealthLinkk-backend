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
