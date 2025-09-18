const express = require('express');
const router = express.Router();

const service = require('../services/users');

const private = require('../middlewares/private');

/* GET users listing. */
router.get('/:id', private.checkJWT,service.getById);
router.post('/add',private.checkJWT,service.add);
router.post('/update', private.checkJWT,service.update);
router.post('/delete', private.checkJWT,service.delete);
router.post('/authenticate', service.authenticate);


module.exports = router;
