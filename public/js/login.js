
// LOGIN FORM VALIDATION
const loginForm = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("exampleInputPassword1");

loginForm.addEventListener("keyup",(e) =>{
    e.preventDefault();
    checkInputs();
});



//KEYUP FUNCTION BELOW:----------------------------
function checkInputs(){
    const userValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(userValue === "admin"){
        setSuccessFor(username);
    } 
    else if(userValue === ""){
        setErrorFor(username, "Username field cannot be blank!")
    }
    else {
        setErrorFor(username,"Username is Incorrect!");
    }

    if(passwordValue === '12345'){
        setSuccessFor(password);
    }
    else if(passwordValue === ""){
        setErrorFor(password, "Password cannot be blank");
    }
    else{
        setErrorFor(password,"Password is Incorrect!");
    }

    
}
// set error function
function setErrorFor(input, message){
    const formControl = input.parentElement; 
    const small = formControl.querySelector("small");
    small.innerText = message;
    formControl.className = "login-form-control error";
}

// set success function
function setSuccessFor(input){
    const formControl = input.parentElement; 
    formControl.className = "login-form-control success";    
}


