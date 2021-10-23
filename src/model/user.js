const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Pass:{
        type:String,
        required:true
    },
    RePass:{
        type:String,
        required:true
    },
    mob:{
        type:String,
        required:true
    },
    gender:String
});
const userData = mongoose.model('userData',userSchema);
module.exports = userData;