const Book=require('../model/books')

module.exports.list=(req,res)=>{
    Book.find({user:req.user._id})
    .then((books)=>{
        res.json(books)
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Book.findOne({_id:id,user:req.user._id})
    .then((book)=>{
        if(book){
            res.json(book)
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
    const book=new Book(body)
    book.user=req.user._id
    book.save()
    .then((book)=>{
        res.json(book)
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Book.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((book)=>{
        if(book){
            res.json(book)
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
    Book.findOneAndDelete({_id:id,user:req.user._id})
    .then((book)=>{
        if(book){
            res.json(book)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}