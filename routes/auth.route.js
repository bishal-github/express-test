const authCtrl = require('../src/controller/auth.controller');
const uploader = require('../src/middleware/uploader.middleware');
const router = require('express').Router();


router.post('/login', authCtrl.login)

const dirPath = (req, res, next)=>{
    req.uploadPath = './public/uploads/users';
    next();
}

router.post('/register', dirPath, uploader.single('image'), authCtrl.register)

module.exports = router;