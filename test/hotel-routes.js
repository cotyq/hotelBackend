'use strict';
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose"),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = require('chai').should(),
    config = require('config');

var Hotel = require('../api/models/hotelModel');

chai.use(chaiHttp);
var url = 'http://localhost:3000';

describe('Hotel', function () {
    describe('Hotel REST tests', function() {
        var hotelsCount = 0, hotelBeebop1ID, hotelBeebop2ID;
        it('should list ALL hotels on /hotel GET', function (done) {
            chai.request(url)
                .get('/hotel')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    hotelsCount = res.body.length;
                    done();
                })
        });
        it('should add a SINGLE hotel with name Hotel Beebop on /hotel POST', function (done) {
            let hotel = {
                "id": "3222",
                "name": "Hotel Beebop",
                "stars": 5,
                "price": 994.18,
                "image": "4900059_30_b.jpg",
                "amenities": [
                    "safety-box",
                    "nightclub",
                    "deep-soaking-bathtub",
                    "beach",
                    "business-center"
                ]
            };
            chai.request(url)
                .post('/hotel')
                .send(hotel)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    hotelBeebop1ID = res.body._id;
                    done();
                })
        });
        it('should add a SINGLE hotel with name Hotel Beebop II on /hotel POST', function (done) {
            let hotel = {
                "id": "3222",
                "name": "Hotel Beebop II",
                "stars": 3,
                "price": 994.18,
                "image": "4900059_30_b.jpg",
                "amenities": [
                    "safety-box",
                    "nightclub",
                    "deep-soaking-bathtub",
                    "beach",
                    "business-center"
                ]
            };
            chai.request(url)
                .post('/hotel')
                .send(hotel)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    hotelBeebop2ID = res.body._id;
                    done();
                })
        });
        it('should list ALL hotels on /hotel GET. There must be two more element', function (done) {
            chai.request(url)
                .get('/hotel')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(hotelsCount + 2);
                    done();
                })
        });
        it('should list ALL hotels containing Beebop it its name (2 elements)', function (done) {
            chai.request(url)
                .get('/hotel')
                .query({name: 'Beebop'})
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                })
        });
        it('should list ALL hotels containing bEEbop it its name (case insensitive)', function (done) {
            chai.request(url)
                .get('/hotel')
                .query({name: 'bEEbop'})
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                })
        });
        it('should list ALL hotels containing Beebop it its name and that have 3 stars', function (done) {
            chai.request(url)
                .get('/hotel')
                .query({name: 'bEEbop', stars: [3]})
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                })
        });
        it('should list ALL hotels containing Beebop it its name and that have 3 or 5 stars', function (done) {
            chai.request(url)
                .get('/hotel')
                .query({name: 'bEEbop', stars: [3, 5]})
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                })
        });
        it('should delete hotel Beebop 1 by id on /hotel DELETE', function (done) {
            chai.request(url)
                .delete('/hotel/' + hotelBeebop1ID)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });
        it('should delete hotel Beebop 2 by id on /hotel DELETE', function (done) {
            chai.request(url)
                .delete('/hotel/' + hotelBeebop2ID)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });
        it('should list ALL hotels containing Beebop it its name (0 elements)', function (done) {
            chai.request(url)
                .get('/hotel')
                .query({name: 'Beebop'})
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                })
        });
    });

});
