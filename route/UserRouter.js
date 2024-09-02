let express= require("express")
let router= express.Router()
let JwtTokenValidation = require('../middlewares/JwtTokenValidation')


let { createUser,findUser,sendotp,otpverification,getalluser } = require("../controller/UserController")



router.post('/',createUser)
router.post('/login',findUser)

router.post('/sendotp',sendotp)


router.post('/otp',otpverification)
router.get('/getalluser',getalluser)





module.exports = router