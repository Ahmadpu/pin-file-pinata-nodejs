
const express = require('express')
const app = express()

const pinataRoute = require('./route/route')

app.use('/auth',pinataRoute);

app.listen(3000,()=>{
    console.log(`server is listening at http://localhost:3000`)
})
//////////////////////////////////////////
/*
 *   var multer = require('multer')
 *   var upload = multer({dest:'uploads/'})
 *   var ipfsAPI = require('ipfs-api ')
 *   var ipfs = ipfsAPI('infura.ipfs.io', '5001', {protocol: 'http'})
 *
 *     //////$other Approaches to send data to PINATA API
 *  app.get('/',(req,res)=>{
 *  res.sendFile(__dirname+'/public/index.html')
 *   })
 *   app.post('/profile',upload.single('avatar'),(req,res,next)=>{
 *
 *   console.log(req.file)
 *   })
*/