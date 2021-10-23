const addAuthorForm = document.getElementById("addAuthor-form");
const authorName = document.getElementById("authorName");
const nationality = document.getElementById("nationality");
const works = document.getElementById("works");
const dob = document.getElementById("dob");
const gender = document.getElementById("gender");
const lang = document.getElementById("lang");


addAuthorForm.addEventListener("keyup",(e)=>{
    e.preventDefault();

    checkSignInputs();
});


function checkSignInputs(){
   
    const authorNameValue = authorName.value.trim();
    const nationalityValue = nationality.value.trim();
    var worksValue = works.value.trim();
    const dobValue = dob.value.trim();
    const genderValue = gender.value.trim();
    

    
    if(authorNameValue === ""){
        setErrorFor(authorName,"Field cannot be empty!");
        }

    else {
        setSuccessFor(authorName);
    }


    if(nationalityValue === ""){
        setErrorFor(nationality, "Field cannot be empty!");
    }
    else{
        setSuccessFor(nationality);
    }


    if(worksValue === ""){
        setErrorFor(works, "Field cannot be empty!")
    }
    else{
        setSuccessFor(works);
    }
   
    if(dobValue === ""){
        setErrorFor(dob,"Field cannot be empty!");
    }
    
    else{
        setSuccessFor(dob);
    }
    
    if(genderValue === ""){
        setErrorFor(gender, "Field cannot be empty!");
    }
    else{
        setSuccessFor(gender);
    }

    
   
    
}
// create the setErrorFor to make custom mesages for inputs with errors
// add error msg inside small tag
    function setErrorFor(input, message){
        const signFormControl = input.parentElement; // .signUp-form-control div
        const small = signFormControl.querySelector("small");

        small.innerText = message;

        signFormControl.className = "addAuthor-form-control error";
    }
// create the setSuccessFor to make field success and remove error small text for successful inputs

    function setSuccessFor(input){
        const signFormControl = input.parentElement;
        signFormControl.className = "addAuthor-form-control success";
    }
   