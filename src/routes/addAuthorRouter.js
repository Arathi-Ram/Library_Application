const express = require("express");
const addAuthorRouter = express.Router();

function router(nav){
    // here / means ->  /addAuthor
    addAuthorRouter.get('/',function(req,res){
        res.render("addAuthor",{
            nav,
            title: "Library: Add Author Page"
        });
    });

    return addAuthorRouter;
}
module.exports = router;