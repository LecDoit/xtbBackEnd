const Stock = require('../stockModel')
const Users = require('../userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id,)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

const mongoose = require('mongoose')

//login

const loginUser = async (req,res)=>{

    const {email,password} = req.body

    try{
        const user = await Users.login(email,password)
        console.log(req.path, req.method,`user logged in ${user}`)

        const token = createToken(user._id)

        res.status(200).json({email,token})

    } catch (error){
        res.status(400).json({error:error.message})
    }
}
//signup

const signupUser = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await Users.signup(email,password)
        console.log(req.path, req.method,`user created ${user}`)

        const token = createToken(user._id)

        res.status(200).json({email,token})

    } catch (error){
        res.status(400).json({error:error.message})
    }


}


// helpers

const createUser =async(req,res)=>{
    console.log(req.path, req.method)
    const {username,stocks} = req.body
    try{
        const user = await Stock.create({username,stocks})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//get all users

const getAllUsers = async(req,res)=>{

    const users = await Stock.find({})
    res.status(200).json(users)
}

const resetUser = async (req,res)=>{

    const user=  req.body.user

    const userSearch = await Stock.find({username:user})
    console.log(Users)
    if (userSearch.length===0) {
        return res.status(405).json({error: 'no such user'})
    }
    const userRequest = await Stock.findOneAndUpdate({username:user},{ 

        ...req.body
            
    })

    const userRequestRefreshed = await Stock.find({username:user})
    console.log(req.body)
    res.status(200).json(userRequestRefreshed)

}


// Enpoints used on Web
const getUser = async (req,res)=>{


    const {user}=   (req.body)
    if (!user){
        return res.status(404).json({error:'wrong input'})
    }

    const userRequest = await Users.find({username:user})
    if (userRequest.length===0) {
        return res.status(405).json({error: 'no such user'})
    }

    res.status(200).json(userRequest[0])
}

const addStock = async (req,res)=>{

    const user=  req.body.user
    const symbol = req.body.stocks[0].symbol

    const userExist = await Stock.find({username:user})
    if (userExist.length===0) {
        return res.status(405).json({error: 'no such user or wrong input'})
    } else{
        const userSearch = await Stock.find({username:user})
        const userStocks =  userSearch[0].stocks
        for (let a = 0;a<userStocks.length;a++){
            if (userStocks[a].symbol===symbol){
                return res.status(406).json({error: 'Stock already added'})
            } 
        }
        const userRequest = await Stock.findOneAndUpdate({username:user},{ 
            $push :{stocks:req.body.stocks[0]}  
        })
    }
    
    const userRequestRefreshed = await Stock.find({username:user})

    console.log(`Adding a Stock to '${user}`)
    res.status(200).json(userRequestRefreshed[0])
}

const updateUserSellNBuy = async (req,res)=>{

    const user=  req.body.user

    const userExist = await Stock.find({username:user})
    if (userExist.length===0) {
        return res.status(405).json({error: 'no such user or wrong input'})
    } 

    const userRequest = await Stock.findOneAndUpdate({username:user},{ 
        ...req.body
    })

    const userRequestRefreshed = await Stock.find({username:user})
    console.log(`Updating Sell and Buy for '${user}`)
    res.status(200).json(userRequestRefreshed[0])
    
}

const deleteStock = async (req,res)=>{

    const user=  req.body.user

    const userExist = await Users.find({username:user})
    if (userExist.length===0) {
        return res.status(405).json({error: 'no such user or wrong input'})
    }
    const userRequest = await Users.findOneAndUpdate({username:user},{ 
        ...req.body  
        
    })

    const userRequestRefreshed = await Users.find({username:user})
    console.log(`Deleting stock for '${user}`)
    res.status(200).json(userRequestRefreshed[0])
}


module.exports = {
    getUser,
    createUser,
    getAllUsers,
    addStock,
    resetUser,
    deleteStock,
    updateUserSellNBuy,

    loginUser,
    signupUser

}

