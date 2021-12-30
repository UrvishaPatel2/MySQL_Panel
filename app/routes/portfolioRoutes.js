const express = require("express");
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const portfolioController = require('../controller/portfolioController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({ storage: storage });

router.post('/api/portfolio', auth, upload.array('uploadImage'), portfolioController.addData);
router.get('/api/portfolio/find', auth, portfolioController.findData);
router.get('/api/portfolio/find/:id', auth, portfolioController.findDataByid);
router.put('/api/portfolio/update/:id', auth, upload.array('uploadImage'), portfolioController.editData);
router.delete('/api/portfolio/delete/:id', auth, portfolioController.deleteData);
router.delete('/api/portfolio/delete?:id', auth, portfolioController.multipleDelete);


module.exports = router;