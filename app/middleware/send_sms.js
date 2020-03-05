const Transaction=require('../model/transaction')
const sendSms=function(req,res,next){
    const to_number=`+91${req.body.number}`
    console.log(to_number)
    const accountMoh = 'process.env';
    const authToken = 'preess.env';
    const client = require('twilio')(accountMoh, authToken);

    client.messages
    .create({
        body: 'Your transaction has Done',
        from: '+12628067034',
        to: to_number
    })
    .then((message) => {
        console.log(message.sid)
        next()
    })
    .catch((err)=>{
        console.log(err)
    });

}

module.exports={
    sendSms
}

