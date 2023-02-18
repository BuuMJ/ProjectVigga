
btn.addEventListener("click", () => {
  if (userN.value == '') {
    alert('please enter username...')
    return
  }
  if (passW.value == "") {
    alert("Please enter password..");
    return false;
  } else btn.href = "/";
});

