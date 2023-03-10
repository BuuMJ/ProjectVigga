
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
