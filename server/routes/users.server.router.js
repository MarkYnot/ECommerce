/**
 * This router is used to set request url
 * This file is for any operation of users
 */
module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  // set login url and send the data
  router.get("/login", user.LoginVerif);

  // set signin url and send the data
  router.get("/signin", user.creatAccount);

  // set update profile url and send the data
  router.post("/update", user.updatedProfile);

  //set the changePassword url and send the data
  router.post("/changePassword", user.changePassword);

  // set the sellerName url and send the data
  router.get("/findSellerName", user.matchSeller);

  //set the addItem url and send the data
  router.post("/addItemToUser", user.addCart);

  //set the cartList url and send the data
  router.get("/getCartList", user.getCartList);

  //set the updateItem url and send the data
  router.get("/updateItemNumber", user.updateUserItem);

  //set the deleteItem url and send the data
  router.post("/deleteItem", user.delItemFromCart);


  router.get("/loginVerify", user.LoginVerify);

  // use restful api
  app.use("/api", router);

  
};
