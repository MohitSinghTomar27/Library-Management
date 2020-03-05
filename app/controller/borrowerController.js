const Borrower=require('../model/borrower')

module.exports.list=(req,res)=>{
    Borrower.find({user:req.user._id})
    .then((borrowers)=>{
        res.json(borrowers)
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Borrower.findOne({_id:id,user:req.user._id})
    .then((borrower)=>{
        if(borrower){
            res.json(borrower)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const borrower=new Borrower(body)
    borrower.user=req.user._id
    borrower.save()
    .then((borrower)=>{
        res.json(borrower)
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Borrower.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((borrower)=>{
        if(borrower){
            res.json(borrower)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Borrower.findOneAndDelete({_id:id,user:req.user._id})
    .then((borrower)=>{
        if(borrower){
            res.json(borrower)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}