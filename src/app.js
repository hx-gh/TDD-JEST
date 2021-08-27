require('dotenv').config({
    path: process.env.NODE_ENV = 'test' ? '.env.test' : '.env'
})
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
class AppController{
    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.express.use(express.json());
        this.express.use(helmet());
            console.log('[SERVER] Helmet dressed on');
        this.express.use(cors());
            console.log('[SERVER] Cors enabled')
    }
    routes(){
        this.express.use(require('./routes'))
    }
}
module.exports = new AppController().express;