const mongoose=require('mongoose')
const validator=require('validator')
const Schema=mongoose.Schema
const borrower=new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function (value){
                return validator.isEmail(value)
            },
            message:function (){
                return 'invalid email format'
            }
        }
       
    },
    contactno:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
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
const Borrower=mongoose.model('borrower',borrower)
module.exports=Borrower
