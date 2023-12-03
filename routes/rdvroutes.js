import express from 'express';
import {
  createRendezVous,
  getAllRendezVous,
  getRendezVousById,
  updateRendezVousById,
  archiveRendezVousById,
  getScheduledRendezVous,
  getCompletedRendezVous,
  getCanceledRendezVous,
  getDoctorById,
  getAllDoctors
} from '../controllers/rendezvouscontroller.js'; // Adjust the path based on your project structure
import auth from '../middlewares/auth.js'; // Adjust the path based on your project structure

const router = express.Router();

// Create a new rendezvous
router.post('/', auth, createRendezVous);

// Get all rendezvous (accessible by both Patient and Doctor)
router.get('/rendezvous', auth, getAllRendezVous);

// Get a specific rendezvous by ID (accessible by both Patient and Doctor)
router.get('/rendezvous/:id', auth, getRendezVousById);

// Update a rendezvous by ID (accessible by both Patient and Doctor)
router.put('/rendezvous/:id', auth, updateRendezVousById);

// Delete a rendezvous by ID (accessible by both Patient and Doctor)
router.put('/rendezvous/archive/:id', auth, archiveRendezVousById);

// Get all Scheduled rendezvous
router.get('/rendezvous/scheduled', auth, getScheduledRendezVous);

// Get all completed rendezvous
router.get('/rendezvous/completed', auth, getCompletedRendezVous);

// Get all canceled rendezvous
router.get('/rendezvous/canceled', auth, getCanceledRendezVous);

// Get Doctor By Id
router.get('/GetDoctorById/:id', auth, getDoctorById);

router.get('/Doctors',getAllDoctors);
router.get('/Doctor/:id',getDoctorById)


export default router;
