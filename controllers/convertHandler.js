function ConvertHandler() {
  let regexNumber = /\d+(\.\d+)?(\/\d+(\.\d+)?)?/g
  let regexUnit = /\w+/g
  let validUnit = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']

  this.getNum = function (input) {
    let result;

    let number = input.match(regexNumber)

    if (number === null) {
      let unit = this.getUnit(input)
      if (unit && unit !== 'invalid unit') {
        return 1
      }
    } else if (number.length > 1) {
      return 'invalid number'
    }
    result = eval(number[0])

    return result;
  };

  this.getUnit = function (input) {
    let result;
    let unit = input.match(regexUnit)

    if (unit === null) {
      return 'invalid unit'
    }

    if (validUnit.includes(unit[0])) {
      result = unit[0]
    } else {
      return 'invalid unit'
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    const returnUnit = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    }
    result = returnUnit[initUnit]

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    const spelledOutUnit = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    }
    result = spelledOutUnit[unit]

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lToGal = 0.26417;
    const lbsToKg = 0.453592;
    const kgToLbs = 2.20462;
    const miToKm = 1.60934;
    const kmToMi = 0.62137;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL
        break
      case 'L':
        result = initNum * lToGal
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'km':
        result = initNum * kmToMi
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'kg':
        result = initNum * kgToLbs
        break
      default:
        throw new Error('Incorrect Unit')
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };

}

module.exports = ConvertHandler;
