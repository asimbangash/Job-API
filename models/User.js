const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide name"],
        minlength:3,
        maxlength:15
    },
    email:{
        type:String,
        required:[true,"please provide email"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalide");
            }
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide email"]
    }
});

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.genAuthToken = function(){
    return jwt.sign({ userId: this._id,name:this.name },process.env.SECRET_KEY,{expiresIn:process.env.JWT_LIFETIME});
}

userSchema.methods.comparePassword = async function(condidatePassword){
    const isMatch = await bcrypt.compare(condidatePassword,this.password);
    return isMatch;
}

module.exports = mongoose.model('User',userSchema);