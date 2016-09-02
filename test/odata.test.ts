/// <reference path="../typings/index.d.ts" />
/// <reference path="../lib/types/n_odata_types.ts" />
/// <reference path="../lib/typings/bypass_typings.d.ts" />

import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import {OData} from "../lib/odata";
import {LoopbackModelProperty, LoopbackRequest} from "../lib/types/loopbacktypes";
var loopback = require("loopback");
var boot = require('loopback-boot');
import * as express from "express";


/**
 * Tests for the entire odata.ts file
 */
describe("Odata", function () {
	let app;
	let accessToken;	// holds the accesstoken of the logged in user that is generated only only once in this test group
	before(() => {
		chai.use(chaiAsPromised);
		chai.should();	// found this hack on the internet, otherwise tests with should fail

		app = loopback();		// create an application object for the tests
		// boot the app from ./test/testinit directory. In this directory we define the models and all the app configuration
		boot(app, "./test/testinit");
		// the User model has to be initialized via loopback.User. The other built-in models (ACL, Role, ...)
		// are initialized correctly via the above boot function call.
		let User = loopback.User;
		User.attachTo(loopback.memory());
		app.model(User);
	});

	/**
	 * Tests for the checkAccess method of the OData class
	 */
	describe("checkAccess()", () => {
		let sut: OData;

		before(() => {
			sut = new OData();
			sut.init(app, {path: "/odata", odataversion: "2"});

		});

		/**
		 * Helper function that creates and logs in a user and returns the accessToken of that
		 * login or simply returns the accessToken if user has already logged in
		 * @returns {any}
		 */
		function createAndLoginUser(): Promise<any> {
			let newUser;
			if(accessToken) {
				return Promise.resolve(accessToken);
			} else {
				return loopback.User.create({
					username: 'user1',
					email: 'user1@tammen-it-solutions.de',
					password: 'secret'
				}).then((user) => {
					newUser = user;
					return app.models.Role.create({
						name: 'r_businesstrips_access',
						description: 'grants general access to businesstrips'
					})
				}).then((role) => {
					return role.principals.create({
						principalType: app.models.RoleMapping.USER,
						principalId: newUser.id
					})
				}).then((roleMapping) => {
					return new Promise((resolve, reject) => {
						loopback.User.login({username: 'user1', password: 'secret'}, function (err, token) {
							if (err) {
								reject(err);
							} else {
								accessToken = token;
								resolve(token);
							}
						})
					})
				}).catch((err) => {
					return Promise.reject(err);
				});
			}
		};

		it("should resolve cause $metadata request is send", () => {
			let req: any = {
				params: [
					"$metadata"
				]
			};
			let res: any = {}

			let promise: Promise<any> = sut.checkAccess(req, res);
			// check assertions
			return Promise.all([
				promise.should.be.fulfilled
			]);

		});

		it("should resolve cause service document request is send", () => {
			let req: any = {
				params: [
					""
				]
			};
			let res: any = {}

			let promise: Promise<any> = sut.checkAccess(req, res);
			// check assertions
			return Promise.all([
				promise.should.be.fulfilled
			]);

		});

		it("should resolve cause Person has not defined any ACLs", () => {
			let req: any = {
				params: [
					"People"
				],
				method: "GET"
			};
			let res: any = {}

			let promise: Promise<any> = sut.checkAccess(req, res);
			// check assertions
			return Promise.all([
				promise.should.be.fulfilled
			]);

		});

		it("should reject cause BusinessTrip has defined ACLs and request does not contain authtoken", () => {
			let req: any = {
				params: [
					"BusinessTrips"
				],
				method: "GET"
			};
			let res: any = {}

			let promise: Promise<any> = sut.checkAccess(req, res);
			// check assertions
			return Promise.all([
				promise.should.be.rejected
			]);

		});

		it("should resolve cause BusinessTrip has defined ACLs and request to BusinessTrips contains a valid authtoken", () => {
			let req: any = {
				params: [
					"BusinessTrips"
				],
				method: "GET"
			};
			let res: any = {}

			// create and login user and then invoke checkAccess method on sut
			let promise: Promise<any> = createAndLoginUser().then((token) =>
			{
				req.accessToken = token;
				return sut.checkAccess(req, res);
			}).catch((err) => {
				return Promise.reject(err);
			});

			// check assertions
			return Promise.all([
				promise.should.be.fulfilled
			]);
		});

		it("should resolve cause BusinessTrip has defined ACLs and request to BusinessTrips('1') contains a valid authtoken", () => {
			let req: any = {
				params: [
					"BusinessTrips('1')"
				],
				method: "GET"
			};
			let res: any = {}

			// create and login user and then invoke checkAccess method on sut
			let promise: Promise<any> = createAndLoginUser().then((token) =>
			{
				req.accessToken = token;
				return sut.checkAccess(req, res);
			}).catch((err) => {
				return Promise.reject(err);
			});

			// check assertions
			return Promise.all([
				promise.should.be.fulfilled
			]);
		});

		it("should resolve cause BusinessTrip has defined ACLs and POST request to BusinessTrips contains a valid authtoken", () => {
			let req: any = {
				params: [
					"BusinessTrips"
				],
				method: "POST",
				get: (arg) => {
					return undefined
				}
			};
			let res: any = {}

			// create and login user and then invoke checkAccess method on sut
			let promise: Promise<any> = createAndLoginUser().then((token) =>
			{
				req.accessToken = token;
				return sut.checkAccess(req, res);
			}).catch((err) => {
				return Promise.reject(err);
			});

			// check assertions
			return Promise.all([
				promise.should.be.fulfilled
			]);
		});

		it("should resolve cause BusinessTrip has defined ACLs and PUT request to BusinessTrips('1') contains a valid authtoken", () => {
			let req: any = {
				params: [
					"BusinessTrips('1')"
				],
				method: "PUT"
			};
			let res: any = {}

			// create and login user and then invoke checkAccess method on sut
			let promise: Promise<any> = createAndLoginUser().then((token) =>
			{
				req.accessToken = token;
				return sut.checkAccess(req, res);
			}).catch((err) => {
				return Promise.reject(err);
			});

			// check assertions
			return Promise.all([
				promise.should.be.fulfilled
			]);
		});

		it("should resolve cause BusinessTrip has defined ACLs and DELETE request to BusinessTrips('1') contains a valid authtoken", () => {
			let req: any = {
				params: [
					"BusinessTrips('1')"
				],
				method: "DELETE"
			};
			let res: any = {}

			// create and login user and then invoke checkAccess method on sut
			let promise: Promise<any> = createAndLoginUser().then((token) =>
			{
				req.accessToken = token;
				return sut.checkAccess(req, res);
			}).catch((err) => {
				return Promise.reject(err);
			});

			// check assertions
			return Promise.all([
				promise.should.be.fulfilled
			]);
		});

	});

});
