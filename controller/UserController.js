
let User = require('../models/UserModel')
let bcrypt = require('bcrypt')
let nodemailer = require("nodemailer")
let otpGenerator = require("otp-generator")

let jwt = require("jsonwebtoken")


module.exports = {

    createUser: async (req, resp) => {
        console.log(req.body);
        let userExist = await User.findOne({ email: req.body.email })

        if (!userExist) {
            try {

                bcrypt.hash(req.body.password, 10, async (err, hash) => {

                    console.log(hash);
                    let result = await User.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    })

                    console.log(result);
                    resp.json({ message: "created successfully" })

                })


            }
            catch (err) {
                resp.json({ message: "error" })
            }
        }
        else {
            resp.json({ message: " user already Exist" })
        }


    },
    sendotp: async (req, res) => {

        console.log(req.body);

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'eveonfrancis08@gmail.com',
                pass: 'kqdq iznh omzy qxzr'
            }
        });


        let otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
        console.log(otp);

        let result = await User.create({ email: req.body.email, otp })

        console.log(result);

        if (result) {
            const mailData = {
                from: 'eveonfrancis08@gmail.com',
                to: req.body.email,

                subject: 'Hello from Nodemailer',
                text: `this is otp ${otp}`
            };



            transporter.sendMail(mailData, (error, info) => {
                if (error) {
                    console.log('Error:', error);
                    res.json("not found")

                } else {
                    console.log('Email sent:', info.response);
                    res.json(" email sent succeessfully")
                }
            });

        } else {
            res.json("error")
        }


    },
    otpverification: async (req, res) => {
        try {
            let userExist = await User.findOne({ email: req.body.email })
            if (!userExist) {
                res.json("user not exist")
            } else {
                if (req.body.otp == userExist.otp) {

                    await User.updateOne({ email: req.body.email }, { otp: "" })
                    res.json("login successfull")

                }
                else {
                    res.json("wrong otp")
                }
            }

        } catch (error) {
            res.status(400).json("error")
        }







    }, findUser: async (req, res) => {

        try {
            let userExist = await User.findOne({ email: req.body.email })

            if (userExist) {

                bcrypt.compare(req.body.password, userExist.password, (err, result) => {
                    if (result) {


                        let token = jwt.sign({ user: userExist }, "123", { expiresIn: 60 * 60 })
                        console.log(token);




                        res.json({ message: 'user logined succussfully', token: token })
                    } else {
                        res.json({ message: 'wrong password' })
                    }


                })


            } else {
                res.json({ message: 'email not exist' })
            }

        } catch (error) {
            res.json({ message: 'server error' })

        }

    },
    getalluser: async (req, res) => {
        try {
            let userList = await User.find({}, { password: 0 })

            res.status(200).json({ message: '', data: userList })
        } catch (error) {
            res.status(401).json({ message: "error", error: error })
        }

    },

    emailExist: async (req, res) => {
        const { email } = req.query;

        if (!email) {
            return res.status(400).send('Email query parameter is required.');
        }

        try {
            const exists = await emailExists(email);
            res.status(200).json({ email, exists });
        } catch (error) {
            res.status(500).send('An error occurred while checking the email.');
        }


    }



}
