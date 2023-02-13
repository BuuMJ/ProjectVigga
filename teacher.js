var dataComment = [];

function addComment(index, comment) {
  dataComment[index].comments.push(comment);
}

function renderStatus(index) {
  var status = dataComment[index];
  var commentsHtml = "";
  for (var i = 0; i < status.comments.length; i++) {
    commentsHtml += `<div class="comment">${status.comments[i]}</div>`;
  }
  document.getElementById("status-comments-" + index).innerHTML = commentsHtml;
}

function addStatus() {
  var statusText = document.getElementById("status-text").value;
  var newStatus = { text: statusText, comments: [] };
  dataComment.push(newStatus);
  renderStatusList();
}

function renderStatusList() {
  var statusListHtml = "";
  for (var i = 0; i < dataComment.length; i++) {
    statusListHtml += `
      <div class="status">
        <div class="status-text">${dataComment[i].text}</div>
        <div id="status-comments-${i}"></div>
        <input type="text" id="comment-${i}" placeholder="Add a comment">
        <button onclick="addComment(${i}, document.getElementById('comment-${i}').value); renderStatus(${i});">Comment</button>
      </div>
    `;
  }
  document.getElementById("status-list").innerHTML = statusListHtml;
}