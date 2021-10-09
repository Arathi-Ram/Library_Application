const addBookForm = document.getElementById("addBook-form");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const pages = document.getElementById("pages");
const publishDate = document.getElementById("publishDate");
const genre = document.getElementById("genre");
const lang = document.getElementById("lang");


addBookForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    checkSignInputs();
});


function checkSignInputs(){
    //assign input values to a variable to use in this method for checking
    // const signEmailValue = signEmail.value.trim();
    const bookTitleValue = bookTitle.value.trim();
    const bookAuthorValue = bookAuthor.value.trim();
    var pagesValue = pages.value.trim();
    const publishDateValue = publishDate.value.trim();
    const genreValue = genre.value.trim();
    const langValue = lang.value.trim();

    
    if(bookTitleValue === ""){
        setErrorFor(bookTitle,"Field cannot be empty!");
        }

    else {
        setSuccessFor(bookTitle);
    }


    if(bookAuthorValue === ""){
        setErrorFor(bookAuthor, "Field cannot be empty!");
    }
    else{
        setSuccessFor(bookAuthor);
    }


    if(pagesValue === ""){
        setErrorFor(pages, "Field cannot be empty!")
    }
    else{
        setSuccessFor(pages);
    }
   
    if(publishDateValue === ""){
        setErrorFor(publishDate,"Field cannot be empty!");
    }
    
    else{
        setSuccessFor(publishDate);
    }
    
    if(genreValue === ""){
        setErrorFor(genre, "Field cannot be empty!");
    }
    else{
        setSuccessFor(genre);
    }

    if(langValue === ""){
        setErrorFor(lang, "Field cannot be empty!");
    }
    
    else{
        setSuccessFor(lang);
    }
   
    
}
// create the setErrorFor to make custom mesages for inputs with errors
// add error msg inside small tag
    function setErrorFor(input, message){
        const signFormControl = input.parentElement; // .signUp-form-control div
        const small = signFormControl.querySelector("small");

        small.innerText = message;

        signFormControl.className = "addBook-form-control error";
    }
// create the setSuccessFor to make field success and remove error small text for successful inputs

    function setSuccessFor(input){
        const signFormControl = input.parentElement;
        signFormControl.className = "addBook-form-control success";
    }
   