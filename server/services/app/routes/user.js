const express= require('express');
const UserController = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');
const pubRouter=express.Router();

pubRouter.get('/item',UserController.getItem);
pubRouter.get('/item/:id',UserController.detailItem);


module.exports=pubRouter;