const mongoose=require('mongoose')
const configureDB=()=>{
    mongoose.connect('mongodb://localhost:27017/library_management_system',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
    .then(()=>{
      console.log('Connected To DB')  
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=configureDB