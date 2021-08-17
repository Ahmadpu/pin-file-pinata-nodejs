
const axios = require('axios')
const fs=require('fs')
const FormData= require('form-data')
const path = require('path')

/////test might we have connected with pinata
//////////////////////////////////////////
exports.testAuthentication = (req,res)=>{
    const apikey= req.headers.pinata_api_key
        const secretkey= req.headers.pinata_secret_api_key

    const url = 'https://api.pinata.cloud/data/testAuthentication'
    return axios.get(url,{
        headers: {
            'pinata_api_key':apikey,
            'pinata_secret_api_key':secretkey
        }
    })
    .then((response)=>{
        res.status(200).json({
            "result":response.data
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send(err)
    })
}

//////////////pin image file to pinata and send to ipfs
///////////////////////////////////////////////////
exports.pinFileToIPFS = (req,res,next)=>{

        const pinataApiKey= req.headers.pinata_api_key
        const pinataSecretApiKey= req.headers.pinata_secret_api_key
        // const fileRequested = req.file.path
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    const reqdata = req.file.path
    let data = new FormData();
    data.append('file',fs.createReadStream(reqdata));
    console.log(data)
    
    return axios.post(url,data,
        {
            headers: {
                'Content-Type':`multipart/form-data; boundary=${data._boundary}`,
                'pinata_api_key':pinataApiKey,
                'pinata_secret_api_key':pinataSecretApiKey
            }
        })

        .then(result=>{
            console.log(result)
            filepath=reqdata
            fs.unlinkSync(filepath) 
            res.status(200).json({
                message:"Response result here",
                "fileStatus":"file removed from uploads",
                "results":result.data
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
}