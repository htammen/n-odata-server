"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var common = require("../../lib/common/odata_common");
var loopback = require("loopback");
describe("Common", function () {
    var app;
    before(function () {
        chai.use(chaiAsPromised);
        chai.should();
        app = loopback();
    });
    describe("getRequestModelClass()", function () {
        var sut;
        before(function () {
            var bookModel = loopback.createModel({
                name: 'Book',
                idInjection: true,
                properties: {
                    title: 'string',
                    ISBN: 'string'
                },
                relations: {
                    author: {
                        type: "belongsTo",
                        model: "Author",
                        foreignKey: ""
                    }
                }
            });
            var authorModel = loopback.createModel({
                name: 'Author',
                idInjection: true,
                properties: {
                    firstName: 'string',
                    lastName: 'string'
                },
                relations: {
                    books: {
                        type: "hasMany",
                        model: "Book",
                        foreignKey: "AuthorId"
                    }
                }
            });
            var userModel = loopback.createModel({
                name: 'User',
                idInjection: true,
                properties: {
                    name: 'string',
                    email: 'string'
                }
            });
            var personModel = loopback.createModel({
                name: 'Person',
                idInjection: true,
                plural: "People",
                properties: {
                    name: 'string',
                    email: 'string',
                    city: 'string'
                }
            });
            var ds = loopback.memory();
            bookModel.attachTo(ds);
            authorModel.attachTo(ds);
            userModel.attachTo(ds);
            personModel.attachTo(ds);
            app.model(bookModel);
            app.model(authorModel);
            app.model(userModel);
            app.model(personModel);
        });
        it("should get modelClass Author for request Authors", function () {
            var uri = "Authors";
            sut = common.getRequestModelClass;
            var promise = sut(app.models, uri);
            return Promise.all([
                promise.should.eventually.have.property('modelClass'),
                promise.should.eventually.have.property('foreignKeyFilter'),
                promise.should.eventually.have.property('requestId'),
                promise.should.eventually.have.property('modelClass').not.to.be.empty,
                promise.should.eventually.to.have.deep.property('modelClass.modelName', "Author"),
            ]);
        });
        it("should get modelClass User for request Users", function () {
            var uri = "Users";
            sut = common.getRequestModelClass;
            var promise = sut(app.models, uri);
            return Promise.all([
                promise.should.eventually.have.property('modelClass'),
                promise.should.eventually.have.property('foreignKeyFilter'),
                promise.should.eventually.have.property('requestId'),
                promise.should.eventually.have.property('modelClass').not.to.be.empty,
                promise.should.eventually.to.have.deep.property('modelClass.modelName', "User"),
            ]);
        });
        it("should get modelClass Person for request People", function () {
            var uri = "People";
            sut = common.getRequestModelClass;
            var promise = sut(app.models, uri);
            return Promise.all([
                promise.should.eventually.have.property('modelClass'),
                promise.should.eventually.have.property('foreignKeyFilter'),
                promise.should.eventually.have.property('requestId'),
                promise.should.eventually.have.property('modelClass').not.to.be.empty,
                promise.should.eventually.to.have.deep.property('modelClass.modelName', "Person"),
            ]);
        });
        it("should get modelClass Author for request Authors('1')", function () {
            var uri = "Authors('1')";
            sut = common.getRequestModelClass;
            var promise = sut(app.models, uri);
            return Promise.all([
                promise.should.eventually.have.property('modelClass'),
                promise.should.eventually.have.property('foreignKeyFilter'),
                promise.should.eventually.have.property('requestId'),
                promise.should.eventually.have.property('modelClass').not.to.be.empty,
                promise.should.eventually.to.have.deep.property('modelClass.modelName', "Author"),
            ]);
        });
        it("should get modelClass Book for request Authors('1')/books", function () {
            var uri = "Authors('1')/books";
            sut = common.getRequestModelClass;
            var promise = sut(app.models, uri);
            return Promise.all([
                promise.should.eventually.have.property('modelClass'),
                promise.should.eventually.have.property('modelClass').not.to.be.empty,
                promise.should.eventually.to.have.deep.property('modelClass.modelName', "Book"),
            ]);
        });
        it("should get modelClass Author for request Books('1')/author", function () {
            var uri = "Books('1')/author";
            var bookModel = loopback.getModel("Book");
            return bookModel.create({
                title: "The Raven",
                ISBN: "123456789"
            }).then(function (obj) {
                sut = common.getRequestModelClass;
                var promise = sut(app.models, uri);
                return Promise.all([
                    promise.should.eventually.have.property('modelClass'),
                    promise.should.eventually.have.property('foreignKeyFilter'),
                    promise.should.eventually.have.property('requestId'),
                    promise.should.eventually.have.property('modelClass').not.to.be.empty,
                    promise.should.eventually.to.have.deep.property('modelClass.modelName', "Author"),
                    promise.should.eventually.have.property('foreignKeyFilter').not.to.be.empty,
                    promise.should.eventually.to.have.deep.property('foreignKeyFilter.id'),
                    promise.should.eventually.to.have.deep.property('requestId', '1')
                ]);
            });
        });
    });
    describe("getIdByPropertyType()", function () {
        before(function () {
            var testModel = loopback.createModel({
                name: 'Test',
                idInjection: true,
                properties: {
                    name: "string",
                    email: "string",
                    num: "decimal",
                    bool: "boolean",
                    buf: "buffer",
                    date: "date"
                }
            });
            var ds = loopback.memory();
            testModel.attachTo(ds);
            app.model(testModel);
        });
        it("should return 2 as id", function () {
            var testModel = loopback.getModel("Test");
            var prop = testModel.definition.properties.name;
            var result = common.getIdByPropertyType("'2'", prop);
            result.should.be.equal("2");
        });
        it("should return 'Hello World' as id", function () {
            var testModel = loopback.getModel("Test");
            var prop = testModel.definition.properties.name;
            var result = common.getIdByPropertyType("'Hello World'", prop);
            result.should.be.equal("Hello World");
        });
        it("should return 12", function () {
            var testModel = loopback.getModel("Test");
            var prop = testModel.definition.properties.num;
            var result = common.getIdByPropertyType("12", prop);
            result.should.be.equal("12");
        });
        it("should return '12.02.2016' as id", function () {
            var testModel = loopback.getModel("Test");
            var prop = testModel.definition.properties.date;
            var result = common.getIdByPropertyType("12.02.2016", prop);
            result.should.be.equal("12.02.2016");
        });
    });
    describe("getIdFromUrlParameter()", function () {
        it("should return '2' as id", function () {
            var param = "Customer('2')";
            var result = common.getIdFromUrlParameter(param);
            result.should.be.equal('2');
        });
        it("should return 'Hello World ID' as id", function () {
            var param = "Customer('Hello World ID')";
            var result = common.getIdFromUrlParameter(param);
            result.should.be.equal('Hello World ID');
        });
        it("should return 3453 as id", function () {
            var param = 'Customer(3453)';
            var result = common.getIdFromUrlParameter(param);
            result.should.be.equal('3453');
        });
        it("should return 7 as id", function () {
            var param = 'Customer(7)';
            var result = common.getIdFromUrlParameter(param);
            result.should.be.equal('7');
        });
        it("should return 64 as id", function () {
            var param = 'Customer(64)';
            var result = common.getIdFromUrlParameter(param);
            result.should.be.equal('64');
        });
    });
});
//# sourceMappingURL=odata_common.test.js.map