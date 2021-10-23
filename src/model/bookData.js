const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user1:12345@libraryapp.mi1k9.mongodb.net/LibraryApp?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    bookTitle :String,
    bookAuthor:String,
    pages: Number,
    publishedDate:String,
    genre :String,
    lang:String,
    img:String
});
const bookData = mongoose.model('bookData',BookSchema);
module.exports = bookData;