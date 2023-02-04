var btn = document.querySelector(".submit");
var userN = document.getElementById("user");
var passW = document.getElementById("password");


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
     
     else(
        btn.href= "home.html"
     )
})
