const express = require('express');
const ItemController = require('../controllers/itemController');
const router = express.Router();

router.get('/', ItemController.getAllItems);
router.post("/", ItemController.createItem)
router.get("/:id", ItemController.detailItem)
router.delete("/:id", ItemController.deleteById)
router.put("/:id", ItemController.editItem)


module.exports = router;