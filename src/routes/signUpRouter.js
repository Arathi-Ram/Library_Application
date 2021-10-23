const express = require("express");
const signUpRouter = express.Router();
const bcrypt = require('bcryptjs');
// const User = require('../model/signUpData');
// const signUpData=require('../model/signUpData')
const UserModel = require('../model/user')
function router(nav){
    signUpRouter.get('/',function(req,res){
        res.render("signUp",
        {
            nav, //No NEED CHANGE router(nav) too
            title: 'Library SignUp',
            error:''
        });
    });

    signUpRouter.post('/registerUser',async (req,res) =>{
        const username = req.body.username;
        const name = req.body.name;
        const email = req.body.email;
        const Pass = req.body.Pass;
        const RePass = req.body.RePass;
        const mob = req.body.mob;
        const gender = req.body.gender;

        var hashedPsw = await bcrypt.hash(Pass,12);
        let user = await UserModel.findOne({email});

        if(user){
            
            res.render('signUp',
            {
                title: 'Library SignUp',
                error:'User already Exists! Please login from the link below'
            });
            
            
        }

        user = new UserModel({
            username,
            name,
            email,
            Pass:hashedPsw,
            RePass:hashedPsw,
            mob,
            gender
        });
        await user.save();

        res.render('login',{
            nav,
            title:'Library Login',
            error:'',
            success:'User Registered Successfully!'
        });
    });

    // signUpRouter.post('/addDetails',function(req,res){
    //     var signUpDetails = {
    //                 fName:req.body.fName,
    //                 lName:req.body.lName,
    //                 email:req.body.email,
    //                 Pass:req.body.Pass,
    //                 RePass:req.body.RePass,
    //                 mob:req.body.mob,
    //                 gender:req.body.gender
    //              }
    //     const newUser = User.create(signUpDetails);
    //     newUser.save();
    //     res.redirect('/login');

    // })



    // signUpRouter.post('/addDetails',function(req,res){
    //     var signUpDetails = {
    //         fName:req.body.fName,
    //         lName:req.body.lName,
    //         email:req.body.email,
    //         Pass:req.body.Pass,
    //         RePass:req.body.RePass,
    //         mob:req.body.mob,
    //         gender:req.body.gender
    //      }
    //      var signUpCollection = signUpData(signUpDetails);
    //      signUpCollection.save();
    //      res.redirect('/login');

    // });
    return signUpRouter;
}
module.exports = router;