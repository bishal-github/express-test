const userSvc = require('../services/user.service')

class AuthController{
    login =(req, res, next)=>{  
    }
    register =async(req, res, next)=>{  
        try{
            let data = req.body;
            console.log(req.file, req.files)

            if(req.file){
                data.image = req.file.filename;
            }


            await userSvc.validateRegister(data);
            let response =await userSvc.createUser(data);
            res.json({
                result: response,
                status: true,
                msg: 'User registered successfully',
                meta: null
            })
            console.log(response)
        }catch(exception){
            // console.log(exception)
            next({code: 404, msg: 'registration error '+ exception, data: req.body})
        }
    }
}

const authCtrl = new AuthController();
module.exports = authCtrl;