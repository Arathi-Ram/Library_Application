// THIS FILE IS NO LONGER USED UNTIL NESTING ROUTES ARE LEARNED BY ME.
// INSTEAD OF THIS SEPARATE ROUTER FOR ADD BOOK I HAVE CREATED ADMIN ROUTES
const express = require("express");
const addBookRouter = express.Router();
function router(adminNav){
    
    // here / means ->  /addbook
    addBookRouter.get('/addbook',function(req,res){
        res.render("addBooks",{
            adminNav,
            title: "Library: Add Book Page"
        });
    });

    return addBookRouter;

}
module.exports = router;