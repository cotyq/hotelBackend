var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Hotel = require('./api/models/hotelModel'),
    bodyParser = require('body-parser');

var config = require('config');

var cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB connected!");
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(cors());

var routes = require('./api/routes/hotelRoutes');
routes(app);

app.listen(port);

console.log('Hotel API server started on: ' + port);