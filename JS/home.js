var navBox = document.querySelector(".welcome-title");
var logoutButton = document.querySelector(".logout-btn");
var loggedUser;
if (localStorage.getItem("loggedInUser") != null) {
    loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

}
else {
    loggedUser = []
}
navBox.innerHTML += `${loggedUser.userName}`;

logoutButton.addEventListener("click" , function(){
    window.location.href = './../index.html';
    localStorage.removeItem('loggedInUser');
})