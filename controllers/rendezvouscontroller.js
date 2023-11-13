import RendezVous from "../models/rendezvousmodel.js";
import user from "../models/user.js";




// Get All rendezVous
export async function getAllRendezVous(req, res, next) {
    try {
        const rendezvous = await RendezVous.find({archived: false}).exec();
        res.status(200).json(rendezvous);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(error);
    }
};

// Get RendezVous by ID
export async function getRendezVousById(req, res, next) {
    try {
        const rendezVous = await RendezVous.findById(req.params.id).exec();
        if (!rendezVous) {
            return res.status(404).json({ error: 'RendezVous not found' });
        }
        res.status(200).json(rendezVous);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(error);
    }
}


// Create a new RendezVous
export async function createRendezVous(req, res, next) {
    try {
        const rendezVous = await RendezVous.create(req.body);
        res.status(201).json(rendezVous);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
        console.error(error);
    }
}



// Update RendezVous by ID
export async function updateRendezVous(req, res, next) {
    try {
        const rendezVous = await RendezVous.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).exec();
        if (!rendezVous) {
            return res.status(404).json({ error: 'RendezVous not found' });
        }
        res.status(200).json(rendezVous);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
        console.error(error);
    }
}

// Delete RendezVous by ID
export async function deleteRendezVous(req, res, next) {
    try {
        const rendezVous = await RendezVous.findByIdAndUpdate(req.params.id,
            { archived: true }).exec();
        if (!rendezVous) {
            return res.status(404).json({ error: 'RendezVous not found' });
        }
        res.status(200).json("deleted succesfully");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(error);
    }
}




// import schedule from "node-schedule";
// import RendezVous from "../models/rendezvousmodel.js";
// import auth from "../middlewares/auth.js";
// import moment from "moment-timezone";
// import mongoose from "mongoose";
// import user from "../models/user.js";

// async function addRendezVous(rendezVousDetails, userId, patient) {
//     console.log(`Rendezvous:  ${rendezVousDetails.title}`);

//     const startDateTime = new Date(rendezVousDetails.startDateTime);
//     const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes later

//     const rendezVous = await RendezVous.create({
//         location: rendezVousDetails.location,
//         startDateTime: startDateTime,
//         endDateTime: endDateTime,
//         timeZone: "Africa/Tunis",
//         patient: userId,
//         title: rendezVousDetails.title,
//         paiement: rendezVousDetails.paiement,
//         doctorr: patient.doctor.toString(),
//     });

//     console.log(`Rendezvous added to database: ${rendezVous.location}`);

//     return rendezVous;
// }

// // /////////////////////////////////
export async function addRendezVousToCalendar(req, res) {
    try {
        const userId = req.auth.userId;

        const patient = await patient.findOne({ _id: userId });

        if (!patient) {
            return res.status(404).json({
                message: "No patient found for this user.",
            });
        }

        const doctorId = String(patient.doctor);
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(500).json({
                message: "Invalid doctor ID.",
            });
        }

        const doctorid = patient.doctor;

        const doctor = await doctor.findById(doctorid);
        if (!doctor) {
            console.log("No doctor found for this rendezvous.");
            return res.status(404).json({
                message: "No doctor found for this rendezvous.",
            });
        }

        const rendezVousDetails = {
            location: doctor.adresse,
            doctor: doctorId,
            title: req.body.title,
            paiement: req.body.paiement,
            startDateTime: new Date(req.body.startDateTime),
        };

        const now = new Date();

        if (rendezVousDetails.startDateTime <= now) {
            return res.status(500).json({
                message: "Cannot schedule rendezvous in the past.",
            });
        }

        const existingRendezVous = await RendezVous.findOne({
            doctor: doctor._id,
            startDateTime: rendezVousDetails.startDateTime,
        });

        if (existingRendezVous) {
            return res.status(500).json({
                message: "Doctor already has a rendezvous scheduled at this time.",
            });
        }

        const rendezVous = await addRendezVous(
            req,
            rendezVousDetails,
            userId,
            patient
        );

        const job = schedule.scheduleJob(
            rendezVousDetails.startDateTime,
            async () => {
                console.log(`Rendezvous scheduled at : ${rendezVousDetails.startDateTime}`);
            }
        );

        console.log(`Rendezvous scheduled at : ${rendezVousDetails.startDateTime}`);

        res.status(201).json({
            message: `Rendezvous scheduled at: ${rendezVousDetails.startDateTime}`,
        });
    } catch (error) {
        console.error("Error adding rendezvous:", error);

        res.status(500).json({
            message: "An error occurred while adding the rendezvous.",
        });
    }
}

// /////////////afficher  tout les rdv pour doctor///////////////////
export async function getDoctorRendezVous(req, res) {
    const connectUser = req.params._id;

    try {
        const user = await user.findById(connectUser);

        if (!user || user.role !== "doctor") {
            return res.status(401).json({ message: "Not authorized" });
        }

        const doctor = await doctor.findOne({ _id: connectUser });

        const rendezVousList = await RendezVous.find({ doctor: doctor }).populate(
            "patient",
            "firstname lastname"
        );

        res.status(200).json({
            message: `Found ${rendezVousList.length} rendezvous for Doctor ${doctor.lastname}.`,
            rendezVousList,
        });
    } catch (error) {
        console.error("Error getting doctor's rendezvous:", error);

        res.status(500).json({
            message: "An error occurred while getting the doctor's rendezvous.",
        });
    }
}
// /////////////////////////////////////
// export async function getodayRendezVous(req, res) {
//     const connectUser = req.auth.userId;
//     const timezone = "UTC +1";
//     const now = moment.tz(timezone);
//     const startOfDay = now.startOf("day").toDate();
//     const endOfDay = now.endOf("day").toDate();
//     console.log(startOfDay, endOfDay);
//     try {
//         const user = await Doctor.findById(connectUser);

//         if (!user || user.role !== "doctor") {
//             return res.status(401).json({ message: "Not authorized" });
//         }

//         const doctor = await Doctor.findById({ _id: connectUser });

//         console.log(doctor.lastname);
//         const rendezVousList = await RendezVous.find({
//             doctor: doctor,
//             startDateTime: { $gte: startOfDay, $lte: endOfDay },
//         }).populate("patient", "firstname lastname");

//         res.status(200).json({
//             message: `Found ${rendezVousList.length} rendezvous today for Doctor ${doctor.lastname}.`,
//             rendezVousList,
//         });
//     } catch (error) {
//         console.error("Error getting doctor's rendezvous:", error);

//         res.status(500).json({
//             message: "An error occurred while getting the doctor's rendezvous.",
//         });
//     }
// }

// //////////////////////////redez vous pour patient////////
// export async function getUpcomingRendezVous(req, res) {
//     const connectUser = req.auth.userId;
//     const timezone = "UTC +1";
//     const now = moment.tz(timezone);
//     const startOfDay = now.startOf("day").toDate();
//     const endOfDay = now.endOf("day").toDate();
//     console.log(startOfDay, endOfDay);
//     try {
//         const user = await User.findById(connectUser);

//         if (!user || user.role !== "patient") {
//             return res.status(401).json({ message: "Not authorized" });
//         }

//         const patient = await Patient.findOne({ _id: connectUser });

//         console.log(patient.lastname);
//         const rendezVousList = await RendezVous.find({
//             patient: patient,
//             startDateTime: { $gte: startOfDay },
//             status: "scheduled",
//         });

//         res.status(200).json({
//             message: `Found ${rendezVousList.length} upcoming rendezvous for patient ${patient.lastname}.`,
//             rendezVousList,
//         });
//     } catch (error) {
//         console.error("Error getting patient's upcoming rendezvous:", error);

//         res.status(500).json({
//             message:
//                 "An error occurred while getting the patient's upcoming rendezvous.",
//         });
//     }
// }
// //////////////allrdv pour patient//////////

// export async function getAllRendezVousPatient(req, res) {
//     const connectUser = req.auth.userId;
//     try {
//         const user = await User.findById(connectUser);

//         if (!user || user.role !== "patient") {
//             return res.status(401).json({ message: "Not authorized" });
//         }

//         const patient = await Patient.findOne({ _id: connectUser });

//         console.log(patient.lastname);
//         const rendezVousList = await RendezVous.find({
//             patient: patient,
//         }).populate("doctor");

//         res.status(200).json({
//             message: `Found ${rendezVousList.length} rendezvous for patient ${patient.lastname}.`,
//             rendezVousList,
//         });
//     } catch (error) {
//         console.error("Error getting patient's rendezvous:", error);

//         res.status(500).json({
//             message: "An error occurred while getting the patient's rendezvous.",
//         });
//     }
// }

// ///////////////// add doc rdv ////////////////
// export async function add(req, rendezVousDetail, doctorId) {
//     try {
//         const newRendezVous = new RendezVous(rendezVousDetail);
//         newRendezVous.doctor = doctorId;
//         await newRendezVous.save();
//         console.log("Rendezvous added:", newRendezVous);
//         return newRendezVous;
//     } catch (error) {
//         res.status(500).json({
//             message: "An error occurred while adding the rendezvous.",
//         });
//     }
// }
// export async function addRendezVousToDoctorCalendar(req, res) {
//     try {
//         const doctorId = req.auth.userId;

//         const doctor = await Doctor.findById(doctorId);
//         if (!doctor) {
//             console.log("No doctor found.");
//             return res.status(404).json({
//                 message: "No doctor found.",
//             });
//         }

//         const startDateTime = new Date(req.body.startDateTime);
//         const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes later

//         const rendezVousDetail = {
//             location: doctor.adresse,
//             doctor: doctorId,
//             title: req.body.title,
//             startDateTime,
//             endDateTime,
//             timeZone: "Africa/Tunis",
//         };

//         const now = new Date();

//         if (rendezVousDetail.startDateTime <= now) {
//             return res.status(500).json({
//                 message: "Cannot schedule rendezvous in the past.",
//             });
//         }

//         const existingRendezVous = await RendezVous.findOne({
//             doctor: doctorId,
//             startDateTime: rendezVousDetail.startDateTime,
//         });

//         if (existingRendezVous) {
//             return res.status(500).json({
//                 message: "Doctor already has a rendezvous scheduled at this time.",
//             });
//         }

//         const rendezVous = await add(req, rendezVousDetail, doctorId);

//         const job = schedule.scheduleJob(
//             rendezVousDetail.startDateTime,
//             async () => {
//                 console.log(`Rendezvous scheduled at : ${rendezVousDetail.location}`);
//             }
//         );

//         console.log(`Rendezvous scheduled at : ${rendezVousDetail.location}`);

//         res.status(201).json({
//             message: `Rendezvous scheduled at: ${rendezVousDetail.location}`,
//         });
//     } catch (error) {
//         console.error("Error adding rendezvous:", error);

//         res.status(500).json({
//             message: "An error occurred while adding the rendezvous.",
//         });
//     }
// }