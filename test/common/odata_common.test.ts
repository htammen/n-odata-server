/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../lib/types/n_odata_types.ts" />
/// <reference path="../../lib/typings/bypass_typings.d.ts" />

import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import common = require("../../lib/common/odata_common");
import {LoopbackModelProperty} from "../../lib/types/loopbacktypes";
var loopback = require( "loopback" );

describe("Common", function(){
	let app;
	before(() => {
		chai.use(chaiAsPromised);
		chai.should();	// found this hack on the internet, otherwise tests with should fail

		app = loopback();		// create an application object for the tests
	});


	describe("getRequestModelClass()", () => {
		let sut:Function;

		before(() => {
			let bookModel = loopback.createModel({
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
			let authorModel = loopback.createModel({
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
			let userModel = loopback.createModel({
				name: 'User',
				idInjection: true,
				properties: {
					name: 'string',
					email: 'string'
				}
			});
			let personModel = loopback.createModel({
				name: 'Person',
				idInjection: true,
				plural: "People",
				properties: {
					name: 'string',
					email: 'string',
					city: 'string'
				}
			});

			let ds = loopback.memory();
			bookModel.attachTo(ds);
			authorModel.attachTo(ds);
			userModel.attachTo(ds);
			personModel.attachTo(ds);

			app.model(bookModel);
			app.model(authorModel);
			app.model(userModel);
			app.model(personModel);
		});

		it("should get modelClass Author for request Authors", () => {
			let uri:string = "Authors";

			sut = common.getRequestModelClass;

			let promise = sut(app.models, uri);
			// check assertions
			return Promise.all([
				promise.should.eventually.have.property('modelClass'),
				promise.should.eventually.have.property('foreignKeyFilter'),
				promise.should.eventually.have.property('requestId'),
				promise.should.eventually.have.property('modelClass').not.to.be.empty,
				promise.should.eventually.to.have.deep.property('modelClass.modelName', "Author"),
			]);

		});

		it("should get modelClass User for request Users", () => {
			let uri:string = "Users";

			sut = common.getRequestModelClass;

			let promise = sut(app.models, uri);
			// check assertions
			return Promise.all([
				promise.should.eventually.have.property('modelClass'),
				promise.should.eventually.have.property('foreignKeyFilter'),
				promise.should.eventually.have.property('requestId'),
				promise.should.eventually.have.property('modelClass').not.to.be.empty,
				promise.should.eventually.to.have.deep.property('modelClass.modelName', "User"),
			]);
		});

		it("should get modelClass Person for request People", () => {
			let uri:string = "People";

			sut = common.getRequestModelClass;

			let promise = sut(app.models, uri);
			// check assertions
			return Promise.all([
				promise.should.eventually.have.property('modelClass'),
				promise.should.eventually.have.property('foreignKeyFilter'),
				promise.should.eventually.have.property('requestId'),
				promise.should.eventually.have.property('modelClass').not.to.be.empty,
				promise.should.eventually.to.have.deep.property('modelClass.modelName', "Person"),
			]);
		});

		it("should get modelClass Author for request Authors('1')", () => {
			let uri:string = "Authors('1')";

			sut = common.getRequestModelClass;

			let promise = sut(app.models, uri);
			// check assertions
			return Promise.all([
				promise.should.eventually.have.property('modelClass'),
				promise.should.eventually.have.property('foreignKeyFilter'),
				promise.should.eventually.have.property('requestId'),
				promise.should.eventually.have.property('modelClass').not.to.be.empty,
				promise.should.eventually.to.have.deep.property('modelClass.modelName', "Author"),
			]);

		});

		it("should get modelClass Book for request Authors('1')/books", () => {
			let uri:string = "Authors('1')/books";

			sut = common.getRequestModelClass;

			let promise = sut(app.models, uri);
			// check assertions
			return Promise.all([
				promise.should.eventually.have.property('modelClass'),
				promise.should.eventually.have.property('modelClass').not.to.be.empty,
				promise.should.eventually.to.have.deep.property('modelClass.modelName', "Book"),
			]);

		});

		it("should get modelClass Author for request Books('1')/author", () => {
			let uri:string = "Books('1')/author";

			// create Book object that is needed for the test and then invoke the sut
			let bookModel = loopback.getModel("Book");
			return bookModel.create({
				title: "The Raven",
				ISBN: "123456789"
			}).then((obj:any) => {
				// invoke the sut
				sut = common.getRequestModelClass;
				let promise = sut(app.models, uri);
				// check assertions
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

	describe("getIdByPropertyType()", function() {
		before(() => {
			let testModel = loopback.createModel({
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
			let ds = loopback.memory();
			testModel.attachTo(ds);

			app.model(testModel);
		});

		it("should return 2 as id", function () {
			let testModel = loopback.getModel("Test");
			let prop:LoopbackModelProperty = testModel.definition.properties.name
			var result = common.getIdByPropertyType("'2'", prop);

			result.should.be.equal("2");
		});

		it("should return 'Hello World' as id", function () {
			let testModel = loopback.getModel("Test");
			let prop:LoopbackModelProperty = testModel.definition.properties.name
			var result = common.getIdByPropertyType("'Hello World'", prop);

			result.should.be.equal("Hello World");
		});

		it("should return 12", function () {
			let testModel = loopback.getModel("Test");
			let prop:LoopbackModelProperty = testModel.definition.properties.num
			var result = common.getIdByPropertyType("12", prop);

			result.should.be.equal("12");
		});

		it("should return '12.02.2016' as id", function () {
			let testModel = loopback.getModel("Test");
			let prop:LoopbackModelProperty = testModel.definition.properties.date
			var result = common.getIdByPropertyType("12.02.2016", prop);

			result.should.be.equal("12.02.2016");
		});
	});


	/**
	 * The function getIdFromUrlParameter is deprecated but the tests are still executed
	 */
	describe("getIdFromUrlParameter()", function(){
		it("should return '2' as id", function(){
			var param = "Customer('2')";
			var result = common.getIdFromUrlParameter(param);

			result.should.be.equal('2');
		});

		it("should return 'Hello World ID' as id", function(){
			var param = "Customer('Hello World ID')";
			var result = common.getIdFromUrlParameter(param);

			result.should.be.equal('Hello World ID');
		});

		it("should return 3453 as id", function(){
			var param = 'Customer(3453)';
			var result = common.getIdFromUrlParameter(param);

			result.should.be.equal('3453');
		});

		it("should return 7 as id", function(){
			var param = 'Customer(7)';
			var result = common.getIdFromUrlParameter(param);

			result.should.be.equal('7');
		});

		it("should return 64 as id", function(){
			var param = 'Customer(64)';
			var result = common.getIdFromUrlParameter(param);

			result.should.be.equal('64');
		});
	});

});
