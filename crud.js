
var data = []
function add(){
    var blogTitle = document.getElementById("title").value
    var blogContent = document.getElementById("content").value
    var blogRole = document.getElementById("chooserole").value
    var blogCourse = document.getElementById("choosecourse").value
    // var blogDeadlineFirst = document.getElementById("deadlinefirst").value
    // var blogDeadlineSecond = document.getElementById("deadlinesecond").value
    var blogItem = {
        Title: blogTitle,
        Content: blogContent,
        Role: blogRole,
        Course: blogCourse,
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
        <span>Course: ${blogCourse}</span>
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


function clickOn(){
    document.getElementById('overplay').style.display = 'block';
    document.getElementById('show').style.display = 'block';
}
function clickOff(){
    document.getElementById('overplay').style.display = 'none';
    document.getElementById('show').style.display = 'none';
}