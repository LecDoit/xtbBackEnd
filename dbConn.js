const mongoose = require('mongoose');

const secret = 'mongodb+srv://pikajunglist:Baddadan120!@cluster0.dgdbkuo.mongodb.net/XtbUser?retryWrites=true&w=majority'

const connectDB = async()=>{
    try{
        await mongoose.connect(secret,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })

    }catch(err){
        console.error(err)
    }

}

module.exports = connectDB