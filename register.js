var btn = document.querySelector(".submit");
var userN = document.getElementById("user");
var passW = document.getElementById("password");
var phoneR = document.getElementById("phone");
var emailL = document.getElementById("email");


btn.addEventListener("click",() => {
    if (userN.value == "")
    {
        
        alert("Please enter username..")
        return false
    }

     if (passW.value == "")
     {
         alert("Please enter password..")
        return false;   
     }

     if (phoneR.value == "")
     {
        alert("Please enter your phone..")
        return false;
     }

     if (emailL.value == "")
     {
        alert("Please enter your email..")
     }

     else(
        btn.href= "login.html"
     )
})