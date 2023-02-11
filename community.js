
var data = []
function add(){
    var blogTitle = document.getElementById("title").value
    var blogContent = document.getElementById("content").value
    var blogRole = document.getElementById("chooserole").value
    var blogCategory = document.getElementById("choosecategory").value
    // var blogDeadlineFirst = document.getElementById("deadlinefirst").value
    // var blogDeadlineSecond = document.getElementById("deadlinesecond").value
    var blogItem = {
        Title: blogTitle,
        Content: blogContent,
        Role: blogRole,
        Category: blogCategory,
        // DeadlineFirst: blogDeadlineFirst,
        // DeadlineSecond: blogDeadlineSecond,
        // Upload: blogFile
    }
    data.push(blogItem)
    renderBlog()
    
    function renderBlog() {
        // <span>Deadline First: ${blogDeadlineFirst}</span>
        // <span>Deadline Second: ${blogDeadlineSecond} </span>
        table = ` <div class="content__blog ">
        <span>Title: ${blogTitle}</span>
        <span>Content: ${blogContent}</span>
        <span>Role: ${blogRole}</span>
        <span>Category: ${blogCategory}</span>
        <div class="blog__icon">
                <button class="btnlike">
                    <i class="bi bi-heart"></i>
                </button>
                <input type="text" class="inputlike" value="0">
                <button class="btndislike">
                    <i class="bi bi-heart-fill"></i>
                </button>
                <input type="text" class="inputdislike" value="0">
                <div class="comment">
                    <textarea id="content__comment" placeholder="Add Your Comment Here"></textarea>
                    <div class="btn__comment">
                        <button>Cancel</button>
                        <input type="submit" value="Comment">
                    </div>
                </div>
        </div>
    </div>  `
        document.getElementById('content__list--blog').innerHTML = table
    
    }
}

var show = document.getElementById('createpost')
var overplay =  document.getElementById('overplay')
var tabShow = document.getElementById('show')
var btnBack= document.getElementById('btn-back')
var btnPrimary = document.getElementById('btn-primary')
function clickOn(){
    overplay.style.display = 'block'
    tabShow.style.cssText= `transform: translateY(0); transition: .5s`;
}
function clickOff(){
    overplay.style.display = 'none'
    tabShow.style.cssText= `transform: translateY(-200%); transition: .5s`;
}

show.onclick = function() {
    clickOn()
}

overplay.onclick = function() {
    showAlertCancle()
    showOverplayCancle()
}
btnBack.onclick = function() {
    showAlertCancle()
    showOverplayCancle()
}

btnPrimary.onclick = function() {
    add()
    clickOff()
    showAlertSucces()
    hideTimeOut()
}
 


// show alert

var alertSuccess = document.getElementById('alertSuccess')

function showAlertSucces(){
    alertSuccess.style.cssText = `transform: translatex(350%); transition: .5s`
}
function hideAlertSucces(){
    alertSuccess.style.cssText = `transform: translatex(500%); transition: .5s`
}
let hideAlertS;
function hideTimeOut(){
    hideAlertS = setTimeout(hideAlertSucces,2000)
}

var alertCancle = document.getElementById('alertCancle')
var overplayCancle = document.getElementById('overplayCancle')
var nonCancle = document.querySelector('.nonCancle')
var doCancle = document.querySelector('.doCancle')

function showAlertCancle(){
    alertCancle.style.cssText = `transform: translatey(0); transition: .5s`
}
function hieAlertCancle(){
    alertCancle.style.cssText = `transform: translatey(-300%); transition: .5s`
}
function showOverplayCancle(){
    overplayCancle.style.display = 'block'
}

function hideOverPlayCancle(){
    overplayCancle.style.display = 'none'
}


overplayCancle.onclick = function(){
    hideOverPlayCancle()
    hieAlertCancle()
}

nonCancle.onclick = function(){
    hideOverPlayCancle()
    hieAlertCancle()
}

doCancle.onclick = function(){
    hideOverPlayCancle()
    hieAlertCancle()
    clickOff()
}

