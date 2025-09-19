const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { initClientConnection } = require('./db/mongo'); // Importer la fonction de connexion
const usersRouters = require('./routes/users');
const indexRouter = require('./routes/index');
const catwaysRouters = require('./routes/catways');
const reservationsRouters = require('./routes/reservations');
const app = express();
// ajouter pour le  afficher les catways
const Catways = require('./models/catway');
const Reservation = require('./models/reservations'); // importer le modèle

//Afficher la liste des Résa
app.get('/reservationslist', async (req, res) => {
  console.log("reservations");
    try {
    const reservations = await Reservation.find();
    res.render('reservationslist', { reservations }); // Chemin correct vers le fichier EJS
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

//Afficher la liste des catways
app.get("/catwayslist",  async (req, res) => {
    console.log("cathwayslist");
  try {
    const [catways, users] = await Promise.all([
      Catways.find({}),

    ]);

    res.locals.catways = catways;
    res.locals.users = users;
    res.render("catwayslist");
  } catch (error) {
    res.status(500).send(error.message);
  }
});





//module.exports = router;





// Connexion à la base de données MongoDB
initClientConnection()
    .then(() => {
        console.log('Connexion MongoDB effectuée avec succès');
    })
    .catch((err) => {
        console.error('Erreur de connexion MongoDB :', err);
        process.exit(1); // Arrêter l'application en cas d'erreur de connexion
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// router
app.use('/users', require('./routes/users'));
app.use('/', indexRouter);


app.use((req, res, next) => {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'introuvable' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur serveur !');
});
app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

module.exports = app;
