/**
 * This router is used to set request url
 * This file is for any operation of products
 */
module.exports = (app) => {
  const product = require("../controllers/product.controller");

  var router = require("express").Router();

  //middleware for uploading image
  const multer = require('multer');
  const fs = require('fs');
   
  //set destination of the upload image  
  let uploadDir =`..//./client/public/static/`;
    fs.mkdirSync(uploadDir,{recursive:true});
    let upload = multer({dest:uploadDir});
     router.use(upload.any())

  // set the homepage request url and send data
  router.post("/", product.mainPageData);

  // set findTitle request url and send the data
  router.get("/findByTitle", product.searchResult);

  // set getUserProducts request url and send the data
  router.get("/getUserProducts", product.getUserProducts);

  // set getItemDetails request url and send the data
  router.post("/getItemDeatils", product.findItem);

  // set disableProduct request url and send the data
  router.get("/disableProduct", product.disableProduct);

  // set ableProduct request url and send the data
  router.get("/ableProduct", product.ableProduct);

  // set addListing request url and send the data
  router.post("/addListing", product.addListing);
  
  //upload the image
  router.post("/upload", product.upload);

  // set deleteUserProduct request url and send the data
  router.get("/deleteUserProduct", product.deleteUserProduct);

  // set the deleteProductStock request url and send the data
  router.post("/deleteProductNumber", product.deleteNumber);

  // use restful api
  app.use("/api", router);
};
