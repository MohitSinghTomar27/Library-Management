const Transaction=require('../model/transaction')

module.exports.list=(req,res)=>{
    Transaction.find({user:req.user._id}).populate('books',['name']).populate('borrower')
    .then((transactions)=>{
        res.json(transactions)
    })
    .catch((err)=>{
        console.log(err)
    })
}


module.exports.listBorrowerTransaction=(req,res)=>{
    console.log(req.params)
    Transaction.find({borrower:req.params.id}).populate('book').populate('borrower')
    .then((transactions)=>{
        res.json(transactions)
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Transaction.findOne({_id:id,user:req.user._id}).populate('book').populate('borrower')
    .then((transaction)=>{
        if(transaction){
            res.json(transaction)
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
    const transaction=new Transaction(body)
    transaction.user=req.user._id
    transaction.save()
    .then((transaction)=>{
        res.json(transaction)
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Transaction.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((transaction)=>{
        if(transaction){
            res.json(transaction)
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
    Transaction.findOneAndDelete({_id:id,user:req.user._id})
    .then((transaction)=>{
        if(transaction){
            res.json(transaction)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}