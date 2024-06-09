var signUpButton;
var signInButton;
var signUPName;
var signUPEmail;
var signUPPassword;
var signInEmail;
var signInPassword;
var submitRegistration;
var login;
var mainBox = document.querySelector(".main-box");


var users;
if (localStorage.getItem("AllUsers") != null) {
    users = JSON.parse(localStorage.getItem("AllUsers"));

}
else {
    users = []
}



// Sign Up and Sign In Buttons 
signInBtn();
signUpButton = document.querySelector(".sign-up-btn");
signUpButton.addEventListener("click", signUPBtn);
function signUPBtn() {
    mainBox.innerHTML = `     <h1 class="text-center p-3 title">Smart Login System</h1>
    <div class="row mb-3">
    <div class="col-sm-10 w-100 ">
    <input placeholder="Enter your name" type="text" class="form-control bg-transparent text-white" id="signupname">
    </div>
    </div>
    <div class="row mb-3">
    <div class="col-sm-10 w-100 ">
    <input placeholder="Enter your email" type="email" class="form-control bg-transparent text-white" id="signupemail">
    </div>
    </div>
    <div class="row mb-3">
    <div class="col-sm-10 w-100">
    <input placeholder="Enter your password" type="password" class="form-control bg-transparent text-white" id="signuppassword">
    </div>
    </div>
    <p class="text-danger text-center alertmsg"></p>
    <button type="submit" class="btn login-btn registration-btn w-100 ">Sign Up</button>
    <p class="text-white text-center mt-3">Dont Have An Account ? <a class="text-white sign-in-btn"> Sign in</a></p>`;
    alertMsg = document.querySelector(".alertmsg");
    signInButton = document.querySelector(".sign-in-btn");
    signInButton.addEventListener("click", signInBtn);
    signUPName = document.querySelector("#signupname");
    signUPEmail = document.querySelector("#signupemail");
    signUPPassword = document.querySelector("#signuppassword");
    submitRegistration = document.querySelector(".registration-btn");
    submitRegistration.addEventListener("click", saveUser);


}

function signInBtn() {
    mainBox.innerHTML = `
         <h1 class="text-center p-3 title">Smart Login System</h1>
            <div class="row mb-3">
                <div class="col-sm-10 w-100 ">
                    <input placeholder="Enter your email" type="email" class="form-control bg-transparent text-white" id="signinmail">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-10 w-100">
                    <input placeholder="Enter your password" type="password" class="form-control bg-transparent text-white" id="signinpassword">
                </div>
            </div>
            <p class="text-danger text-center alertmsg-signin"></p>
            <button type="submit" class="btn login-btn login-button w-100 ">Login</button>
            <p class="text-white text-center mt-3">Dont Have An Account ? <a class="text-white sign-up-btn"> Sign up</a></p>`;
    aletMsgSignIn = document.querySelector(".alertmsg-signin");
    signUpButton = document.querySelector(".sign-up-btn");
    signUpButton.addEventListener("click", signUPBtn);
    signInEmail = document.querySelector("#signinmail");
    signInPassword = document.querySelector("#signinpassword");
    login = document.querySelector(".login-button");
    login.addEventListener("click", checkInfo);

}

function saveUser() {

    if (validateName() == true && validatEmail() == true && validatePassword() == true && findUser() == false) {

        var user = {
            userName: signUPName.value,
            userEmail: signUPEmail.value,
            userPassword: signUPPassword.value
        };
        users.push(user);
        localStorage.setItem("AllUsers", JSON.stringify(users));
        alertMsg.classList.replace("text-danger", "text-success");
        alertMsg.innerHTML = `Successful Registration`;
        clearForm();
        signInBtn();

    }
}


function clearForm() {
    signUPName.value = "";
    signUPEmail.value = "";
    signUPPassword.value = "";

}

function findUser() {

    for (var i = 0; i < users.length; i++) {
        if (signUPEmail.value == users[i].userEmail) {
            alertMsg.classList.replace("text-success", "text-danger");
            alertMsg.innerHTML = `Email Already Exists`;
            return true;
        }
    }

    return false;
}
function validateName() {
    var regex = /^[a-zA-Z]{3,}$/;
    if (regex.test(signUPName.value)) {
        return true;
    }
    alertMsg.classList.replace("text-success", "text-danger");
    alertMsg.innerHTML = `Name Must Be At Least 3 Characters`;
    return false;

}

function validatEmail() {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(signUPEmail.value)) {
        return true;
    }
    alertMsg.classList.replace("text-success", "text-danger");
    alertMsg.innerHTML = `Enter A Valid Email`;
    return false;
}

function validatePassword() {
    var regex = /^[A-Za-z\d]{8,}$/;
    if (regex.test(signUPPassword.value)) {
        return true;
    }
    alertMsg.classList.replace("text-success", "text-danger");
    alertMsg.innerHTML = `Password Must be At Least 8 Characters Or Numbers`;
    return false;
}

function checkInfo() {

    if (users.length == 0) {
        aletMsgSignIn.innerHTML = 'Email Not Found';
        return;
    }
    for (var i = 0; i < users.length; i++) {
        if (signInEmail.value == users[i].userEmail) {
            if (signInPassword.value == users[i].userPassword) {
                localStorage.setItem('loggedInUser', JSON.stringify(users[i]));
                window.location.href = "home.html";
            }
            else {
                aletMsgSignIn.innerHTML = `Password Wrong`;
            }
        }
        else {
            aletMsgSignIn.innerHTML = 'Email Not Found';
        }
    }
}