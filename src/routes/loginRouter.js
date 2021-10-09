const express = require("express");
const loginRouter = express.Router();
const credentials = {
    username:'admin',
    password: '12345'
};

function router(nav){
    loginRouter.get('/',function(req,res){
        res.render("login",
        {
            nav,
            title: 'Library Login',
        });
    });

    loginRouter.post('/login',function(req,res){
        if(req.body.username === credentials.username && req.body.password === credentials.password){
            res.redirect('/home');
        }
        else{
            res.end('Invalid Username or Password! Go back and try again.')
        }
    })

    return loginRouter;
}
module.exports = router;