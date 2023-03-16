const express= require('express');
const AdminController = require('../controllers/adminController');
const { authentication } = require('../middlewares/auth');
const adminRouter=express.Router();

adminRouter.post('/login',AdminController.login)
// adminRouter.use(authentication);
adminRouter.post('/register',AdminController.register)
adminRouter.get('/item',AdminController.getItem)
adminRouter.get('/category',AdminController.getCategory)
adminRouter.post('/category',AdminController.addCategory)
adminRouter.post('/item',AdminController.createItem)
adminRouter.get('/item/add',AdminController.addForm)
adminRouter.get('/item/:id',AdminController.editForm)
adminRouter.put('/item/:id',AdminController.updateItem)
adminRouter.delete('/item/:id',AdminController.deleteItem)
adminRouter.delete('/category/:id',AdminController.deleteCategory)


module.exports=adminRouter;