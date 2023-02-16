var btn = document.querySelector(".submit");
var userN = document.getElementById("user");
var passW = document.getElementById("password");
var myRole = ['@admin.vigga','@teacher.vigga','@staff.vigga','@student.vigga']
var myUser = ['admin','teacher','staff','student']


btn.addEventListener("click", () => {
  if (userN.value == '') {
    alert('please enter username...')
    return
  }
  if (passW.value == "") {
    alert("Please enter password..");
    return false;
  } else btn.href = "/home";
});
