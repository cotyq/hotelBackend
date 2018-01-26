'use strict';
module.exports = function (app) {
    var hotelController = require('../controllers/hotelController');

    app.route('/hotel')
        .get(hotelController.getHotels)
        .post(hotelController.createHotel);

    app.route('/hotel/:id')
        .get(hotelController.getHotel)
        .put(hotelController.updateHotel)
        .delete(hotelController.deleteHotel);

    app.route('/reset-db').post(hotelController.resetDB);
};