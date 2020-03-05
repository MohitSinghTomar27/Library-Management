const mongoose=require('mongoose')
const Schema=mongoose.Schema
const date=new Date()
const transactionSchema=new Schema({
    borrower:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'borrower'
    },
    books:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'book'
    }],
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    duedate:{
        type:Date,
        default:date.setDate(date.getDate() + 3)
        //default:Date.now()
    },
    transaction_type:{
        type:String,
        required:true
    },
    number:{
        type:String,
        
    },
    createdAt:{
        type:Date,
        default:Date.now()

    }
})
const Transaction=mongoose.model('transaction',transactionSchema)
module.exports=Transaction
