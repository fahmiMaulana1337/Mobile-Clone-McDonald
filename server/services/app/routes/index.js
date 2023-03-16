const express = require('express')
const router = express.Router()
const Controller = require('../controllers/adminController');
const adminRouter = require('./admin');
const pubRouter = require('./user');

router.use('/pub',pubRouter)
router.use('/',adminRouter)




module.exports=router;
