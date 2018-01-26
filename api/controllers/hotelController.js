'use strict';

var _ = require('lodash');
var hotelData = require('../../mock-data/data.json');
var mongoose = require('mongoose'),
    Hotel = mongoose.model('Hotels');

exports.getHotels = function (req, res) {
    var stars = _.split(req.query.stars,',');
    var name = _.toLower(req.query.name);
    var query  = {};

    if(req.query.stars && stars.length) query.stars = { $in: stars };
    if(name !== undefined) query.name = { $regex: '.*' + name + '.*', $options: "i" };

    Hotel.find(query)
        .exec(function (error, hotel) {
            if(error) res.send(error);
            res.json(hotel);
        });
};

exports.getHotel = function (req, res) {
    Hotel.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.createHotel = function(req, res) {
    var new_hotel = new Hotel(req.body);
    new_hotel.save(function(err, hotel) {
        if (err)
            res.send(err);
        res.json(hotel);
    });
};

exports.updateHotel = function(req, res) {
    Hotel.findByIdAndUpdate(req.params.id, req.body, function (err, hotel) {
        if (err) return next(err);
        res.json(hotel);
    });
};

exports.deleteHotel = function(req, res, next) {
    Hotel.findByIdAndRemove(req.params.id, req.body, function (err, hotel) {
        if (err) return next(err);
        res.json(hotel);
    });
};

exports.resetDB = function (req, res) {
    Hotel.remove({}).exec();

    // Populate from data.json
    for( var i = 0; i < hotelData.length; i++ ) {
        new Hotel( hotelData[ i ] ).save();
    }

    console.log("DB reset");
    res.json();
};
