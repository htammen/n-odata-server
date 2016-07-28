"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var proxyquire = require("proxyquire");
describe("ODataGetBase", function () {
    before(function () {
        chai.use(chaiAsPromised);
        chai.should();
    });
    describe("_getCollectionData", function () {
        var sut;
        beforeEach(function () {
        });
        it("should be rejected cause no ModelClass can be found", function () {
            var req = {
                url: "http://localhost:3000/Customer?$orderby=quantity",
                app: {
                    models: function () { }
                },
                params: [
                    "one"
                ]
            };
            var res = {
                status: 0
            };
            var commonsStub = {};
            commonsStub.getRequestModelClass = function (models, param) {
                return Promise.resolve({});
            };
            var sutProxy = proxyquire("../../../lib/base/get/odata_get", { '../../common/odata_common': commonsStub });
            sut = new sutProxy.ODataGetBase();
            var promise = sut._getCollectionData(req, res);
            return promise.should.eventually.be.rejected;
        });
    });
});
//# sourceMappingURL=odata_get.test.js.map