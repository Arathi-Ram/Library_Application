const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user1:12345@libraryapp.mi1k9.mongodb.net/LibraryApp?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    authorName:String,
    nationality:String,
    dob:String,
    gender:String,
    works:String,
    img:String

});
const authorData = mongoose.model('authorData',AuthorSchema);
module.exports = authorData;