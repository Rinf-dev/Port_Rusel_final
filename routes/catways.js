const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');
const { getCatwayById } = require("../services/catways");

router.post('/add', private.checkJWT,service.add);
router.post('/update',private.checkJWT,service.update);
router.post('/:id',private.checkJWT,service.delete);

router.post("/details/:id", private.checkJWT, async (req, res) => {
  try {
  const catway = await service.getCatwayById(req.params.id);
    res.render("catwaysdetails", { catway });
  } catch (error) {
    res.status(404).render("catwaysdetails", { catway: null, error: error.message });
  }
});





module.exports = router;
