const SessionController = require('../Controllers/SessionController');

const router = require('express').Router();

router.post('/create', SessionController.store);
router.post('/authenticate', SessionController.authentication);


module.exports = router;