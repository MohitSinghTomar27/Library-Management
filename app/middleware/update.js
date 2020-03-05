const Book=require('../model/books')

const updateBook=function(req,res,next){
    const id=req.body.books
    console.log('Book Id from mid',id)
    for(i of id){
        console.log(i)
        Book.findById(i)
        .then(function(book){
            //console.log(book)
            if(book.isAvailable==true){
                book.isAvailable=false
                book.save()
                next()
            }else{
                res.send('error')
            }
        })
        .catch(function(err){
            res.status('401').send(err)
        })
    }
        
}

module.exports={
    updateBook
}