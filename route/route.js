
const express = require('express')
const router = express.Router()
const util = require('../util')
const path = require('path')
var multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null,  '1' + path.extname(file.originalname));
    }
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png')
     {cb(null,true);}
    //reject a file
    else{cb(null,true);}
 };
 const uploads = multer({storage:storage,filefilter:fileFilter})
 //Endpoints--------------------------

router.get('/',util.testAuthentication)
router.post('/',uploads.single('file'),util.pinFileToIPFS)

module.exports=  router;