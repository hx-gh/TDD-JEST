const Dashboard_Routes = require('./routes/dashboard_routes');
const Main_Routes = require('./routes/main_routes');
const User_Routes = require('./routes/user_routes');

const router = require('express').Router();
//Definição de Rotas
router.use('/main', Main_Routes);
router.use('/user_api', User_Routes);
router.use('/dashboard', Dashboard_Routes);


module.exports = router;