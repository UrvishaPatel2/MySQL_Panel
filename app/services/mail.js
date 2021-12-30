const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');


const transport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    port: 25,
    auth:{
        user:process.env.SECRET_EMAIL,
        pass:process.env.SECRET_PASS
    }
})

// send email
const sendOTP = (email,otp)=>{
const mailsend = {
    to:email,
    subject:'OTP for New Password',
    html:"OTP for New Password" + "<b>" + "  " + otp +"</b>"
}

 const mail =transport.sendMail(mailsend,function(error){
    if(error){
        console.log("Error",error);
    }
    else{
        console.log('Email is  sent'); 
    }
})
return mail;

}

module.exports={sendOTP};