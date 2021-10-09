// Routing handler for book.
const express = require("express");
const booksRouter = express.Router();  // creatig a separate router handler for books page
// a function to catch the nav argument which contains the navbar array which is passed from app.js 
function router(nav){
// array of books:
var books = [
    
    {
        title: 'Harry Potter',
        author:'J.K.Rowling',
        genre: 'Fantasy Fiction',
        publish: '26-06-1997',
        lang:'English',
        pages:'223',
        img: "harryPotter.jpg"
    },
    {
        title: 'Raavan: Enemy of Aryavarta',
        author:'Amish',
        genre: 'Mythological Fiction',
        publish: '01-07-2019',
        lang:'English',
        pages:'374',
        img: "raavan.jpg"
    },
    {
        title: 'The Best of Me',
        author:'Nicholas Sparks',
        genre: 'Romantic Novel',
        publish: '07-10-2011',
        lang:'English',
        pages:'304',
        img: "bestOfMe.jpg"
    },
    {
        title: 'Angels & Demons',
        author:'Dan Brown',
        genre: 'Mystery-Thriller Novel',
        publish: '07-05-2000',
        lang:'English',
        pages:'616',
        img: "angelsDemons.jpg"
    }
];

// Books Router:----------------------
booksRouter.get('/',function(req,res){
    res.render("books",
    {
        nav,
        title:'Library',
        books
    });
});

// Single Book Router:------------------
booksRouter.get('/:i',function(req,res){ // here the :i can be anything like :name
    const id = req.params.i 
    res.render('book',
    {
        nav,
        title:'Library',
        book: books[id]
    });
});

return booksRouter;
}

module.exports = router; // exporting this module by exporting the router function which returns the booksRouter to be accessed in app.js