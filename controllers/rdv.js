import RendezVous from "../models/rendezvousmodel.js";
import user from "../models/user.js";
import user from "../models/user.js";
import user from "../models/user.js";


async function addRendezVous(rendezVousDetails, userId, patient) {
    console.log(`Rendezvous: ${rendezVousDetails.title}`);
  
    const startDateTime = new Date(rendezVousDetails.startDateTime);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60000); // 60 minutes later
  
    const rendezVous = await RendezVous.create({
      location: rendezVousDetails.location,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      timeZone: "Africa/Tunis",
      patient: userId,
      title: rendezVousDetails.title,
      paiement: rendezVousDetails.payer,
      doctor: patient.doctor.toString(),
    });
  
    console.log(`Rendezvous added to database: ${rendezVous.location}`);
  
    return rendezVous;
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

//Show all doctors rdvs
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
        "name lastName",
        "startDateTime"
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
  //Show todays rdv for a doctor
  export async function getodayRendezVous(req, res) {
    const connectUser = req.auth.userId;
    const timezone = "UTC +1";
    const now = moment.tz(timezone);
    const startOfDay = now.startOf("day").toDate();
    const endOfDay = now.endOf("day").toDate();
    console.log(startOfDay, endOfDay);
    try {
      const user = await doctor.findById(connectUser);
  
      if (!user || user.role !== "doctor") {
        return res.status(401).json({ message: "Not authorized" });
      }
  
      const doctor = await doctor.findById({ _id: connectUser });
  
      console.log(doctor.lastname);
      const rendezVousList = await RendezVous.find({
        doctor: doctor,
        startDateTime: { $gte: startOfDay, $lte: endOfDay },
      }).populate("patient", "name lastName","startDateTime" );
  
      res.status(200).json({
        message: `Found ${rendezVousList.length} rendezvous today for Doctor ${doctor.lastname}.`,
        rendezVousList,
      });
    } catch (error) {
      console.error("Error getting doctor's rendezvous:", error);
  
      res.status(500).json({
        message: "An error occurred while getting the doctor's rendezvous.",
      });
    }
  }