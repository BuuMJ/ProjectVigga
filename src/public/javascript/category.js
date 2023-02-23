document.querySelector('#category-list').addEventListener('click', (e) =>{
    target = e.target;
    if(target.classList.contains('category-btn__remove')){
        target.parentElement.parentElement.remove();
    }
})
function clearFields(){
    document.querySelector('#category-name').value = "";
}

//add data
var data = [];
function addCategory() {
var categoryName = document.getElementById('category-name').value;
var categoryList = {
    Name: categoryName
}
if(categoryName == ""){
    alert('enter category name')
}
if(categoryName.length > 80){
    alert('too long for content idea')
    return
}
else{
    data.push(categoryList)
    console.log(categoryList)
    renderCategory();
}
function renderCategory(){
    list = "";
    for(var i = 0; i < data.length; i++)
    list += `
            <tr>
                <td>${data[i].Name}</td>
                <td>
                    <a class="category-btn__edit" href="#">Edit</a>
                    <a class="category-btn__remove" href="#">Remove</a>
                </td>
            </tr>
    `
}
document.getElementById('category-list').innerHTML = list;
}
document.querySelector('#push').onclick = function(){
addCategory()
clearFields()
}