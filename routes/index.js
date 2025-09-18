const express = require('express');
const router = express.Router();

const userRoute = require('../routes/users');
const catwayRoute = require ('../routes/catways')
const reservationsRoute = require ('../routes/reservations')
/* GET home page. */
router.get('/', async (req, res) =>{
  res.render('index', {
    title: 'Accueil'
  })
});
// 
router.use('/users', userRoute);
router.use('/catways', catwayRoute)
router.use('/reservations', reservationsRoute)
module.exports = router;
