const express = require("express");
const authorRouter = express.Router();
const session = require('express-session');

const authorData = require('../model/authorData');
const isAuth = (req,res,next) => {
    if(req.session.isAuth || req.session.role ==='admin'){
        next()
    }
    else{
        res.redirect('/login')
    }
}

function router(nav){
    // var authors = [
    //     {
    //         name:'J.K.Rowling',
    //         nationality:'British',
    //         works:'Harry Potter Series',
    //         DOB:'31-07-1965',
    //         gender: 'Female',
    //         img: "jkRowling.jpg"
    //     },
    //     {
    //         name:'Amish Tripathi',
    //         nationality:'Indian',
    //         works:'Shiva Trilogy',
    //         DOB:'18-10-1974',
    //         gender: 'Male',
    //         img: "Amish.jpg"
    //     },
    //     {
    //         name:'Nicholas Sparks',
    //         nationality:'American',
    //         works:'The Notebook',
    //         DOB:'31-12-1965',
    //         gender: 'Male',
    //         img: "nicholas.jpg"
    //     },
    //     {
    //         name:'Dan Brown',
    //         nationality:'American',
    //         works:'The Da Vinci Code',
    //         DOB:'22-06-1964',
    //         gender: 'Male',
    //         img: "danBrown.jpg"
    //     }
        
    // ];

    authorRouter.get('/',isAuth,function(req,res){
        authorData.find()
        .then(function(authors){
            res.render("authors",
        {
            nav,
            title:'Authors',
            authors
        });

        })
        
    });

    authorRouter.get('/:i',function(req,res){
        const id = req.params.i;
        authorData.findOne({_id:id})
        .then(function(author){
            if(req.session.role ==="admin"){
                res.render('author',
                {
                    nav,
                    title:'Author',
                    author,
                    admin:'admin'
                });
            }
            else{
                res.render('author',
                {
                    nav,
                    title:'Author',
                    author,
                    admin:''
                });
            }
        });
        
    });
    return authorRouter;
}
module.exports = router;