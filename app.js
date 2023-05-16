const express = require('express')
const route1 = require('./routes')
const { MulterError } = require('multer')
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use('/api/v1', route1)

app.use((req, res, next)=>{
    next({code: 404, msg: 'resource not found'})
})

app.use((error, req, res, next)=>{
    let statusCode = error.code || 500;
    let msg = error.msg || 'server error';
    let data = error.content || JSON.stringify(error);
    if(error instanceof MulterError){
        statusCode = 400;
        msg = error.msg;
        data = null;
    }
    console.log('Error on multer:', error)
    res.status(statusCode).json({
        data: data,
        status: false,
        msg: msg,
        meta: null
    })
})

app.listen(4091, 'localhost', (err)=>{
    if(err){
        console.log('Error listening to port: 4040', err);
    }else{
        console.log('Server listening to port: ', 4040);
        console.log('Press CTRL+C to terminate the server.....');
    }
})