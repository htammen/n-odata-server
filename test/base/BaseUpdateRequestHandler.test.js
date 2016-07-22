"use strict";
var chai = require("chai");
var chai_1 = require("chai");
var BaseUpdateRequestHandler_1 = require("../../lib/base/BaseUpdateRequestHandler");
var chaiAsPromised = require("chai-as-promised");
var lb_constants = require("../../lib/constants/loopback_constants");
describe("BaseUpdateRequestHandler", function () {
    before(function () {
        chai.use(chaiAsPromised);
    });
    describe("_getIdOfNewOwner", function () {
        var sut = new BaseUpdateRequestHandler_1.BaseUpdateRequestHandler();
        before(function () {
        });
        it("should return the id of Customers cause pluralModelName is defined on modelTo of Relation", function () {
            var uri = "http://0.0.0.0:3000/odata/Customers(3)";
            var relDefinition = {
                modelTo: {
                    modelName: "Customer",
                    pluralModelName: "Customers"
                }
            };
            chai_1.expect(sut._getIdOfNewOwner(uri, relDefinition)).is.equal("3");
        });
        it("should return the id of Customers cause modelName is defined on modelTo of Relation", function () {
            var uri = "http://0.0.0.0:3000/odata/Customers(3)";
            var relDefinition = {
                modelTo: {
                    modelName: "Customer"
                }
            };
            chai_1.expect(sut._getIdOfNewOwner(uri, relDefinition)).is.equal("3");
        });
        it("should return undefined cause uri is a collection uri", function () {
            var uri = "http://0.0.0.0:3000/odata/Customers";
            var relDefinition = {
                modelTo: {
                    modelName: "Customer",
                    pluralModelName: "Customers"
                }
            };
            chai_1.expect(sut._getIdOfNewOwner(uri, relDefinition)).to.be.undefined;
        });
        it("should return undefined cause neither modelName nor pluralModelName are defined on modelTo of Relation", function () {
            var uri = "http://0.0.0.0:3000/odata/Customers(3)";
            var relDefinition = {
                modelTo: {}
            };
            chai_1.expect(sut._getIdOfNewOwner(uri, relDefinition)).to.be.undefined;
        });
    });
    describe("_upsertInlineRelations()", function () {
        var ModelClassCustomer = {};
        var ModelClassProduct = {};
        var ModelClassCategory = {};
        var reqObjContacts = {};
        var reqObjProducts = {};
        var reqObjCategory = {};
        var sut = new BaseUpdateRequestHandler_1.BaseUpdateRequestHandler();
        before(function () {
            sut._getIdOfNewOwner = function (uri, reldefinition) {
                return "newId";
            };
            ModelClassCustomer.relations = {
                contacts: {
                    type: lb_constants.LB_REL_BELONGSTO,
                    keyFrom: 12
                }
            };
            ModelClassProduct.relations = {
                details: {
                    type: lb_constants.LB_REL_HASONE,
                    keyFrom: 12
                }
            };
            reqObjContacts = {
                contacts: {
                    __metadata: {
                        uri: "abc"
                    }
                }
            };
            reqObjProducts = {
                details: {
                    __metadata: {
                        uri: "abc"
                    }
                }
            };
            reqObjCategory = {
                products: [
                    {
                        id: "abc",
                        __metadata: {
                            uri: "abc"
                        }
                    }
                ]
            };
        });
        beforeEach(function () {
            ModelClassCategory.relations = {
                products: {
                    type: lb_constants.LB_REL_HASMANY,
                    keyFrom: 12,
                    modelTo: {
                        getIdName: function () { return "id"; }
                    }
                }
            };
        });
        it("should return a rejected promise cause no parameter is defined", function () {
            return chai_1.expect(sut._upsertInlineRelations(null, null, null)).to.be.rejected;
        });
        it("should return a rejected promise cause first parameter is not defined", function () {
            return chai_1.expect(sut._upsertInlineRelations(null, { relations: {} }, {})).to.be.rejected;
        });
        it("should return a fulfilled promise cause all parameters are defined even if they are empty", function () {
            return chai_1.expect(sut._upsertInlineRelations({}, { relations: {} }, {})).to.eventually.equal(204);
        });
        it("checks the belongsTo funcitionality with linked relation definition and should return a fulfilled promise", function () {
            var instance = {
                getId: function () { return "abc"; },
                updateAttribute: function (keyFrom, id) {
                    return Promise.resolve({});
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCustomer, reqObjContacts)).to.eventually.equal(204);
        });
        it("checks the belongsTo funcitionality with linked relation definition and should return a rejected promise", function () {
            var instance = {
                getId: function () { return "abc"; },
                updateAttribute: function (keyFrom, id) {
                    return Promise.reject({});
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCustomer, reqObjContacts)).to.be.rejected;
        });
        it("checks the hasOne functionality with inline relation definition. Should return a fulfilled promise", function () {
            var instance = {
                getId: function () {
                    return "abc";
                },
                details: {
                    update: function (relation) {
                        return Promise.resolve({
                            getId: function () {
                                return "32";
                            }
                        });
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassProduct, reqObjProducts)).to.eventually.equal(204);
        });
        it("checks the hasOne functionality with inline relation definition. Should return a rejected promise", function () {
            var instance = {
                getId: function () {
                    return "abc";
                },
                details: {
                    update: function (relation) {
                        return Promise.reject({
                            err: {
                                message: "error in update"
                            }
                        });
                    },
                    create: function (relation) {
                        return Promise.reject({
                            err: {
                                message: "error in create"
                            }
                        });
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassProduct, reqObjProducts)).to.be.rejected;
        });
        it("checks the hasOne functionality with inline relation definition. Should return a fulfilled promise", function () {
            var instance = {
                getId: function () {
                    return "abc";
                },
                details: {
                    update: function (relation) {
                        return Promise.reject({
                            err: {
                                message: "error in update"
                            }
                        });
                    },
                    create: function (relation) {
                        return Promise.resolve({
                            getId: function () {
                                return "32";
                            }
                        });
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassProduct, reqObjProducts)).to.eventually.equal(204);
        });
        it("checks the hasMany functionality with inline relation definition. Should return a fulfilled promise", function () {
            ModelClassCategory.relations.products.modelTo.getIdName = function () { return null; };
            var instance = {
                getId: function () {
                    return "abc";
                },
                products: {
                    create: function (relation) {
                        return Promise.resolve({
                            getId: function () {
                                return "11";
                            }
                        });
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.eventually.equal(204);
        });
        it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
            ModelClassCategory.relations.products.modelTo.getIdName = function () { return null; };
            var instance = {
                getId: function () {
                    return "abc";
                },
                products: {
                    create: function (relation) {
                        return Promise.reject({});
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
        });
        it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
            var instance = {
                getId: function () {
                    return "abc";
                },
                products: {
                    create: function (relation) {
                        return Promise.reject({});
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
        });
        it("checks the hasMany functionality with inline relation definition. Should return a fulfilled promise", function () {
            var instance = {
                getId: function () {
                    return "abc";
                },
                products: {
                    create: function (relation) {
                        return Promise.resolve({
                            getId: function () {
                                return "11";
                            }
                        });
                    },
                    findById: function (id) {
                        return Promise.resolve({
                            updateAttributes: function (instance) {
                                return Promise.resolve({
                                    getId: function () { return "aaa"; }
                                });
                            }
                        });
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.eventually.equal(204);
        });
        it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
            var instance = {
                getId: function () {
                    return "abc";
                },
                products: {
                    create: function (relation) {
                        return Promise.resolve({
                            getId: function () {
                                return "11";
                            }
                        });
                    },
                    findById: function (id) {
                        return Promise.resolve({
                            updateAttributes: function (instance) {
                                return Promise.reject({});
                            },
                            getId: function () { return "abc"; }
                        });
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
        });
        it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
            var instance = {
                getId: function () {
                    return "abc";
                },
                products: {
                    create: function (relation) {
                        return Promise.resolve({
                            getId: function () {
                                return "11";
                            }
                        });
                    },
                    findById: function (id) {
                        return Promise.reject({});
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
        });
        it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
            var instance = {
                getId: function () {
                    return "abc";
                },
                products: {
                    create: function (relation) {
                        return Promise.reject({});
                    }
                }
            };
            return chai_1.expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
        });
    });
});
//# sourceMappingURL=BaseUpdateRequestHandler.test.js.map