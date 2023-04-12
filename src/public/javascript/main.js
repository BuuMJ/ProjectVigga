// var changeMod = document.querySelector('input')
// var body = document.querySelector('body')
// var changeText = document.querySelector('h4')
// changeMod.addEventListener('click', () =>{
//     body.classList.toggle('dark')
//     changeText.classList.toggle('changetexth4')
// })
function moveToTop() {
  var moveTopBtn = document.getElementById("moveTopBtn");
  var moveTop = document.getElementById("toTop");
  moveTopBtn.addEventListener("click", function() {
    moveTop.scrollIntoView();
  });
}
moveToTop();

document.body.onscroll = function() {scrollNavbar()};
function scrollNavbar() {
  var elems = document.getElementsByClassName('navbar-change');
  for ( var i = 0; i < elems.length ; i++ )
if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
document.getElementById('header').style.cssText = "background-color: white; border: none;box-shadow: 2px 2px 8px rgba(0,0,0,0.3);";
document.getElementById('navbar-mini').style.cssText = "background-color: #232223; border: none;";
document.getElementById('navbar-icon').style.color = "#e10d11"
elems[i].style.cssText = "color: black;";
document.getElementById('moveTopBtn').style.cssText = "opacity: 1; transition: .5s;";
} else {
document.getElementById('header').style.cssText = "background-color: transparent;";
document.getElementById('navbar-mini').style.cssText = "background-color: transparent;";
document.getElementById('navbar-icon').style.color = "white"
elems[i].style.cssText = "color: white;";
document.getElementById('moveTopBtn').style.cssText = "opacity: 0; transition: .5s;";
}
}
