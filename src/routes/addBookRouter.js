const express = require("express");
const addBookRouter = express.Router();
function router(nav){
    
    // here / means ->  /addbook
    addBookRouter.get('/',function(req,res){
        res.render("addBooks",{
            nav,
            title: "Library: Add Book Page"
        });
    });

    return addBookRouter;

}
module.exports = router;