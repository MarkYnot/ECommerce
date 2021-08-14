var mongoose = require('mongoose');

// to create a new connection to connect Product database
var product = mongoose.createConnection('mongodb://localhost:27017/Product')
product.on('error', console.error.bind(console, '... connect error ...'));
product.once('open', function callback() {
    console.info("... db open product database...");
});

module.exports = product;

