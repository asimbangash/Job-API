const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnAuthenticatedError } = require('../error');

const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnAuthenticatedError("authorization invalide");
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token,process.env.SECRET_KEY);
        
        // attach user to the job router

        const user = User.findById(payload.id).select('-password');
        req.user = user;
        
        req.user = {userId:payload.userId,name:payload.name}
        next();
    } catch (error) {
        throw new UnAuthenticatedError('invalide authenticated');
    }
};

module.exports = auth;