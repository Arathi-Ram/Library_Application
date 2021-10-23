// Contains main code relating to index page, and other routing. MAIN ROUTER
// Linking to other routers can also be done here.
const express = require("express");
const app = new express();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const port = process.env.PORT || 5000;
const MongoURI = "mongodb+srv://user1:12345@libraryapp.mi1k9.mongodb.net/LibraryApp?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const methodOverride = require('method-override');


mongoose.connect(MongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then((res) => {
    console.log("MongoDB Connected");
})

const nav = [
    
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    },
    
    {
        link: '/logout',name:'Logout'
    }
    
];

const adminNav =[
    {
        link:'/admin/addbook',name:'Add Books'
    },
    {
        link:'/books',name:'Books'
    },
    {
        link:'/admin/addAuthor',name:'Add Author'
    },
    {
        link:'/authors',name:'Authors'
    },
    {
        link: '/logout',name:'Logout'
    }
];

const store = new MongoDBSession({
    uri:MongoURI,
    collection: "mySession",
    // role: "admin"
});


const booksRouter = require('./src/routes/bookRoutes')(nav); //here nav is mentioned to be passed to the bookRouter.js file
//because booksRouter has to be accessed from this bookRouter.js file, so mention the path of the file.
const authorRouter = require('./src/routes/authorRoutes')(nav);
const loginRouter = require('./src/routes/loginRouter')(nav);
const signUpRouter = require('./src/routes/signUpRouter')(nav);
const adminRoutes = require('./src/routes/adminRoutes')(adminNav);
// const addBookRouter = require('./src/routes/addBookRouter')(adminNav);  //adminNav
// const addAuthorRouter = require('./src/routes/addAuthorRouter')(adminNav); //adminNav
app.use(
    session({
        secret: "key that will sign cookie",
        resave:false,
        saveUninitialized: false,
        store:store
    })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.set('view engine','ejs'); // the file format is mentioned here
app.set('views','./src/views')  // or use __dirname+/src/views // here initial path ha been set
app.use('/books',booksRouter); // asking the app to connect this router if user requests for /books page
app.use('/authors',authorRouter);
app.use('/login',loginRouter);
app.use('/route',loginRouter);

app.use('/signUp',signUpRouter);
// app.use('/addbook',addBookRouter);
// app.use('/addAuthor',addAuthorRouter);
app.use('/admin',adminRoutes);
//NOTE FOR ME:
// 1. CHANGE THE / DIRECTORY TO DIRECT THE LOGIN PAGE WHERE UPON CORRECT CREDENTIALS, HOME PAGE WILL BE DISPLAYED.
// 2. DIRECT /LOGOUT TO THE LOGIN ROUTER.

const isAuth = (req,res,next) => {
    if(req.session.isAuth){
        next()
    }
    else if(req.session.role === 'admin'){
        res.redirect('/admin');
    }
    else{
        res.redirect('/login')
    }
}
//Main Router:-
app.get('/',function(req,res){
   
    res.render("login", 
    {
        title:'Library Login',
        error:'',
        success:''
    });

});
app.get('/logout',(req,res) =>{
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/login');
    })
})
app.get('/home', isAuth ,function(req,res){
    res.render("index",
    {
        nav,
        title:'Library Application'
    })
})

app.listen(port,()=>{console.log("Server ready at "+ port);});

module.exports = isAuth;