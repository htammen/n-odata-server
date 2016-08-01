"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var odata_get_1 = require("../../../lib/base/get/odata_get");
var proxyquire = require("proxyquire");
var sinon = require("sinon");
var loopback = require("loopback");
describe("ODataGetBase", function () {
    var odataConfig;
    before(function () {
        chai.use(chaiAsPromised);
        chai.should();
        odataConfig = {
            maxpagesize: 200,
            odataversion: "2",
            odataPrefix: "odata"
        };
    });
    describe("getCollectionData", function () {
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
            var commonsStub = {
                getRequestModelClass: function (models, param) {
                    return Promise.resolve({});
                }
            };
            var sutProxy = proxyquire("../../../lib/base/get/odata_get", { '../../common/odata_common': commonsStub });
            sut = new sutProxy.ODataGetBase();
            var promise = sut._getCollectionData(req, res);
            return promise.should.eventually.be.rejected;
        });
        it("should return an empty result but fulfill the promise", function () {
            var req = {
                url: "http://localhost:3000/Customer?$orderby=quantity",
                app: {
                    models: function () { }
                },
                params: [
                    "one"
                ],
                query: {}
            };
            var res = {
                status: 0,
                set: function (key, value) { }
            };
            var resSpy = sinon.spy(res, 'set');
            var commonsStub = {
                getRequestModelClass: function (models, param) {
                    return Promise.resolve({
                        modelClass: {
                            count: function () { },
                            find: function (filter, callback) { return Promise.resolve([]); },
                        }
                    });
                },
                getBaseURL: function (req) { return "http://localhost:3000"; },
                getPluralForModel: function (ModelClass) { return "Customers"; }
            };
            var requestheaderStub = {
                getPreferHeader: function (req) {
                    return [
                        { 0: "maxpagesize", 1: 50 }
                    ];
                }
            };
            var sutProxy = proxyquire("../../../lib/base/get/odata_get", {
                '../../common/odata_common': commonsStub,
                '../../common/odata_req_header': requestheaderStub
            });
            sut = new sutProxy.ODataGetBase();
            sut.setConfig(odataConfig);
            var promise = sut._getCollectionData(req, res);
            var expectedResult = {
                data: [],
                nextLink: "http://localhost:3000/Customers?$skiptoken=200"
            };
            return Promise.all([
                promise.should.eventually.have.property('data'),
                promise.should.eventually.have.property('nextLink'),
                promise.should.eventually.have.property('nextLink').equals("http://localhost:3000/Customers?$skiptoken=50")
            ]);
        });
        it("should return a unfiltered result set", function () {
            var oModel = loopback.createModel('my-model', { name: String });
            var dataSource = loopback.createDataSource({
                connector: loopback.Memory
            });
            oModel.attachTo(dataSource);
            var req = {
                url: "http://localhost:3000/Customer?$orderby=quantity",
                app: {
                    models: function () { }
                },
                params: [
                    "one"
                ],
                query: {}
            };
            var res = {
                status: 0,
                set: function (key, value) { }
            };
            var resSpy = sinon.spy(res, 'set');
            var commonsStub = {
                getRequestModelClass: function (models, param) {
                    return Promise.resolve({
                        modelClass: oModel
                    });
                },
                getBaseURL: function (req) { return "http://localhost:3000"; },
                getPluralForModel: function (ModelClass) { return "Customers"; }
            };
            var requestheaderStub = {
                getPreferHeader: function (req) {
                    return [
                        { 0: "maxpagesize", 1: 50 }
                    ];
                }
            };
            var sutProxy = proxyquire("../../../lib/base/get/odata_get", {
                '../../common/odata_common': commonsStub,
                '../../common/odata_req_header': requestheaderStub
            });
            sut = new sutProxy.ODataGetBase();
            sut.setConfig(odataConfig);
            var promise = sut._getCollectionData(req, res);
            var expectedResult = {
                data: [],
                nextLink: "http://localhost:3000/Customers?$skiptoken=200"
            };
            return Promise.all([
                promise.should.eventually.have.property('data'),
                promise.should.eventually.have.property('data').to.have.lengthOf(0)
            ]);
        });
    });
    describe("getCollectionCount", function () {
        beforeEach(function () {
        });
        it("should return with bad request error cause param $count is not defined", function () {
            var req = {
                params: [
                    "someWrongParam"
                ]
            };
            var sutProxy = proxyquire("../../../lib/base/get/odata_get", {});
            var sut = new sutProxy.ODataGetBase();
            var promise = sut._getCollectionCount(req, null);
            return promise.should.eventually.be.rejectedWith("Error: bad request");
        });
        it("should return error code 415 cause of wrong accept header", function () {
            var req = {
                app: {
                    models: function () { }
                },
                params: [
                    "$count"
                ],
                accepts: function (type) { return false; }
            };
            var commonsStub = {
                getRequestModelClass: function (models, param) {
                    return Promise.resolve({
                        modelClass: {
                            count: function (filter, fn) { fn(null, 15); }
                        }
                    });
                }
            };
            var sutProxy = proxyquire("../../../lib/base/get/odata_get", {
                '../../common/odata_common': commonsStub
            });
            var sut = new sutProxy.ODataGetBase();
            var promise = sut._getCollectionCount(req, null);
            return promise.should.eventually.be.rejectedWith("415");
        });
        it("should return correct number of records", function () {
            var req = {
                app: {
                    models: function () { }
                },
                params: [
                    "$count"
                ],
                accepts: function (type) {
                    if (type === 'text/plain') {
                        return true;
                    }
                    else
                        return false;
                }
            };
            var commonsStub = {
                getRequestModelClass: function (models, param) {
                    return Promise.resolve({
                        modelClass: {
                            count: function (filter, fn) { fn(null, 15); }
                        }
                    });
                }
            };
            var sutProxy = proxyquire("../../../lib/base/get/odata_get", {
                '../../common/odata_common': commonsStub
            });
            var sut = new sutProxy.ODataGetBase();
            var promise = sut._getCollectionCount(req, null);
            return promise.should.eventually.be.equal(15);
        });
        it("should return an error cause count() threw error", function () {
            var req = {
                app: {
                    models: function () { }
                },
                params: [
                    "$count"
                ],
                accepts: function (type) {
                    if (type === 'text/plain') {
                        return true;
                    }
                    else
                        return false;
                }
            };
            var commonsStub = {
                getRequestModelClass: function (models, param) {
                    return Promise.resolve({
                        modelClass: {
                            count: function (filter, fn) { fn(new Error("this is an error case"), null); }
                        }
                    });
                }
            };
            var sutProxy = proxyquire("../../../lib/base/get/odata_get", {
                '../../common/odata_common': commonsStub
            });
            var sut = new sutProxy.ODataGetBase();
            var promise = sut._getCollectionCount(req, null);
            return promise.should.eventually.be.rejectedWith("Error: this is an error case");
        });
    });
    describe("getServiceDocument", function () {
        beforeEach(function () {
        });
        it("should return an empty service document", function () {
            var req = {
                app: {
                    models: function () { return []; }
                }
            };
            var sut = new odata_get_1.ODataGetBase();
            var promise = sut._getServiceDocument(req, null);
            return Promise.all([
                promise.should.eventually.have.property('data'),
                promise.should.eventually.have.property('data').is.empty
            ]);
        });
        it("should return a service document with n models", function () {
            var req = {
                app: {
                    models: function () {
                        return [
                            { definition: {
                                    settings: {},
                                    name: "Customer"
                                } },
                            { definition: {
                                    settings: {},
                                    name: "Product"
                                } }
                        ];
                    }
                }
            };
            var sut = new odata_get_1.ODataGetBase();
            var promise = sut._getServiceDocument(req, null);
            return Promise.all([
                promise.should.eventually.have.property('data'),
                promise.should.eventually.have.property('data').not.is.empty,
                promise.should.eventually.have.property('data').to.have.lengthOf(2),
                promise.should.eventually.to.have.deep.property('data[0].name', "Customers"),
                promise.should.eventually.to.have.deep.property('data[1].name', "Products")
            ]);
        });
        it("should return a service document with n models where the plural of the model gets read from model.definition.settings", function () {
            var req = {
                app: {
                    models: function () {
                        return [
                            { definition: {
                                    settings: { plural: "People" },
                                    name: "Person"
                                } },
                            { definition: {
                                    settings: { plural: "Plural" },
                                    name: "Single"
                                } },
                            { definition: {
                                    settings: { plural: "MoreProducts" },
                                    name: "Product"
                                } }
                        ];
                    }
                }
            };
            var sut = new odata_get_1.ODataGetBase();
            var promise = sut._getServiceDocument(req, null);
            return Promise.all([
                promise.should.eventually.have.property('data'),
                promise.should.eventually.have.property('data').not.is.empty,
                promise.should.eventually.have.property('data').to.have.lengthOf(3),
                promise.should.eventually.to.have.deep.property('data[0].name', "People"),
                promise.should.eventually.to.have.deep.property('data[1].name', "Plural"),
                promise.should.eventually.to.have.deep.property('data[2].name', "MoreProducts")
            ]);
        });
    });
});
//# sourceMappingURL=odata_get.test.js.map