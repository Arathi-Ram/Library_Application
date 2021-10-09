// Contains main code relating to index page, and other routing. MAIN ROUTER
// Linking to other routers can also be done here.
const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const port = process.env.PORT || 5000;
const nav = [
    
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    },
    {
        link:'/addbook',name:'Add Books'
    },
    {
        link:'/addAuthor',name:'Add Author'
    },
    {
        link: '/login',name:'Logout'
    }
    
];


const booksRouter = require('./src/routes/bookRoutes')(nav); //here nav is mentioned to be passed to the bookRouter.js file
//because booksRouter has to be accessed from this bookRouter.js file, so mention the path of the file.
const authorRouter = require('./src/routes/authorRoutes')(nav);
const loginRouter = require('./src/routes/loginRouter')(nav);
const signUpRouter = require('./src/routes/signUpRouter')(nav);
const addBookRouter = require('./src/routes/addBookRouter')(nav);
const addAuthorRouter = require('./src/routes/addAuthorRouter')(nav);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs'); // the file format is mentioned here
app.set('views','./src/views')  // or use __dirname+/src/views // here initial path ha been set
app.use('/books',booksRouter); // asking the app to connect this router if user requests for /books page
app.use('/authors',authorRouter);
app.use('/login',loginRouter);
app.use('/route',loginRouter);
app.use('/signUp',signUpRouter);
app.use('/addbook',addBookRouter);
app.use('/addAuthor',addAuthorRouter);
//NOTE FOR ME:
// 1. CHANGE THE / DIRECTORY TO DIRECT THE LOGIN PAGE WHERE UPON CORRECT CREDENTIALS, HOME PAGE WILL BE DISPLAYED.
// 2. DIRECT /LOGOUT TO THE LOGIN ROUTER.


//Main Router:-
app.get('/',function(req,res){
    res.render("login", //only file name (index) is written as format of file is mentioned already in line 3
    {
        title:'Library Login'
    });
});
app.get('/home',function(req,res){
    res.render("index",
    {
        nav,
        title:'Library Application'
    })
})

app.listen(port,()=>{console.log("Server ready at "+ port);});