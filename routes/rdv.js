import express from "express";
import auth from "../middlewares/auth.js";
import { getAllRendezVous, createRendezVous, getRendezVousById, updateRendezVous, deleteRendezVous, getDoctorRendezVous, getodayRendezVous } from '../controllers/rdv.js';



const router = express.Router();



router.route('/rdvgetAll')
    .get(getAllRendezVous);
// Create a new RendezVous
router.post('/', createRendezVous);

// Get RendezVous by ID
router.get('/:id', getRendezVousById);

// Update RendezVous by ID
router.put('/:id', updateRendezVous);

// Delete RendezVous by ID
router.delete('/:id', deleteRendezVous);

//get all doctors rdvs
router.route("/:_id").get(getDoctorRendezVous);

// get todays doctors rdvs
router.route("/today").get(auth, getodayRendezVous);


export default router;