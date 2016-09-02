"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var odata_1 = require("../lib/odata");
var loopback = require("loopback");
var boot = require('loopback-boot');
describe("Odata", function () {
    var app;
    var accessToken;
    before(function () {
        chai.use(chaiAsPromised);
        chai.should();
        app = loopback();
        boot(app, "./test/testinit");
        var User = loopback.User;
        User.attachTo(loopback.memory());
        app.model(User);
    });
    describe("checkAccess()", function () {
        var sut;
        before(function () {
            sut = new odata_1.OData();
            sut.init(app, { path: "/odata", odataversion: "2" });
        });
        function createAndLoginUser() {
            var newUser;
            if (accessToken) {
                return Promise.resolve(accessToken);
            }
            else {
                return loopback.User.create({
                    username: 'user1',
                    email: 'user1@tammen-it-solutions.de',
                    password: 'secret'
                }).then(function (user) {
                    newUser = user;
                    return app.models.Role.create({
                        name: 'r_businesstrips_access',
                        description: 'grants general access to businesstrips'
                    });
                }).then(function (role) {
                    return role.principals.create({
                        principalType: app.models.RoleMapping.USER,
                        principalId: newUser.id
                    });
                }).then(function (roleMapping) {
                    return new Promise(function (resolve, reject) {
                        loopback.User.login({ username: 'user1', password: 'secret' }, function (err, token) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                accessToken = token;
                                resolve(token);
                            }
                        });
                    });
                }).catch(function (err) {
                    return Promise.reject(err);
                });
            }
        }
        ;
        it("should resolve cause $metadata request is send", function () {
            var req = {
                params: [
                    "$metadata"
                ]
            };
            var res = {};
            var promise = sut.checkAccess(req, res);
            return Promise.all([
                promise.should.be.fulfilled
            ]);
        });
        it("should resolve cause service document request is send", function () {
            var req = {
                params: [
                    ""
                ]
            };
            var res = {};
            var promise = sut.checkAccess(req, res);
            return Promise.all([
                promise.should.be.fulfilled
            ]);
        });
        it("should resolve cause Person has not defined any ACLs", function () {
            var req = {
                params: [
                    "People"
                ],
                method: "GET"
            };
            var res = {};
            var promise = sut.checkAccess(req, res);
            return Promise.all([
                promise.should.be.fulfilled
            ]);
        });
        it("should reject cause BusinessTrip has defined ACLs and request does not contain authtoken", function () {
            var req = {
                params: [
                    "BusinessTrips"
                ],
                method: "GET"
            };
            var res = {};
            var promise = sut.checkAccess(req, res);
            return Promise.all([
                promise.should.be.rejected
            ]);
        });
        it("should resolve cause BusinessTrip has defined ACLs and request to BusinessTrips contains a valid authtoken", function () {
            var req = {
                params: [
                    "BusinessTrips"
                ],
                method: "GET"
            };
            var res = {};
            var promise = createAndLoginUser().then(function (token) {
                req.accessToken = token;
                return sut.checkAccess(req, res);
            }).catch(function (err) {
                return Promise.reject(err);
            });
            return Promise.all([
                promise.should.be.fulfilled
            ]);
        });
        it("should resolve cause BusinessTrip has defined ACLs and request to BusinessTrips('1') contains a valid authtoken", function () {
            var req = {
                params: [
                    "BusinessTrips('1')"
                ],
                method: "GET"
            };
            var res = {};
            var promise = createAndLoginUser().then(function (token) {
                req.accessToken = token;
                return sut.checkAccess(req, res);
            }).catch(function (err) {
                return Promise.reject(err);
            });
            return Promise.all([
                promise.should.be.fulfilled
            ]);
        });
        it("should resolve cause BusinessTrip has defined ACLs and POST request to BusinessTrips contains a valid authtoken", function () {
            var req = {
                params: [
                    "BusinessTrips"
                ],
                method: "POST",
                get: function (arg) {
                    return undefined;
                }
            };
            var res = {};
            var promise = createAndLoginUser().then(function (token) {
                req.accessToken = token;
                return sut.checkAccess(req, res);
            }).catch(function (err) {
                return Promise.reject(err);
            });
            return Promise.all([
                promise.should.be.fulfilled
            ]);
        });
        it("should resolve cause BusinessTrip has defined ACLs and PUT request to BusinessTrips('1') contains a valid authtoken", function () {
            var req = {
                params: [
                    "BusinessTrips('1')"
                ],
                method: "PUT"
            };
            var res = {};
            var promise = createAndLoginUser().then(function (token) {
                req.accessToken = token;
                return sut.checkAccess(req, res);
            }).catch(function (err) {
                return Promise.reject(err);
            });
            return Promise.all([
                promise.should.be.fulfilled
            ]);
        });
        it("should resolve cause BusinessTrip has defined ACLs and DELETE request to BusinessTrips('1') contains a valid authtoken", function () {
            var req = {
                params: [
                    "BusinessTrips('1')"
                ],
                method: "DELETE"
            };
            var res = {};
            var promise = createAndLoginUser().then(function (token) {
                req.accessToken = token;
                return sut.checkAccess(req, res);
            }).catch(function (err) {
                return Promise.reject(err);
            });
            return Promise.all([
                promise.should.be.fulfilled
            ]);
        });
    });
});
//# sourceMappingURL=odata.test.js.map