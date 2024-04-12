'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input
    const number = convertHandler.getNum(input)
    const unit = convertHandler.getUnit(input)

    if (number == 'invalid number' && unit == 'invalid unit') {
      const result = 'invalid number and unit'
      return res.status(200).send(result)
    } else if (number == 'invalid number') {
      return res.status(200).send(number)
    } else if (unit == 'invalid unit') {
      return res.status(200).send(unit)
    }

    const returnUnit = convertHandler.getReturnUnit(unit)
    const convertedValue = convertHandler.convert(number, unit)
    const convertString = convertHandler.getString(number, unit, convertedValue, returnUnit)

    const result = { initNum: number, initUnit: unit, returnNum: convertedValue, returnUnit, string: convertString }

    res.status(200).send(result)
  })
};
