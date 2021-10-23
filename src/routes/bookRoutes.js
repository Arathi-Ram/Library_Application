// Routing handler for book.
const express = require("express");
const booksRouter = express.Router();  // creatig a separate router handler for books page
const bookData = require('../model/bookData');
const session = require('express-session');
const isAuth = (req,res,next) => {
    if(req.session.isAuth || req.session.role ==='admin'){
        next()
    }
    else{
        res.redirect('/login')
    }
}




// a function to catch the nav argument which contains the navbar array which is passed from app.js 
function router(nav){
// array of books:
// var books = [
    
//     {
//         title: 'Harry Potter',
//         author:'J.K.Rowling',
//         genre: 'Fantasy Fiction',
//         publish: '26-06-1997',
//         lang:'English',
//         pages:'223',
//         img: "harryPotter.jpg"
//     },
//     {
//         title: 'Raavan: Enemy of Aryavarta',
//         author:'Amish',
//         genre: 'Mythological Fiction',
//         publish: '01-07-2019',
//         lang:'English',
//         pages:'374',
//         img: "raavan.jpg"
//     },
//     {
//         title: 'The Best of Me',
//         author:'Nicholas Sparks',
//         genre: 'Romantic Novel',
//         publish: '07-10-2011',
//         lang:'English',
//         pages:'304',
//         img: "bestOfMe.jpg"
//     },
//     {
//         title: 'Angels & Demons',
//         author:'Dan Brown',
//         genre: 'Mystery-Thriller Novel',
//         publish: '07-05-2000',
//         lang:'English',
//         pages:'616',
//         img: "angelsDemons.jpg"
//     }
// ];

// Books Router:----------------------
booksRouter.get('/',isAuth,function(req,res){
    bookData.find()
    .then(function(books){    //here if find() is sucess then the list of books will be caught in the books variable in .then()
        res.render("books",
    {
        nav,
        title:'Library:Books',
        books,
        success:''
    });

    });
    
});

// Single Book Router:------------------
booksRouter.get('/:i',function(req,res){ // here the :i can be anything like :name
    const id = req.params.i;
    bookData.findOne({_id:id})
    .then(function(book){
        if(req.session.role === "admin"){
            res.render('book',
            {
                 nav,
                title:'Library',
                book,
                 admin:'admin'
            });
        }
        else{
            res.render('book',
            {   
                nav,
                title:'Library',
                book,
                admin:''
            });
        }
    }); 
    
});
// booksRouter.get('/editBook/:i',function(req,res){
//     const id = req.params.i;
//     bookData.findById(id);
//     res.render('updateBook',{
//         nav,
//         title:'Update Book',
//         book:book
//     })
// })


return booksRouter;
}

module.exports = router; // exporting this module by exporting the router function which returns the booksRouter to be accessed in app.js