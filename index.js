const express=require('express')
const configureDB=require('./config/database')
const router=require('./config/routes')
const cors=require('cors')
const app=express()
const port=3025
app.use(express.json())
configureDB()
app.use(cors())
app.get('/',(req,res)=>{
    res.send('Welcome to the Library app')
})
app.use('/',router)

app.listen(port,()=>{
    console.log('listening on port',port)
})