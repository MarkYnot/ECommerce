var mongoose = require('mongoose');

// to create a new connection to connect User database
var user = mongoose.createConnection('mongodb://localhost:27017/User')
user.on('error', console.error.bind(console, '... connect error ...'));
user.once('open', function callback() {
    console.info("... db open user database...");
});

module.exports = user;