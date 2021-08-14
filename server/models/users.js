var user = require("./User.db");
var mongoose = require("mongoose");

// create a User schema
var UserSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    cartList: [
      {
        title: String,
        image: String,
        price: Number,
        stock: Number,
        addQuantity: Number,
      },
    ],
  },
  {
    versionKey: false,
  }
);

// this function is used to use id to check user
UserSchema.statics.matchUserName = function (id, callback) {
  return this.find({ _id: id }).exec(callback);
};

// this function is used to use email and password to find user
UserSchema.statics.findUserAccount = function (email, password, callback) {
  return this.find({ password: password, email: { $in: email } }).exec(
    callback
  );
};

UserSchema.statics.findExistingUser = function(email,callback){
  return this.find({email: email}).exec(callback)
}

//this function is used to use firstname and lastname to find user
UserSchema.statics.findUserByName = function (firstname, lastname, callback) {
  return this.find({ firstname: firstname, lastname: lastname }).exec(callback);
};

var User = user.model("User", UserSchema);

module.exports = User;
