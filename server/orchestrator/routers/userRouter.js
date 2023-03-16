const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/', UserController.showUser);
router.post('/', UserController.createUser);
router.get('/:id', UserController.detailUser);
router.delete('/:id', UserController.deleteUser);



module.exports=router;