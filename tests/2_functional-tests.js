const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    this.timeout(5000)

    test('Convert a valid input such as 10L: GET request to /api/convert', () => {
        chai.request(server).keepOpen().get('/api/convert?input=10L').end(function (err, res) {
            assert.equal(res.status, 200)
            assert.fail()
        })
    })

    test('Convert an invalid input such as 32g: GET request to /api/convert', () => {
        chai.request(server).keepOpen().get('/api/convert?input=32g').end(function (err, res) {
            assert.equal(res.status, 200)
            assert.fail()
        })
    })

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', () => {
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kg').end(function (err, res) {
            assert.equal(res.status, 400)
        })
    })

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', () => {
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kilomegagram').end(function (err, res) {
            assert.equal(res.status, 400)
        })
    })

    test('Convert with no number such as kg: GET request to /api/convert', () => {
        chai.request(server).keepOpen().get('/api/convert?input=kg').end(function (err, res) {
            assert.equal(res.status, 400)
        })
    })
});
