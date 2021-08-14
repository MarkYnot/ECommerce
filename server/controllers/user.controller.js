const e = require("express");
var User = require("../models/users");
var Product = require("../models/products");
const mongoose = require("mongoose");
var BSON = require("bson");
const user = require("../models/User.db");

// this file is used to control user any user operation
// such as login and sign ins

module.exports.LoginVerif = function (req, res) {
  // get the username and password from front end
  let username = req.query.username;
  let password = req.query.password;

  // use findUserAccount function to check if database already has this user
  User.findUserAccount(username, password, function (err, result) {
    if (err) {
      console.log("Cannot find account");
    } else {
      let user = result;
      console.log(result);
      if (user.length == 0) {
        res.send({
          message: "Your account or password is not correct",
          checked: false,
        });
      } else {
        res.send({ user: user, checked: true });
      }
    }
  });
};

// create a new user
module.exports.creatAccount = function (req, res) {
  // get username, password, firstname and lastname from front end
  let username = req.query.username;
  let password = req.query.password;
  let firstname = req.query.firstname;
  let lastname = req.query.lastname;
  // make sure the data got from front end has correct format
  if (!username.includes("@")) {
    res.send({
      message: "the format of email addres is not correct",
      checked: false,
    });
  } else if (password == "") {
    res.send({
      message: "Password,firstname or lastname cannot be empty",
      checked: false,
    });
  } else if (firstname == "") {
    res.send({
      message: "Password,firstname or lastname cannot be empty",
      checked: false,
    });
  } else if (lastname == "") {
    res.send({
      message: "Password,firstname or lastname cannot be empty",
      checked: false,
    });
    // if data all has correct foramt, go this step
  } else {
    // check if current username is in database
    User.findExistingUser(username, function (err, result) {
      if (err) {
        console.log("Cannot find account");
      } else {
        let user = result;
        // if user is null, create a new username
        if (user.length == 0) {
          id = BSON.ObjectId();
          User.create({
            _id: id,
            email: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
          });
          res.send({
            firstname: firstname,
            lastname: lastname,
            username: username,
            id: id,
            checked: true,
          });
        } else {
          // if user is not null, send the error message
          res.send({
            message: "The username is already sign in",
            checked: false,
          });
        }
      }
    });
  }
};

// used to match seller
module.exports.matchSeller = function (req, res) {
  // get id from frontend
  let id = req.query.id;

  User.matchUserName(id, function (err, result) {
    if (err) {
      console.log("Cannot find match name");
    } else {
      let user = result;
      res.send({ user: user });
    }
  });
};

module.exports.updatedProfile = function (req, res) {
  // get firstname, lastname, username and userid from frontend
  let firstname = req.query.firstname;
  let lastname = req.query.lastname;
  let username = req.query.username;
  let userid = req.query.userid;

  User.updateOne(
    { _id: userid },
    { $set: { firstname: firstname, lastname: lastname, email: username } },
    function (err, data) {
      updatedInfo = data;
      console.log(updatedInfo);
      if (err) {
        res.json({
          status: "1",
          msg: err.message,
        });
      } else {
        res.json({
          status: "0",
          msg: "",
          result: {
            list: updatedInfo,
          },
        });
      }
    }
  );
};

module.exports.changePassword = function (req, res) {
  // get username and password from front end
  let username = req.query.username;
  let password = req.query.password;

  User.updateOne(
    { email: username },
    { $set: { password: password } },
    function (err, data) {
      newPassword = data;
      if (err) {
        res.json({
          status: "1",
          msg: err.message,
        });
      } else {
        res.json({
          status: "0",
          msg: "",
          result: {
            list: newPassword,
          },
        });
      }
    }
  );
};

module.exports.addCart = function (req, res) {
  let firstname = req.query.firstname;
  let lastname = req.query.lastname;
  let productTitle = req.query.productTitle;
  let numberInput = parseInt(req.query.number);
  //console.log(numberInput);
  //console.log(Object.prototype.toString.call(numberInput));

  User.findOne(
    { firstname: firstname, lastname: lastname },
    function (err, userDoc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message,
        });
      } else {
        if (userDoc) {
          // used to delete manually
          // userDoc.cartList.forEach(function (item) {
          //   item.addQuantity = 0;
          // });
          // userDoc.cartList.splice(0, 1);
          // userDoc.save(function (err2, doc2) {
          //   if (err2) {
          //     console.log("delete faile");
          //   }
          // });
          // console.log("after delete" + userDoc);
          // console.log(userDoc.cartList.length);
          //
          // core add logic
          let productItem = "";
          userDoc.cartList.forEach(function (item) {
            if (item.title == productTitle) {
              //find item exist in the cartlist
              productItem = item;
              item.addQuantity = item.addQuantity + numberInput;
            }
          });
          if (productItem) {
            //if the item exist, save
            userDoc.save(function (err2, doc2) {
              if (err2) {
                res.json({
                  status: "1",
                  msg: err.message,
                });
              }
              console.log(userDoc.cartList);
              console.log(userDoc.cartList.length);
            });
          } else {
            //if the item not in the cartlist
            Product.findOne({ title: productTitle }, function (err1, doc) {
              if (err1) {
                res.json({
                  status: "1",
                  msg: err.message,
                });
              } else {
                doc.addQuantity = numberInput;
                userDoc.cartList.push(doc);
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    console.log("save fail");
                  }
                });
                console.log(userDoc.cartList);
                console.log(userDoc.cartList.length);
              }
            });
          }
        }
      }
    }
  );
};

module.exports.getCartList = function (req, res) {
  let firstname = req.query.firstname;
  let lastname = req.query.lastname;

  User.findOne(
    { firstname: firstname, lastname: lastname },
    function (err, userDoc) {
      if (err) {
        console.log("match user fail");
      } else {
        let userInfo = userDoc;
        let list = userInfo.cartList;
        console.log(list);
        //send the cart list data to the front end
        res.send({ cartlist: list });
      }
    }
  );
};

module.exports.updateUserItem = function (req, res) {
  let firstname = req.query.firstname;
  let lastname = req.query.lastname;
  let productTitle = req.query.title;
  let newnumber = parseInt(req.query.newnumber);

  console.log("receive request of update");
  console.log(newnumber);

  User.findOne(
    { firstname: firstname, lastname: lastname },
    function (err, userDoc) {
      if (err) {
        console.log("match user fail");
      } else {
        for (let i = 0; i < userDoc.cartList.length; i++) {
          if (userDoc.cartList[i].title == productTitle) {
            userDoc.cartList[i].addQuantity = newnumber;
          }
        }
        userDoc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: "1",
              msg: err.message,
              result: "",
            });
          } else {
            console.log("update suc");
            res.json({
              status: "0",
              result: "suc",
            });
          }
        });
      }
    }
  );

  // User.updateOne(
  //   {
  //     firstname: firstname,
  //     lasname: lastname,
  //     "cartList.title": productTitle,
  //   },
  //   { $set: { "cartList.$.addQuantity": newnumber } },
  //   function (err, data) {
  //     if (err) {
  //       res.json({
  //         status: "1",
  //         msg: err.message,
  //         result: "",
  //       });
  //     } else {
  //       console.log("update suceess");
  //       res.json({
  //         status: "0",
  //         result: "suc",
  //       });
  //     }
  //   }
  // );
};

module.exports.delItemFromCart = function (req, res) {
  let firstname = req.query.firstname;
  let lastname = req.query.lastname;
  let title = req.query.title;
  console.log("receive dele req");

  User.updateOne(
    { firstname: firstname, lastname: lastname },
    { $pull: { cartList: { title: title } } },
    function (err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message,
          result: "",
        });
      } else {
        console.log("suceess");
        res.json({
          status: "0",
          result: "suc",
        });
      }
    }
  );
};

module.exports.LoginVerify = function (req, res) {
  // get the username and password from front end
  let userid = req.query.userid;
  let password = req.query.password;

  // use findUserAccount function to check if database already has this user
  User.findOne(
    { _id: userid, password: password}, function (err, userDoc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message,
        });
      } else {
        res.json({
          status: "0",
          msg: "",
          result: {
            list:userDoc
          },
        });
      }

    
  })

}
