// THIS FILE IS NO LONGER USED UNTIL NESTING ROUTES ARE LEARNED BY ME.
// INSTEAD OF THIS SEPARATE ROUTER FOR ADD BOOK I HAVE CREATED ADMIN ROUTES
const express = require("express");
const addAuthorRouter = express.Router();

function router(adminNav){
    // here / means ->  /addAuthor
    addAuthorRouter.get('/',function(req,res){
        res.render("addAuthor",{
            adminNav,
            title: "Library: Add Author Page"
        });
    });

    return addAuthorRouter;
}
module.exports = router;