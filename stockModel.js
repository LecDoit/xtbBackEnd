const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    stocks:[{
        
            symbol:{type:String},
            description:{type:String},
            categoryName:{type:String},
            buy:{type:Number},
            sell:{type:Number},

            start:{type:Number},
            period:{type:Number},
            ticks:{type:Number},

            trades:[{
                tradeDate:{type:Date},
                price:{type:Number},
                quantity:{type:Number},
                type:{type:String,enum:['buy','sell']}
            }]

        
    }]


},{timestamps:true})



module.exports = mongoose.model('stocks',stockSchema)

