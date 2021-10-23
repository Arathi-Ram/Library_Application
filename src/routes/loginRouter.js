const express = require("express");
const loginRouter = express.Router();
const UserModel = require('../model/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const isAuth = require('../../app');
const isAdmin = require('./adminRoutes');




function router(nav){
    loginRouter.get('/',function(req,res){
        res.render("login",
        {
            nav,   // NO NEED, EVEN CHECK IN router(nav)
            title: 'Library Login',
            error:'',
            success:''
        });
    });

    loginRouter.post('/login',async (req,res) => {
        const username = req.body.username;
        const password = req.body.password;
        
        const user = await UserModel.findOne({username})

        if(!user){
            return res.render('login',
            {
                nav,
                title:'Library Login',
                error:'User does not exist! Please Register & Try again!',
                success:''
            });
        }

        const isMatched = await bcrypt.compare(password,user.Pass)

        if(!isMatched){

            return res.render('login',
            {
                nav,
                title: 'Library Login',
                error:'Password does not match! Try again!',
                success:''
            });
        }

        if(username === "admin" && password === "12345"){
            req.session.role = 'admin';
            return res.redirect('/admin'); 
        }
        req.session.isAuth = true;
        res.redirect('/home')
    })

    return loginRouter;
}
module.exports = router;