/// <reference path="../../../typings/index.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import {ODataPutBase} from "../../../lib/base/put/odata_put";

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', () => {

    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });

        it('should not be 7', (done) => {
            expect(2 + 4).to.not.equals(7);
            done();
        });
    });

    describe('simple odata_put request', () => {
        it('basic test of _handlePut should throw an error', (done) => {
            var putBase: ODataPutBase = new ODataPutBase();
            putBase._handlePut(null, null).catch(function(err) {
                expect(true);
            });
            done();
        });

        it('test a _handlePut should throw an error', (done) => {
            var putBase: ODataPutBase = new ODataPutBase();
            putBase._handlePut(null, null).catch(function(err) {
                expect(true);
            });
            done();
        })
    });
});
