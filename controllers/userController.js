const Users = require('../usersModel')
const mongoose = require('mongoose')


// create new user

const createUser =async(req,res)=>{
    console.log(req.path, req.method)
    const {username,stocks} = req.body
    try{
        const user = await Users.create({username,stocks})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//get all users

const getAllUsers = async(req,res)=>{

    const users = await Users.find({})
    res.status(200).json(users)
}

const resetUser = async (req,res)=>{


    const user=  req.body.user
    const userRequest = await Users.findOneAndUpdate({username:user},{ 

        ...req.body
            
    })

    const userRequestRefreshed = await Users.find({username:user})
    console.log(req.body)
    res.status(200).json(userRequestRefreshed)

}


// get a single user
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


// update user

const addStock = async (req,res)=>{


    const user=  req.body.user
    const symbol = req.body.stocks[0].symbol

    const userExist = await Users.find({username:user})
    if (userExist.length===0) {
        return res.status(405).json({error: 'no such user or wrong input'})
    } else{
        const userRequestRefreshed = await Users.find({username:user})
        const userStocks =  userRequestRefreshed[0].stocks
        for (let a = 0;a<userStocks.length;a++){
            if (userStocks[a].symbol===symbol){
                return res.status(406).json({error: 'Stock already added'})
            } 
        }
        

    }


    const userRequest = await Users.findOneAndUpdate({username:user},{ 

        $push :{stocks:req.body.stocks[0]}
        
        
        
    })
    console.log(`Adding a Stock to '${user}`)


    res.status(200).json("userRequestRefreshed[0]")
    

}

const updateUserSellNBuy = async (req,res)=>{

   
    const user=  req.body.user
    const userRequest = await Users.findOneAndUpdate({username:user},{ 

        ...req.body
        
        
    })


    const userRequestRefreshed = await Users.find({username:user})
    console.log('updating user',userRequestRefreshed[0].stocks)
    res.status(200).json(userRequestRefreshed[0])
    
}



const deleteStock = async (req,res)=>{

    const user=  req.body.user


    const userRequest = await Users.findOneAndUpdate({username:user},{ 

        ...req.body  
        
    })

    const userRequestRefreshed = await Users.find({username:user})
    console.log('deleting stock',req.body)
    res.status(200).json(userRequestRefreshed[0])
}


module.exports = {
    getUser,
    createUser,
    getAllUsers,
    addStock,
    resetUser,
    deleteStock,
    updateUserSellNBuy

}

