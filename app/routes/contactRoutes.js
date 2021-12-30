const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth');
const contactController = require('../controller/contactController')

router.post('/api/contact',auth,contactController.addData);
router.get('/api/contact/find',auth,contactController.findData);
router.get('/api/contact/find/:id',auth,contactController.findDataByid);
router.put('/api/contact/update/:id',auth,contactController.editData);
router.delete('/api/contact/delete/:id',auth,contactController.deleteData);


module.exports = router;