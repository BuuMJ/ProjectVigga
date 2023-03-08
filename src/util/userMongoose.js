module.exports = {
  mutipleMongooseToObject: function (mongoose) {
    return mongoose.map((mongoose) => mongoose.toObject());
  },
  userMongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
