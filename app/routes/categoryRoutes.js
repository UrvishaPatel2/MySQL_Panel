const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth');
const categoryController = require('../controller/categoryController');

router.post('/api/category',auth,categoryController.addData);
router.get('/api/category/find',auth,categoryController.findData);
router.get('/api/category/find/:id',auth,categoryController.findDataByid);
router.put('/api/category/update/:id',auth,categoryController.editData);
router.delete('/api/category/delete/:id',auth,categoryController.deleteData);


module.exports=router;