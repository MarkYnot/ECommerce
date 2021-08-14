var Product = require("../models/products");
var Process = require("../models/ProductDataProcess");
const path = require("path");
const fs = require("fs");

// to get lowest stock and best sell data from database
// and send to front end
module.exports.mainPageData = function (req, res) {
  Product.findStock(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      stock = result;
      Product.findBestSell(function (err1, result1) {
        if (err1) {
          console.log(err1);
        } else {
          sell = result1;
          // this step is used to sort product by rating
          rating_result = Process.sortRating(sell);
          final_result = rating_result.slice(0, 5);
          res.send({ stock: stock, sell: final_result });
        }
      });
    }
  });
};

// to search matched product
module.exports.searchResult = function (req, res) {
  searchResult = [];
  var searchTitle = new RegExp(req.query.title);

  Product.find(
    { title: {$regex: searchTitle, "$options":"$i"}, disabled: { $exists: false } },
    function (err, data) {
      searchResult = data;
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
            count: searchResult.length,
            list: searchResult,
          },
        });
      }
    }
  );
};

// to find item by title
module.exports.findItem = function (req, res) {
  // get the title inputed from the paramter of func
  let title = req.query.title;
  Product.findItemDetails(title, function (err, result) {
    if (err) {
      console.log("find item fail");
    } else {
      let item = result;
      res.send({ item: item[0] });
    }
  });
};

// to find userProducts by seller id
module.exports.getUserProducts = function (req, res) {
  let userid = req.query.userid;
  searchResult = [];
  Product.find({ seller: userid }, function (err, data) {
    Result = data;
    console.log(data);
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
          count: Result.length,
          list: Result,
        },
      });
    }
  });
};

// user product id to find product and set disable state
module.exports.disableProduct = function (req, res) {
  let productid = req.query.productid;

  Product.updateOne(
    { _id: productid, disabled: { $exists: false } },
    { $addToSet: { disabled: "" } },
    function (err, data) {
      disableItem = data;

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
            list: disableItem,
          },
        });
      }
    }
  );
};

// find product by product id, and set able state
module.exports.ableProduct = function (req, res) {
  let productid = req.query.productid;

  Product.updateOne(
    { _id: productid },
    { $unset: { disabled: "" } },
    function (err, data) {
      ableItem = data;
      //  console.log(ableItem)
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
            list: ableItem,
          },
        });
      }
    }
  );
};

module.exports.addListing = function (req, res) {
  let title = req.query.title;
  let price = req.query.price;
  let brand = req.query.brand;
  let image = req.query.image;
  let userid = req.query.userid;
  let stock = req.query.stock;

  Product.create({
    title: title,
    brand: brand,
    image: image,
    stock: stock,
    seller: userid,
    price: price,
    reviews: [],
  });

  Product.find({ seller: userid }, function (err, data) {
    Result = data;

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
          count: Result.length,
          list: Result,
        },
      });
    }
  });

  // }
};

module.exports.upload = function (req, res) {
  console.log(req.files);
var name = req.files[0].originalname;

  req.files[0].filename = req.files[0].originalname;
  var newFilename = req.files[0].filename;
  var newDestination = req.files[0].destination + "/" + newFilename;
  console.log(newDestination);

  fs.rename(req.files[0].path, newDestination, function (err) {
    if (err) {
      console.log("uploaded fail:" + err);
      res.send({ flag: false, msg: "fail" });
    } else {
      console.log("uploaded successful");
      res.send({ flag: true, msg: "success", name: name});
    }
  });
};

// find the product by product id and delete
module.exports.deleteUserProduct = function (req, res) {
  let productid = req.query.productid;

  Product.remove({ _id: productid }, function (err, data) {
    deleteResult = data;
    console.log(deleteResult);
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
          list: deleteResult,
        },
      });
    }
  });
};

// find the product by its title and update the quantity after delete
module.exports.deleteNumber = function (req, res) {
  let title = req.query.title;
  let number = req.query.number;

  Product.updateOne(
    { title: title },
    { $set: { stock: number } },
    function (err, data) {
      newstock = data;
      console.log(data);
      if (err) {
        res.json({
          status: "1",
          msg: err.message,
        });
      } else {
        res.json({
          status: "0",
          msg: "",
        });
      }
    }
  );

  Product.findItemDetails(title, function (err, result) {
    if (err) {
      console.log("find item fail");
    } else {
      let item = result;
      console.log(item[0].stock);
    }
  });
};
