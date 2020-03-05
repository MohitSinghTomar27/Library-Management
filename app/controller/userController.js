const {User}=require('../model/user')
const bcryptjs=require('bcryptjs')
module.exports.create=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
    .then((user)=>{
        res.json(user)
    })
    .catch((error)=>{
        res.send(error)
    })
}

module.exports.loginCreate=(req,res)=>{
    const body=req.body
    User.findbyCredentials(body.email,body.password)
    .then((user)=>{
        return user.generateToken()
    })
    .then(function(token){
        res.send(token)
    })
    .catch((error)=>{
        res.send(error)
    })
}

module.exports.account=(req,res)=>{
    const {user}=req
    res.send(user)
}

module.exports.logout=(req,res)=>{
    const{user,token}=req
    console.log(user)
        User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
        .then(function(){
            console.log(user)               
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
}


module.exports.update=(req,res)=>{
    console.log(req.body)
    const email=req.body.email
    //User.findbyCredentials(body.email,body.password)
    User.findOneAndUpdate({email:email},req.body,{new:true,runValidators:true})
    .then((user)=>{
        if(user){
            bcryptjs.genSalt(10)
            .then(function(salt){
                bcryptjs.hash(user.password,salt)
                .then(function(encryptedPassword){
                    user.password=encryptedPassword
                    user.save()
                    //next()
                })
            })    

            res.json(user)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}