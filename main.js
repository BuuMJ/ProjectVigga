// var changeMod = document.querySelector('input')
// var body = document.querySelector('body')
// var changeText = document.querySelector('h4')
// changeMod.addEventListener('click', () =>{
//     body.classList.toggle('dark')
//     changeText.classList.toggle('changetexth4')
// })
var btnlike = document.querySelectorAll(".btnlike");
var btndislike = document.querySelectorAll(".btndislike");
var inputlike = document.querySelectorAll(".inputlike");
var inputdislike = document.querySelectorAll(".inputdislike");
// btn click
var clicked = false;
for (let i = 0; i < btnlike.length; i++)
  for (let i = 0; i < inputlike.length; i++)
    btnlike[i].addEventListener("click", () => {
      if (!clicked) {
        clicked = true;
        btnlike[i].innerHTML = `<i class="bi bi-heart-fill"></i>`;
        inputlike[i].value = "1";
        inputlike[i].style.color = "#0480FC";
      } else if (clicked) {
        clicked = false;
        btnlike[i].innerHTML = `<i class="bi bi-heart"></i>`;
        inputlike[i].value = "0";
        inputlike[i].style.color = "black";
      }
      return btndislike[i].innerHTML = `<i class="bi bi-heart-fill"></i>`,
      inputdislike[i].value = "0",
      inputdislike[i].style.color = "black";
    });

for (let i = 0; i < btndislike.length; i++)
  for (let i = 0; i < inputdislike.length; i++)
    btndislike[i].addEventListener("click", () => {
      if (!clicked) {
        clicked = true;
        btndislike[i].innerHTML = `<i class="bi bi-heartbreak-fill"></i>`;
        inputdislike[i].value = "1";
        inputdislike[i].style.color = "red";
      } else {
        clicked = false;
        btndislike[i].innerHTML = `<i class="bi bi-heart-fill"></i>`;
        inputdislike[i].value = "0";
        inputdislike[i].style.color = "black";
      }
      return btnlike[i].innerHTML = `<i class="bi bi-heart"></i>`,
      inputlike[i].value = "0",
      inputlike[i].style.color = "black";
    });
