const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Schema=mongoose.Schema
const bookSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    author:{
        type:String,
        required:true,
        minlength:1,
        maxlength:50
    },
    yop:{
        type:String,
        required:true,
        minlength:4,
        maxlength:4
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Book=mongoose.model('book',bookSchema)
module.exports=Book
