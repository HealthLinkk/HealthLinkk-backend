import  express  from 'express'; // Importer express
import mongoose from 'mongoose'; // Importer Mongoose
import morgan from 'morgan';
import commentRoutes from './routes/comment.js';
import LikeDislikeRoutes from './routes/LikeDislike.js';
import postRoutes from './routes/post.js';

import userRoutes from './routes/user.js';

const hostname = '127.0.0.1';
const app =express();
const port = process.env.port || 9090;
const databaseName = 'HealthLink';

// Cela afichera les requêtes MongoDB dans le terminal
mongoose.set('debug', true);
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
mongoose.Promise = global.Promise;

// Se connecter à MongoDB
mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    // Une fois connecté, afficher un message de réussite sur la console
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    // Si quelque chose ne va pas, afficher l'erreur sur la console
    console.log(err);
  });


app.use(express.json());
app.use(morgan("dev"));


app.use('/users',userRoutes);

app.use('/post',postRoutes);
app.use('/comment',commentRoutes);
app.use('/LikeDislike',LikeDislikeRoutes);


/**
 * Démarrer le serveur à l'écoute des connexions
 */
app.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);

})

  app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
  });
