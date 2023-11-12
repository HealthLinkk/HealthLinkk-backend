import RendezVous from '../models/rendezvousmodel.js';

// Controller method to create a new rendezvous (accessible by both Patient and Doctor)
export async function createRendezVous(req, res) {
  try {
    const { title, doctor, patient, type, startDateTime, endDateTime, location, paiement, archived } = req.body;

    // Ensure the logged-in user is either a Patient or a Doctor
    if (req.auth.role !== 'Patient' && req.auth.role !== 'Doctor') {
      return res.status(403).json({ message: 'Access denied. You do not have permission to create a rendezvous.' });
    }

    // If the user is a Doctor, ensure the specified doctor matches the logged-in doctor
    if (req.auth.role === 'Doctor' && doctor.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Access denied. You can only create rendezvous for yourself.' });
    }

    // If the user is a Patient, ensure the specified patient matches the logged-in patient
    if (req.auth.role === 'Patient' && patient.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Access denied. You can only create rendezvous for yourself.' });
    }

    // Check for conflicts with existing rendezvous for the same doctor and time range
    const existingRendezvous = await RendezVous.findOne({
        doctor,
        startDateTime: { $lt: endDateTime },
        endDateTime: { $gt: startDateTime },
        archived: false,
      });
  
      if (existingRendezvous) {
        return res.status(409).json({ message: 'Time slot is already booked. Choose another time.' });
      }

    const newRendezVous = new RendezVous({
      title,
      doctor,
      patient,
      type,
      startDateTime,
      endDateTime,
      location,
      paiement,
      archived,
    });

    const savedRendezVous = await newRendezVous.save();
    res.status(201).json(savedRendezVous);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rendezvous', error: error.message });
  }
}

// Controller method to get all non-archived rendezvous sorted by time (accessible by both Patient and Doctor)
export async function getAllRendezVous(req, res) {
    try {
      // Ensure the logged-in user is either a Patient or a Doctor
      if (req.auth.role !== 'Patient' && req.auth.role !== 'Doctor') {
        return res.status(403).json({ message: 'Access denied. You do not have permission to view rendezvous.' });
      }
  
      let query;
  
      // If the user is a Doctor, only return non-archived rendezvous where the doctor ID matches the logged-in doctor
      if (req.auth.role === 'Doctor') {
        query = { doctor: req.auth.userId, archived: false };
      } else {
        // If the user is a Patient, only return non-archived rendezvous where the patient ID matches the logged-in patient
        query = { patient: req.auth.userId, archived: false };
      }
  
      const rendezvousList = await RendezVous.find(query).sort({ startDateTime: 'asc' });
      res.status(200).json(rendezvousList);
    } catch (error) {
      res.status(500).json({ message: 'Error getting non-archived rendezvous list', error: error.message });
    }
  }
  
  // Controller method to get a specific non-archived rendezvous by ID (accessible by both Patient and Doctor)
  export async function getRendezVousById(req, res) {
    const { id } = req.params;
    try {
      const rendezvous = await RendezVous.findById(id);
      if (!rendezvous || rendezvous.archived) {
        return res.status(404).json({ message: 'Rendezvous not found' });
      }
  
      // Ensure the logged-in user is either a Patient or a Doctor
      if (req.auth.role !== 'Patient' && req.auth.role !== 'Doctor') {
        return res.status(403).json({ message: 'Access denied. You do not have permission to view this rendezvous.' });
      }
  
      // If the user is a Doctor, ensure the rendezvous belongs to the logged-in doctor
      if (req.auth.role === 'Doctor' && rendezvous.doctor.toString() !== req.auth.userId) {
        return res.status(403).json({ message: 'Access denied. You can only view your own non-archived rendezvous.' });
      }
  
      // If the user is a Patient, ensure the rendezvous belongs to the logged-in patient
      if (req.auth.role === 'Patient' && rendezvous.patient.toString() !== req.auth.userId) {
        return res.status(403).json({ message: 'Access denied. You can only view your own non-archived rendezvous.' });
      }
  
      res.status(200).json(rendezvous);
    } catch (error) {
      res.status(500).json({ message: 'Error getting non-archived rendezvous', error: error.message });
    }
  }
  

// Controller method to update a non-archived rendezvous by ID (accessible by both Patient and Doctor)
export async function updateRendezVousById(req, res) {
    const { id } = req.params;
    try {
      const rendezvous = await RendezVous.findById(id);
      if (!rendezvous || rendezvous.archived) {
        return res.status(404).json({ message: 'Rendezvous not found' });
      }
  
      // Ensure the logged-in user is either a Patient or a Doctor
      if (req.auth.role !== 'Patient' && req.auth.role !== 'Doctor') {
        return res.status(403).json({ message: 'Access denied. You do not have permission to update this rendezvous.' });
      }
  
      // If the user is a Doctor, ensure the rendezvous belongs to the logged-in doctor
      if (req.auth.role === 'Doctor' && rendezvous.doctor.toString() !== req.auth.userId) {
        return res.status(403).json({ message: 'Access denied. You can only update your own non-archived rendezvous.' });
      }
  
      // If the user is a Patient, ensure the rendezvous belongs to the logged-in patient
      if (req.auth.role === 'Patient' && rendezvous.patient.toString() !== req.auth.userId) {
        return res.status(403).json({ message: 'Access denied. You can only update your own non-archived rendezvous.' });
      }
  
      // Update the non-archived rendezvous
      const updatedRendezVous = await RendezVous.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedRendezVous);
    } catch (error) {
      res.status(500).json({ message: 'Error updating non-archived rendezvous', error: error.message });
    }
  }
  

// Controller method to archive a rendezvous by ID (accessible by both Patient and Doctor)
export async function archiveRendezVousById(req, res) {
    const { id } = req.params;
    try {
      const rendezvous = await RendezVous.findById(id);
      if (!rendezvous) {
        return res.status(404).json({ message: 'Rendezvous not found' });
      }
  
      // Ensure the logged-in user is either a Patient or a Doctor
      if (req.auth.role !== 'Patient' && req.auth.role !== 'Doctor') {
        return res.status(403).json({ message: 'Access denied. You do not have permission to archive this rendezvous.' });
      }
  
      // If the user is a Doctor, ensure the rendezvous belongs to the logged-in doctor
      if (req.auth.role === 'Doctor' && rendezvous.doctor.toString() !== req.auth.userId) {
        return res.status(403).json({ message: 'Access denied. You can only archive your own rendezvous.' });
      }
  
      // If the user is a Patient, ensure the rendezvous belongs to the logged-in patient
      if (req.auth.role === 'Patient' && rendezvous.patient.toString() !== req.auth.userId) {
        return res.status(403).json({ message: 'Access denied. You can only archive your own rendezvous.' });
      }
  
      // Update the 'archived' field instead of deleting
      await RendezVous.findByIdAndUpdate(id, { archived: true });
      res.status(200).json({ message: 'Rendezvous archived successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error archiving rendezvous', error: error.message });
    }
  }


  // Helper function to get rendezvous by state
async function getRendezVousByState(req, res, state) {
    try {
      // Ensure the logged-in user is either a Patient or a Doctor
      if (req.auth.role !== 'Patient' && req.auth.role !== 'Doctor') {
        return res.status(403).json({ message: 'Access denied. You do not have permission to view rendezvous.' });
      }
  
      // If the user is a Doctor, only return rendezvous where the doctor ID matches the logged-in doctor
      const rendezvousList = await RendezVous.find({
        doctor: req.auth.userId,
        state,
        archived: false,
      });
  
      res.status(200).json(rendezvousList);
    } catch (error) {
      res.status(500).json({ message: `Error getting ${state.toLowerCase()} rendezvous`, error: error.message });
    }
  }
  

  // Controller method to get scheduled rendezvous (accessible by both Patient and Doctor)
export async function getScheduledRendezVous(req, res) {
    await getRendezVousByState(req, res, 'Scheduled');
  }
  
  // Controller method to get completed rendezvous (accessible by both Patient and Doctor)
  export async function getCompletedRendezVous(req, res) {
    await getRendezVousByState(req, res, 'Completed');
  }
  
  // Controller method to get canceled rendezvous (accessible by both Patient and Doctor)
  export async function getCanceledRendezVous(req, res) {
    await getRendezVousByState(req, res, 'Canceled');
  }




  