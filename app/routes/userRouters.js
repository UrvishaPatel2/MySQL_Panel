const express = require("express");
const router = express.Router();
const multer = require('multer');
const { auth, generateAuthToken } = require('../middleware/auth');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'app/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
    const upload = multer({ storage: storage });
    
const userController = require('../controller/userController');

router.post('/register',upload.single('uploadImage'),userController.register);

router.post('/login',generateAuthToken,userController.login);

router.post('/resetPassword',auth,userController.resetPassword);

router.post('/forgetPassword',userController.forgetPassword);

router.post('/verifyOtp', userController.verifyOtp);

router.put('/updatePassword',userController.updatePassword);

router.get('/viewProfile',auth,userController.viewProfile);

router.put('/editProfile', auth,upload.single('uploadImage'), userController.editProfile);



router.get('/logout',auth,userController.logout);



module.exports = router;