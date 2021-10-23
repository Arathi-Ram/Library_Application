const express = require("express");
const authorData = require("../model/authorData");
const adminRoutes = express.Router();
const bookData = require('../model/bookData');
const session = require('express-session');
const multer = require('multer');

// define storage for images:
const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'./public/uploads/images')
    },

    // add back extn to picture:
    filename: function(req,file,callback){
        callback(null, Date.now() + file.originalname);
    }
});

// upload para for multer:
const upload = multer({
    storage:storage,
    limits:{
        fieldSize: 1024 * 1024 *3
    }
});

const isAdmin = (req,res,next) => {
    if(req.session.role === 'admin'){
        next();
    }
    else{
        
        res.redirect('/login') 
    }
}


function router(adminNav){
    // ADMIN PAGE:
    adminRoutes.get('/',isAdmin,function(req,res){
        res.render("Admin",
        {
            adminNav,
            title: 'Admin Home'
        });
    });
    
    
    // ADD BOOK PAGE:
    adminRoutes.get('/addbook',isAdmin,function(req,res){
        res.render("addBooks",{
            adminNav,
            title:"Library: Add Book Page"
        });
    });
    
    // INSERTBOOK BTN IN ADD BOOK PAGE:
    adminRoutes.post('/addbook/insertBook',upload.single('img'),isAdmin,async (req,res) =>{

        let books = new bookData({
            bookTitle: req.body.title,
            bookAuthor: req.body.author,
            pages:req.body.pages,
            publishedDate:req.body.publishedDate,
            genre:req.body.genre,
            lang:req.body.lang,
            img:req.file.filename
        })
    
        try {
            books = await books.save();
            res.redirect('/books');
        } catch (error) {
            console.log(error);
        }
       
    });
    // The below route handles retreiving the update form for the update book form
    // adminRoutes.get('/editBook/:id',function(req,res){
    //     bookData.findById(req.params.id,function(err,result){
    //         res.render('updateBook',{adminNav,title:"Update Book", books:result});
    //     });
    // });

    // EDIT BOOK FORM PAGE WITH DATA DISPLAYED FROM DB:
    adminRoutes.get('/editBook/:i',async(req,res) =>{
        const id = req.params.i;
        let books = await bookData.findById(id);
        res.render('updateBook',
        {
            adminNav,
            title:'Update Book',
            books:books
        });
        // console.log(book);
    });


    // BOOKS UPDATE OPERATION:
    adminRoutes.post('/updateBook/:id',async function(req,res){
        bookItems = {
            bookTitle: req.body.title,
            bookAuthor: req.body.author,
            pages:req.body.pages,
            publishedDate:req.body.publishedDate,
            genre:req.body.genre,
            lang:req.body.lang,
            // img:req.file.filename
        }
       await bookData.findByIdAndUpdate(req.params.id,bookItems);

       res.redirect('/books');
    });



    // DELETE BOOK OPERATION:
    adminRoutes.delete('/deleteBook/:id',async (req,res)=>{
        await bookData.findByIdAndDelete(req.params.id);
        res.redirect('/books');
    })
   
    // -------------------END OF BOOKS-----------------------------


    // ADD AUTHOR PAGE:
    adminRoutes.get('/addAuthor',isAdmin,function(req,res){
        res.render("addAuthor",{
            adminNav,
            title:"Libraray: Add Author Page"
        });
    });

    // ADD AUTHOR BTN IN ADD AUTHORS FORM:

    adminRoutes.post('/addAuthor/insertAuthor',upload.single('img'),isAdmin,function(req,res){
        var authorItems = {
            authorName: req.body.authorName,
            nationality: req.body.nationality,
            dob:req.body.dob,
            gender:req.body.gender,
            works:req.body.works,
            img:req.file.filename
        }
        var authors = authorData(authorItems);
        authors.save();    //saving to DB
        res.redirect('/authors');
    });
    // UPDATE AUTHOR FORM PAGE WITH DATA FROM DB: 
    adminRoutes.get('/editAuthor/:i',isAdmin,async(req,res) =>{
        const id = req.params.i;
        let authors = await authorData.findById(id);
        res.render('updateAuthor',
        {
            adminNav,
            title:'Update Author',
            authors:authors
        });
        // console.log(book);
    });

    // AUTHOR UPDATE OPERATION:
    adminRoutes.post('/:id',async function(req,res){
        authorItems = {
            authorName: req.body.authorName,
            nationality: req.body.nationality,
            dob:req.body.dob,
            gender:req.body.gender,
            works:req.body.works
            // img:req.file.filename
        }
       await authorData.findByIdAndUpdate(req.params.id,authorItems);

       res.redirect('/authors');
    });

    // DELETE AUTHOR OPERATION:
    adminRoutes.delete('/deleteAuthor/:id',async (req,res)=>{
        await authorData.findByIdAndDelete(req.params.id);
        res.redirect('/authors')
    })
    
    return adminRoutes;
}
module.exports = router;