const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('Should correctly read a whole number input', () => {
        assert.equal(convertHandler.getNum('1kg'), 1)
    })

    test('Should correctly read a decimal number input', () => {
        assert.equal(convertHandler.getNum('1.2kg'), 1.2)
    })

    test('Should correctly read a fractional input', () => {
        assert.equal(convertHandler.getNum('1/2kg'), 0.5)
    })

    test('Should correctly read a fractional input with a decimal', () => {
        assert.equal(convertHandler.getNum('1/0.5kg'), 2)
        assert.equal(convertHandler.getNum('0.5/2kg'), 0.25)
    })

    test('Should correctly return an error on double-fraction (i.e. 3/2/3)', () => {
        assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number')
    })

    test('Should correctly default to a numerical input of 1 when no numerical input is provided', () => {
        assert.equal(convertHandler.getNum('kg'), 1)
    })

    test('Should correctly read each valid input unit', () => {
        assert.equal(convertHandler.getUnit('gal'), 'gal')
        assert.equal(convertHandler.getUnit('L'), 'L')
        assert.equal(convertHandler.getUnit('mi'), 'mi')
        assert.equal(convertHandler.getUnit('km'), 'km')
        assert.equal(convertHandler.getUnit('lbs'), 'lbs')
        assert.equal(convertHandler.getUnit('kg'), 'kg')
    })

    test('Should correctly return an error for an invalid input unit', () => {
        assert.equal(convertHandler.getUnit('pad'), 'invalid unit')
    })

    test('Should return the correct return unit for each valid input unit', () => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    })

    test('Should correctly return the spelled-out string unit for each valid input unit', () => {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        assert.equal(convertHandler.spellOutUnit('L'), 'liters')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    })

    test('Should correctly convert gal to L', () => {
        assert.equal(convertHandler.convert('4', 'gal'), 15.14164)
    })

    test('Should correctly convert L to gal', () => {
        assert.equal(convertHandler.convert('3', 'L'), 0.79252)
    })

    test('Should correctly convert mi to km', () => {
        assert.equal(convertHandler.convert('5', 'mi'), 8.04670)
    })

    test('Should correctly convert km to mi', () => {
        assert.equal(convertHandler.convert('2', 'km'), 1.24275)
    })

    test('Should correctly convert lbs to kg', () => {
        assert.equal(convertHandler.convert('7', 'lbs'), 3.17514)
    })

    test('Should correctly convert kg to lbs', () => {
        assert.equal(convertHandler.convert('1', 'kg'), 2.20462)
    })
});