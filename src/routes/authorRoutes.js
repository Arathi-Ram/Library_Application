const express = require("express");
const authorRouter = express.Router();
function router(nav){
    var authors = [
        {
            name:'J.K.Rowling',
            nationality:'British',
            works:'Harry Potter Series',
            DOB:'31-07-1965',
            gender: 'Female',
            img: "jkRowling.jpg"
        },
        {
            name:'Amish Tripathi',
            nationality:'Indian',
            works:'Shiva Trilogy',
            DOB:'18-10-1974',
            gender: 'Male',
            img: "Amish.jpg"
        },
        {
            name:'Nicholas Sparks',
            nationality:'American',
            works:'The Notebook',
            DOB:'31-12-1965',
            gender: 'Male',
            img: "nicholas.jpg"
        },
        {
            name:'Dan Brown',
            nationality:'American',
            works:'The Da Vinci Code',
            DOB:'22-06-1964',
            gender: 'Male',
            img: "danBrown.jpg"
        }
        
    ];

    authorRouter.get('/',function(req,res){
        res.render("authors",
        {
            nav,
            title:'Authors',
            authors
        });
    });

    authorRouter.get('/:i',function(req,res){
        const id = req.params.i;
        res.render('author',
        {
            nav,
            title:'Author',
            author:authors[id]
        });
    });
    return authorRouter;
}
module.exports = router;