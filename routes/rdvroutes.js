import express from 'express';
import auth from "../middlewares/auth.js";

const router = express.Router();



import { getAllRendezVous,createRendezVous, getRendezVousById, updateRendezVous, deleteRendezVous, addRendezVousToCalendar } from '../controllers/rendezvouscontroller.js';




router
    .route('/rdvgetAll')
    .get(getAllRendezVous);
// Create a new RendezVous
router
    .post('/', createRendezVous);

// Get RendezVous by ID
router.get('/:id', getRendezVousById);

// Update RendezVous by ID
router.put('/:id', updateRendezVous);

// Delete RendezVous by ID
router.delete('/:id', deleteRendezVous);

// add to calendar
router.route("/calendarAdd").post(auth, addRendezVousToCalendar);




export default router;


// import express from "express";
// import {
//   addRendezVousToCalendar,
//   getDoctorRendezVous,
//   getodayRendezVous,
//   getUpcomingRendezVous,
//   getAllRendezVousPatient,
//   addRendezVousToDoctorCalendar,
// } from "../controllers/rendezvouscontroller.js";
// const router = express.Router();

// router.route("/doctor").post(auth, addRendezVousToDoctorCalendar);
// router.route("/allrdv").get(auth, getAllRendezVousPatient);
// router.route("/today").get(auth, getodayRendezVous);
// router.route("/").post(auth, addRendezVousToCalendar);
// router.route("/:_id").get(getDoctorRendezVous);
// router.route("/ProchRdv").get(auth, getUpcomingRendezVous);

// export default router;