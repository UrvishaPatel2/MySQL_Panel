const express = require("express");
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');
const testimonialController = require('../controller/testController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'app/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
    const upload = multer({ storage: storage });

router.post('/api/testimonial',auth,upload.single('uploadImage'),testimonialController.addData);
router.get('/api/testimonial/find',auth,testimonialController.findData);
router.get('/api/testimonial/find/:id',auth,testimonialController.findDataByid);
router.put('/api/testimonial/update/:id',auth,upload.single('uploadImage'),testimonialController.editData);
router.delete('/api/testimonial/delete/:id',auth,testimonialController.deleteData);


module.exports = router;