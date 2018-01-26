'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hotelSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    stars: { type: Number, required: true },
    price: { type: Number, required: true },
    image: String,
    amenities: Array
});

module.exports = mongoose.model('Hotels', hotelSchema);