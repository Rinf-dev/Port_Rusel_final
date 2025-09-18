
//
const express = require('express');
const router = express.Router();

const service = require('../services/reservation');
const private = require('../middlewares/private');
const { getReservationById } = require("../services/reservation");

router.post('/add', private.checkJWT,service.add);
router.post('/update',private.checkJWT,service.update);
router.post('/:id',private.checkJWT,service.delete);

router.post("/details/:id", private.checkJWT, async (req, res) => {
  try {
  const catway = await service.getReservationById(req.params.id);
    res.render("reservationdetails", { reservation });
  } catch (error) {
    res.status(404).render("reservationdetails", { reservation: null, error: error.message });
  }
});





module.exports = router;

