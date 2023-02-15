// function Create status
var data = [];

function add() {
  var blogContent = document.getElementById("content").value;
  var blogRole = document.getElementById("chooserole").value;
  var blogCategory = document.getElementById("choosecategory").value;
  var blogFile = document.getElementById("myFile").files;
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();
  var dateTime = date + " On " + time;
  if (!blogContent) {
    var alertFail = document.getElementById("alertFail");
    function showAlertFail() {
      alertFail.style.cssText = `transform: translatey(20%); transition: .5s`;
    }
    function hideAlertFail() {
      alertFail.style.cssText = `transform: translatey(-200%); transition: .5s`;
    }
    let hideAlertF;
    function hideAllertCTimeOut() {
      hideAlertF = setTimeout(hideAlertFail, 4000);
    }
    hideAllertCTimeOut();
    showAlertFail();
    return;
  }
 if (!blogRole){
  var checkConfirmRole = confirm('By default you will be anonymous') 
    if(checkConfirmRole == true){
    }
    else{
      return
    }
 }
 if (!blogCategory){
  var checkConFirmCategory = confirm('By default you will choose the social category')
    if(checkConFirmCategory == true){

    }
    else{
      return
    }
 }
  if (blogContent) {
    var blogRoleDisplay = blogRole || "Anonymous";
    var blogCategoryDisplay = blogCategory || "social";
    var blogItem = {
      nowDate: dateTime,
      Content: blogContent,
      Role: blogRoleDisplay,
      Category: blogCategoryDisplay,
      Upload: blogFile,
    };

    data.push(blogItem);
    renderAndBind();

    function renderBlog() {
      table = "";
      for (var i = 0; i < data.length; i++) {
        var fileNames = "";
        for (var j = 0; j < data[i].Upload.length; j++) {
          fileNames += data[i].Upload[j].name + " ";
        }
        table += `<li class="content__blog ">
            <span>Date: ${data[i].nowDate}</span>
            <span>I am a <b class="role">${data[i].Role}</b> I want to share about <b class="category">${data[i].Category}</b> with the following content:</span>
            <span>${data[i].Content}</span>
            <a class="linkDownload" href="${data[i].Upload.name}" download>${fileNames}</a>
            <div class="blog__icon">
                <div>
                    <button class="btnlike">
                        <i class="bi bi-heart"></i>
                    </button>
                    <input type="text" class="inputlike" value="0">
                    <button class="btndislike">
                        <i class="bi bi-heart-fill"></i>
                    </button>
                    <input type="text" class="inputdislike" value="0">
                </div>
                </div>
                <ul id="comment">
                    <textarea id="content__comment" placeholder="Add Your Comment Here"></textarea>
                    <div class="btn__comment">
                        <input id="submitComment" type="submit" value="Comment">
                    </div>
                </ul>
                </li> `;
      }
      document.getElementById("content__list--blog").innerHTML = table;
    }
    function renderAndBind() {
      renderBlog();
      // function like and dislike
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
            return (
              btndislike[i].innerHTML = `<i class="bi bi-heart-fill"></i>`,
              inputdislike[i].value = "0",
              inputdislike[i].style.color = "black"
            );
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
            return (
              btnlike[i].innerHTML = `<i class="bi bi-heart"></i>`,
              inputlike[i].value = "0",
              inputlike[i].style.color = "black"
            );
          });
    }
    //   function comment
 
    var commentInput = document.querySelectorAll("#content__comment");
    var commentBtn = document.querySelectorAll(
      ".btn__comment input[type='submit']"
    );
    var commentList = document.querySelectorAll(".content__blog #comment");

    for (let i = 0; i < commentBtn.length; i++) {
        commentBtn[i].addEventListener("click", addComment(i));
        // function pressEnter
        commentInput[i].addEventListener('keypress', function(e){
          if(e.key === 'Enter'){
            e.preventDefault();
            commentBtn[i].click();
            commentInput[i].value ='';
          }
        })
      }
      
      function addComment(index) {
        return function(e) {
          e.preventDefault();
          var comment = commentInput[index].value;
          if (comment.trim().length > 0) {
            var todayComment = new Date();
            var dateComment =
              todayComment.getDate() +
              "/" +
              (todayComment.getMonth() + 1) +
              "/" +
              todayComment.getFullYear();
            var timeComment =
              todayComment.getHours() + ":" + todayComment.getMinutes();
            var commentTime = dateComment + " On " + timeComment;
            var commentSection = `<li class="comment__section">
                                  <div class="comment__info">
                                  <p class="comment__text"> ${comment}</p>
                                  <p class="comment__date">(${commentTime})</p>
                                  </div>
                                </li>`;
            commentList[index].insertAdjacentHTML("beforeend", commentSection);
            comment = "";
          } else {
            showAlertComment();
            hideAllertCTimeOut();
          }
        };
      }
    
    var alertComment = document.getElementById("alertComment");
    function showAlertComment() {
      alertComment.style.cssText = `transform: translatex(-5%); transition: .5s`;
    }
    function hideAlertComment() {
      alertComment.style.cssText = `transform: translatex(150%); transition: .5s`;
    }
    let hideAlertC;
    function hideAllertCTimeOut() {
      hideAlertC = setTimeout(hideAlertComment, 2000);
    }

    showAlertSucces();
    hideTimeOut();
    clickOff();
  }
}

var show = document.getElementById("createpost");
var overplay = document.getElementById("overplay");
var tabShow = document.getElementById("show");
var btnBack = document.getElementById("btn-back");
var btnPrimary = document.getElementById("btn-primary");
function clickOn() {
  overplay.style.display = "block";
  tabShow.style.cssText = `transform: translateY(0); transition: .5s`;
}
function clickOff() {
  overplay.style.display = "none";
  tabShow.style.cssText = `transform: translateY(-200%); transition: .5s`;
  document.getElementById('createpost').value = '';
  document.getElementById("content").value = '';
  document.getElementById("chooserole").value = '';
  document.getElementById("choosecategory").value = '';
}

show.onclick = function () {
  clickOn();
};

overplay.onclick = function () {
  showAlertCancle();
  showOverplayCancle();
};
btnBack.onclick = function () {
  showAlertCancle();
  showOverplayCancle();
};
btnPrimary.onclick = function () {
  add();
};
var pressEnter = document.querySelector('.blogC')
pressEnter.addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    e.preventDefault();
    document.getElementById('btn-primary').click()
  }
})
// show alert

var alertSuccess = document.getElementById("alertSuccess");

function showAlertSucces() {
  alertSuccess.style.cssText = `transform: translatex(325%); transition: .5s`;
}
function hideAlertSucces() {
  alertSuccess.style.cssText = `transform: translatex(500%); transition: .5s`;
}
let hideAlertS;
function hideTimeOut() {
  hideAlertS = setTimeout(hideAlertSucces, 2000);
}

var alertCancle = document.getElementById("alertCancle");
var overplayCancle = document.getElementById("overplayCancle");
var nonCancle = document.querySelector(".nonCancle");
var doCancle = document.querySelector(".doCancle");
function showAlertCancle() {
  alertCancle.style.cssText = `transform: translatey(0); transition: .5s`;
}
function hieAlertCancle() {
  alertCancle.style.cssText = `transform: translatey(-300%); transition: .5s`;
}
function showOverplayCancle() {
  overplayCancle.style.display = "block";
}

function hideOverPlayCancle() {
  overplayCancle.style.display = "none";
}

overplayCancle.onclick = function () {
  hideOverPlayCancle();
  hieAlertCancle();
};

nonCancle.onclick = function () {
  hideOverPlayCancle();
  hieAlertCancle();
};

doCancle.onclick = function () {
  hideOverPlayCancle();
  hieAlertCancle();
  clickOff();
};
