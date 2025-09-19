const Catway = require('./models/catways'); // adapte le chemin si besoin

app.get('/catwayslist', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render('catwayslist', { catways });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});