const { result, error } = require('@hapi/joi/lib/base');
const bcrypt = require('bcrypt');
const connection = require('../middleware/db');
const { register, login, resetpassword, verifyEmail, updatePassword, editProfile } = require('../validations/userValidation');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../services/mail');
const { emit } = require('../middleware/db');

var otp = Math.floor(100000 + Math.random() * 900000);
console.log(otp);

exports.register = async (req, res) => {
    try {
        const { error } = register(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const salt = await bcrypt.genSalt(10);
            const bcryptpassword = await bcrypt.hash(req.body.password, salt);
            const name = req.body.name;
            const email = req.body.email;
            const gender = req.body.gender;
            const phoneno = req.body.phoneno;
            const password = bcryptpassword;
            const uploadImage = req.file.filename;
            const city = req.body.city
            const sql = `INSERT INTO tb_register(name,email,gender,phoneno,password,uploadImage,city) VALUES('${name}','${email}','${gender}','${phoneno}','${password}','${uploadImage}','${city}')`;
            connection.query(sql, (err, result) => {
                if (err) {
                    logger.error('Error', err);
                } else {
                    res.send("Data Inserted...")
                }
            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.login = async function (req, res) {
    try {
        const { error } = login(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            var email = req.body.email;
            var password = req.body.password;
            connection.query('SELECT * FROM tb_register WHERE email = ?', [email], async function (error, results, fields) {
                if (error) {
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                } else {
                    if (results.length > 0) {
                        const comparision = await bcrypt.compare(password, results[0].password)
                        if (comparision) {
                            res.send({

                                "success": "login sucessfull"
                            })
                        }
                        else {
                            res.send({

                                "success": "Email and password does not match"
                            })
                        }
                    }
                    else {
                        res.send({

                            "success": "Email does not exits"
                        });
                    }
                }
            });

        }

    } catch (err) {
        logger.error('Error', err);
    }
}
exports.resetPassword = async (req, res) => {
    try {
        const { error } = resetpassword(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            const password = req.body.password;
            const email = req.user.email
            console.log(email);
            connection.query('SELECT password FROM tb_register  WHERE email=?', [email], async (err, result) => {
                if (result) {

                    console.log(result[0].password);
                    const validPassword = await bcrypt.compare(password, result[0].password);

                    if (validPassword) {

                        const newpassword = req.body.newpassword;
                        //    console.log(newpassword);
                        const salt = await bcrypt.genSalt(10);
                        const bcryptpassword = await bcrypt.hash(newpassword, salt);

                        // console.log(req.params.id);
                        console.log(bcryptpassword);
                        connection.query(`UPDATE tb_register SET password = ? WHERE email =?`, [bcryptpassword, email], (err, response) => {

                            if (response) {
                                // console.log(response);
                                res.send('password updated')
                            } else {
                                logger.error('Error', err);
                            }
                        })
                    } else {
                        res.send('password is incorrect')
                    }
                } else {
                    logger.error('Error', err);
                }
            })
        }

    } catch (err) {
        logger.error('Error', err);
    }

}

exports.forgetPassword = async (req, res) => {
    try {
        const { error } = verifyEmail(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const email = req.body.email;
            console.log(email);
            connection.query('SELECT * FROM tb_register WHERE email = ?', [email], async function (error, result, fields) {
                //console.log(result[0].email);
                if (result) {
                    sendOTP(email, otp);
                    res.send('OTP send');
                }
                else {
                    res.send('user not found')
                }
            })
        }

    } catch (err) {
        logger.error('Error', err);
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        // const otp = req.body.otp;
        // console.log(otp);
        if (otp == req.body.otp) {
            res.send('otp verify');
        }
        else {
            res.send('Invalid Otp')
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { error } = updatePassword(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const password = req.body.password;
            console.log(password);
            const salt = await bcrypt.genSalt(10);
            const bcryptpassword = await bcrypt.hash(password, salt);
            console.log(bcryptpassword);
            connection.query(`UPDATE tb_register SET password = ?`, [bcryptpassword], (err, response) => {

                if (response) {
                    // console.log(response);
                    res.send('password updated')
                } else {
                    logger.error('Error', err);
                }
            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.viewProfile = async (req, res) => {
    const email = req.user.email
    console.log(email);
    connection.query(`SELECT * FROM tb_register WHERE email=?`, [email], (err, result) => {
        if (result) {
            console.log(result);
            res.send(result);
        } else {
            logger.error('Error', err);
        }
    })
}

exports.editProfile = async (req, res) => {
    try {
        const { error } = editProfile(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const name = req.body.name;
            const email = req.body.email;
            const gender = req.body.gender;
            const phoneno = req.body.phoneno;
            const uploadImage = req.file.filename;
            const city = req.body.city

            connection.query(`UPDATE tb_register SET name='${name}', email='${email}', gender='${gender}', phoneno = '${phoneno}',uploadImage='${uploadImage}', city='${city}' WHERE email ='${req.user.email}'`, function (err, response) {

                if (response) {
                    // console.log(response);
                    res.send('Data updated')
                } else {
                    logger.error('Error', err);
                }
            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.send('log out');
    } catch (err) {
        logger.error('Error', err);
    }
}