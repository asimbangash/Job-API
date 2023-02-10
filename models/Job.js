const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide company name']
    },
    position:{
        type:String,
        required:[true,'please provide position name']
    },
    status:{
        type:String,
        enum:['decline','interview','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user']
    }

},{timestamps:true});

module.exports = mongoose.model('Job',jobSchema);