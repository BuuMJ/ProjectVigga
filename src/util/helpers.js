
const Handlebars = require('handlebars');
module.exports = {
  getName: function (user) {
    return user.username;
  },
  getRole: function (user) {
    return user.role;
  },
  getFullname: function (user) {
    return user.fullname;
  },
  getEmail: function (user) {
    return user.adremail;
  },
  getDepartment: function (user) {
    return user.department;
  },
  getIdIdea: function (ididea) {
    if(ididea){
      return ididea;
    }else{
      return 'aaaaâ';
    }
  },
  getAvatar: function (user) {
    if (user && user.avatar) {
      return `/avatar/${user.avatar}`;
    } else {
      return "/img/profileimg.jpeg";
    }
  },
  getAvataraccount: function (account) {
    if (account && account.avatar) {
      return `/avatar/${account.avatar}`;
    } else {
      return "/img/profileimg.jpeg";
    }
  },
  getFileimg: function(idea) {
    if (idea && idea.file) {
        var ext = idea.file.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].indexOf(ext) !== -1) { 
            return new Handlebars.SafeString('<img class="file-detail__img" src="' + '/'+idea.submission+'/'+idea.file + '" alt="">');
        } else { 
            return new Handlebars.SafeString('<div class="link__file"><span>File:</span> <a class="file-detail" href="' + '/'+idea.submission+'/'+ idea.file + '">' + idea.file + '</a></div>');
        }
    } else {
        return new Handlebars.SafeString("");
    }
},
  ifeq: function (user, y, options) {
    // console.log(user)
    var currentRole = user == undefined ? "" : user.role;
    // console.log(currentRole)
    // console.log(y)
    if (currentRole === y) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
};
