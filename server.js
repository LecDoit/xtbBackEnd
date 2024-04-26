require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors');

const connectDB = require('./dbConn')
const express = require('express');
const app = express()

const {createUser,getAllUsers,getUser,addStock,resetUser,deleteStock,updateUserSellNBuy} = require('./controllers/userController.js')


const Users = require('./usersModel')


// Connect to mongo db
connectDB()


// middleware
app.use(express.json())

app.use(cors())

app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

app.get('/',(req,res)=>{
  res.json({msg:'This is regular endpoint for XTB App.'})


})




// helpers
app.get('/getAllUsers',getAllUsers)

app.post('/createUser', createUser)

app.patch('/resetUser',resetUser)

// Endpoints used on Web
app.post('/getUser', getUser)
app.patch('/deleteStock',deleteStock)
app.patch('/updateUserSellNBuy',updateUserSellNBuy)
app.patch('/addStock',addStock)




mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')

})



app.listen(10000,()=> console.log(`Server running on 10k`))
