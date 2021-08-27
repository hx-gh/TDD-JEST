const authMiddleware = require('../Middlewares/auth');
const router = require('express').Router();

router.use(authMiddleware);
router.get('/main', (req,res) => {
    return res.status(200).send();
})

module.exports = router;