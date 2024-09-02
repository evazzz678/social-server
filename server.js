let express = require('express')
let mongoos = require('mongoose')
let cors = require('cors')



let app = express()
app.use(express.json())
app.use(cors())

mongoos.connect('mongodb://localhost:27017/students').then(() => {
    console.log("mongodb connect");
}).catch((err) => {
    console.log(err);
})


let userRouter  = require('./route/UserRouter')

let postRouter = require('./route/PostRouter')





app.use('/user', userRouter)

app.use('/post',postRouter)



app.listen(3000, () => {
    console.log('server connected');
})
