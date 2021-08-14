var product = require("./Product.db");
var mongoose = require("mongoose");

// create a ProductSchema
var ProductSchema = new mongoose.Schema(
  {
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    reviews: Array,
    disabled: String,
    addQuantity: Number,
  },
  {
    versionKey: false,
  }
);

// this function is used to find the lowest stock
ProductSchema.statics.findStock = function (callback) {
  return this.find({ stock: { $gte: 1 }, disabled: { $exists: false } })
    .sort({ stock: 1 })
    .limit(5)
    .exec(callback);
};

// this function is used to find which product has more than two reviews
ProductSchema.statics.findBestSell = function (callback) {
  return this.find({
    reviews: { $exists: true },
    $where: "this.reviews.length>2",
    disabled: { $exists: false },
  }).exec(callback);
};

// this function is used to find item detail
ProductSchema.statics.findItemDetails = function (title, callback) {
  return this.find({ title: title }).exec(callback);
};

var Product = product.model("Product", ProductSchema, "products");

module.exports = Product;
