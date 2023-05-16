const joi = require('joi');
const MongoDBService = require('../services/mongodb.service')

class UserService extends MongoDBService{
    constructor(){
        super();
    }
    validateRegister = (data)=>{
        try{
            let rules = joi.object({
                name: joi.string().min(3).max(30).required(),
                email: joi.string().email().required(),
                password: joi.string().min(8).max(25).required(),
                address: joi.string(),
                role: joi.string().pattern(/customer|seller/).default('customer'),
                status: joi.string().pattern(/active|inactive/),
                image: joi.string()
            })

            let response = rules.validate(data);
            // console.log(response.error)


            if(response.error){
                throw response.error.details[0].message;
            }else{
                return response;
            }

        }catch(exception){
            console.log(exception)
            throw exception;
        }
    }
    createUser = async(data)=>{
        try{
            let response = await this._db.collection('users').insertOne(data);
            return response;
        }catch(err){
            throw err;
        }
    }
}

const userSvc = new UserService();
module.exports = userSvc;