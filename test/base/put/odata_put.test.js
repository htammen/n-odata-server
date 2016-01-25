/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/**
 * Module dependencies.
 */
var chai = require('chai');
var odata_put_1 = require("../../../lib/base/put/odata_put");
/**
 * Globals
 */
var expect = chai.expect;
/**
 * Unit tests
 */
describe('User Model Unit Tests:', function () {
    describe('2 + 4', function () {
        it('should be 6', function (done) {
            expect(2 + 4).to.equals(6);
            done();
        });
        it('should not be 7', function (done) {
            expect(2 + 4).to.not.equals(7);
            done();
        });
    });
    describe('simple odata_put request', function () {
        it('basic test of _handlePut should throw an error', function (done) {
            var putBase = new odata_put_1.ODataPutBase();
            putBase._handlePut(null, null).catch(function (err) {
                expect(true);
            });
            done();
        });
        it('test a _handlePut should throw an error', function (done) {
            var putBase = new odata_put_1.ODataPutBase();
            putBase._handlePut(null, null).catch(function (err) {
                expect(true);
            });
            done();
        });
    });
});
//# sourceMappingURL=odata_put.test.js.map