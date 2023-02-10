const User = require("../models/User");
const { BadRequestError, UnAuthenticatedError } = require('../error')
const { StatusCodes } = require('http-status-codes');

const Register = async(req,res)=>{
    const user = await User.create(req.body);
    const token = user.genAuthToken();
    res.status(StatusCodes.CREATED).json({ user:{name:user.name},token });
}

const Login = async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError("please fill the filleds");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new UnAuthenticatedError("invalide crediential");
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        throw new UnAuthenticatedError("Invalidede credientail");
    }
    const token = user.genAuthToken();
    res.status(StatusCodes.OK).json({ user:{name:user.name}, token });

};

module.exports = { Register,Login };