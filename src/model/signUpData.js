const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LibraryApp');
const Schema = mongoose.Schema;
const signUpSchema = new Schema({
    fName:String,
    lName:String,
    email:String,
    Pass:String,
    RePass:String,   //RePass is retyped password
    mob:String,
    gender:String
});
const signUpData = mongoose.model('signUpData',signUpSchema);
module.exports = signUpData;