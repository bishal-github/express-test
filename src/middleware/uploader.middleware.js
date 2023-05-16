const helpers = require('../../config/helpers') 
const fs= require('fs')

const multer = require('multer');
const myStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let path = req.uploadPath;
        if(!fs.existsSync(path)){
            fs.mkdirSync(path, {
                recursive: true
            })
        }
        cb(null, path);
    },
    filename: (req, file, cb)=>{
        // console.log(file)
        // let fname = Date.now()+'-'+file.originalname;
        let fname = Date.now()+'-'+helpers.randomString(30)+'-'+file.originalname
        cb(null, fname)
    }
})

const imageFilter = (req, file, cb)=>{
    try{
        let filename = file.originalname;
        let ext = filename.split('.').pop();
        const allowed = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
        if(allowed.includes(ext.toLowerCase())){
            cb(null, true);
        }
    }catch(err){
        cb(err, null);
    }
}


const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5000000
    }

})

module.exports = uploader;