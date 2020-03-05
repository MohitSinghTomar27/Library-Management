const Transaction=require('../model/transaction')
const sendSms=function(req,res,next){
    const to_number=`+91${req.body.number}`
    console.log(to_number)
    const accountSid = 'AC4e3becc5067c2e89df6a06f9e98ce0df';
    const authToken = 'f33ea33287048637620bbd91d6d11220';
    const client = require('twilio')(accountSid, authToken);

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

