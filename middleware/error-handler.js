const { CustomAPIError } = require('../error');
const { StatusCodes } = require('http-status-codes'); 
const errorHandlerMiddleware = async(err,req,res,next)=>{

    let customError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || 'some thing went wrong please try again'
    }

    // if(err instanceof CustomAPIError){
    //    return res.status(err.statusCode).json({ msg: err.message });
    // }

    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item)=> item.message).join(',');
        customError.statusCode = 400     
    }

    if(err.code && err.code === 11000){
        customError.msg = `Duplicate value enterd for ${Object.keys(err.keyValue)} please chose another value`
        customError.statusCode = 400;
    }

    if(err.name === 'CastError'){
        customError.msg = `No Item Found with Id: ${err.values}`
        customError.statusCode = 404
    }
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('something went wrong try again');
    res.status(customError.statusCode).json({msg:customError.message});
}

module.exports = errorHandlerMiddleware;