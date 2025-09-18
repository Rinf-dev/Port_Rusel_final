const express = require('express');
const router = express.Router();

const service = require('../services/reservation');



router.post('/add', service.add);
router.post('/:id',service.update);
router.post('/:id',service.delete);


module.exports = router;
