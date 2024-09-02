let express = require("express")
let router = express.Router()

let JwtTokenValidation = require('../middlewares/JwtTokenValidation')


let { CreatePost, GetAllPost, NewPost } = require("../controller/PostController")



router.post('/', JwtTokenValidation, CreatePost)

router.get('/getallpost', JwtTokenValidation, GetAllPost)

router.put('/posts/:id', NewPost)

module.exports = router;