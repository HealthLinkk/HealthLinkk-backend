import  express  from 'express'; // Importer express
import mongoose from 'mongoose'; // Importer Mongoose
import morgan from 'morgan';
import commentRoutes from './routes/comment.js';
import LikeDislikeRoutes from './routes/LikeDislike.js';
import postRoutes from './routes/post.js';
import connectToDatabase from './database.js';
import path from 'path'
import rdvroutes from './routes/rdvroutes.js'
import userRoutes from './routes/user.js';
import cookieParser from 'cookie-parser';
import pharmacistRoutes from './routes/pharmacist.js';
import prescriptionRoutes from './routes/prescription.js';
import pharmacyConfirmationRoutes from './routes/pharmacyConfirmation.js';
import videoroutes from'./routes/videoroutes.js';
import paymentroutes from './routes/paymentroutes.js'
import { sendSMS } from './utils/smsSender.js';
import cors from 'cors'
import medicalRecordRoutes from './routes/medicalRecord.js';
import allergyRoutes from './routes/allergyRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = '0.0.0.0';
const app =express();
const port = process.env.port || 9090
const databaseName = 'HealthLink';

// Cela afichera les requêtes MongoDB dans le terminal
mongoose.set('debug', true);
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
mongoose.Promise = global.Promise;

// Se connecter à MongoDB
// mongoose
//   .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
//   .then(() => {
//     // Une fois connecté, afficher un message de réussite sur la console
//     console.log(`Connected to ${databaseName}`);
//   })
//   .catch(err => {
//     // Si quelque chose ne va pas, afficher l'erreur sur la console
//     console.log(err);
//   });

  connectToDatabase()
  app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


app.use('/users',userRoutes);
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" })
  res.status(201).json({ message: 'successfully logged out ' })
})

app.get('/uploads/profile-pictures/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'uploads', 'profile-pictures', filename);

  // Send the image file
  res.sendFile(imagePath);
});
app.use('/rdv',rdvroutes);
app.use('/prescription',prescriptionRoutes);
app.use('/pharmacyConfirmation',pharmacyConfirmationRoutes);
app.use('/pharmacist',pharmacistRoutes);
app.use('/api/video',videoroutes);
app.use('/api/payment', paymentroutes);
app.use('/post',postRoutes);
app.use('/comment',commentRoutes);
app.use('/LikeDislike',LikeDislikeRoutes);


app.use('/medicalRecord',medicalRecordRoutes);
app.use('/allergies', allergyRoutes);
app.use('/medication', medicationRoutes);


/**
 * Démarrer le serveur à l'écoute des connexions
 */
// app.listen(port, hostname,() => {
//   console.log(`Server running at http://${hostname}:${port}/`);

// })

// app.listen(port, () => {
//   console.log(`Serveur démarré sur le port ${port}`);
// });


const server = app.listen(0,hostname,() => {
  console.log('Server listening on port:', server.address().port);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down gracefully.');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
