/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../lib/types/n_odata_types.ts" />
/// <reference path="../../../lib/typings/bypass_typings.d.ts" />

//import expect = require("chai").expect;
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import lb_constants = require("../../lib/constants/loopback_constants");
import {LoopbackRelationDefinition} from "../../lib/types/loopbacktypes";
import {ODataGetBase} from "../../../lib/base/get/odata_get";
import proxyquire = require("proxyquire");
import {ODataServerConfig} from "../../../lib/types/n_odata_types";
import {SinonSpy} from "sinon";
import * as sinon from "sinon";
import sinonChai = require("~sinon-chai/index");
import loopback = require("loopback");

/* see here for a good description of chai-as-promised: http://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/ */

describe("ODataGetBase", function() {
	let odataConfig:ODataServerConfig;
	before(() => {
		chai.use(chaiAsPromised);
		chai.should();	// found this hack on the internet, otherwise tests with should fail

		odataConfig = {
			maxpagesize: 200,
			odataversion: "2",
			odataPrefix: "odata"
		} as ODataServerConfig;
	});


	describe("getCollectionData", () => {
		let sut:ODataGetBase;

		beforeEach(() => {
		});

		it("should be rejected cause no ModelClass can be found", () => {
			let req:any = {
				url: "http://localhost:3000/Customer?$orderby=quantity",
				app: {
					models: () => {}
				},
				params: [
					"one"
				]
			};
			let res:any = {
				status: 0
			};

			// Stubbing the commons module that is used in metadata.ts
			let commonsStub:any = {
				getRequestModelClass: (models, param) => {
					return Promise.resolve({});
				}
			};
			// create the proxyquire proxy for metadata with the injected module stubs
			let sutProxy = proxyquire("../../../lib/base/get/odata_get", {'../../common/odata_common': commonsStub});

			// create sut (subject under test)
			sut = new sutProxy.ODataGetBase();
			// invoke method to test
			let promise = sut._getCollectionData(req, res);
			// check assertions
			return promise.should.eventually.be.rejected;
		});

		it("should return an empty result but fulfill the promise", () => {
			let req:any = {
				url: "http://localhost:3000/Customer?$orderby=quantity",
				app: {
					models: () => {}
				},
				params: [
					"one"
				],
				query: {}
			};
			let res:any = {
				status: 0,
				set: (key:string, value:string) => {}
			};

			// spy the res.set method
			let resSpy:SinonSpy = sinon.spy(res, 'set');

			// Stubbing the commons and other modules that are used in .ts file
			let commonsStub:any = {		// stubbing odata_common.ts
				getRequestModelClass: (models, param) => {
					return Promise.resolve({
						modelClass: {
							count: () => {},
							find: (filter, callback) => {return Promise.resolve([])},
						}
					});
				},
				getBaseURL: (req) => {return "http://localhost:3000"},
				getPluralForModel: (ModelClass) => {return "Customers"}
			};

			let requestheaderStub:any = {	// stubbing requestHeader
				getPreferHeader: (req) => {return [
					{	0: "maxpagesize", 1: 50 }
				]}
			};
			// create the proxyquire proxy for sut module with the injected module stubs
			let sutProxy = proxyquire("../../../lib/base/get/odata_get", {
				'../../common/odata_common': commonsStub,
				'../../common/odata_req_header': requestheaderStub
			});

			// create sut (subject under test)
			sut = new sutProxy.ODataGetBase();
			sut.setConfig(odataConfig);
			// invoke method to test
			let promise = sut._getCollectionData(req, res);
			// check assertions
			//resSpy.should.eventually.have.been.calledOnce;
			let expectedResult = {
				data: [],
				nextLink: "http://localhost:3000/Customers?$skiptoken=200"
			};
			return Promise.all([
					promise.should.eventually.have.property('data'),
					promise.should.eventually.have.property('nextLink'),
					promise.should.eventually.have.property('nextLink').equals("http://localhost:3000/Customers?$skiptoken=50")
				]);
		});

		it("should return a unfiltered result set", () => {
			let oModel:any = loopback.createModel('my-model', {name: String});
			var dataSource = loopback.createDataSource({
				connector: loopback.Memory
			} as any);
			oModel.attachTo(dataSource);

			let req:any = {
				url: "http://localhost:3000/Customer?$orderby=quantity",
				app: {
					models: () => {}
				},
				params: [
					"one"
				],
				query: {}
			};
			let res:any = {
				status: 0,
				set: (key:string, value:string) => {}
			};

			// spy the res.set method
			let resSpy:SinonSpy = sinon.spy(res, 'set');

			let commonsStub:any = {		// stubbing odata_common.ts
				getRequestModelClass: (models, param) => {
					return Promise.resolve({
						modelClass: oModel
					});
				},
				getBaseURL: (req) => {return "http://localhost:3000"},
				getPluralForModel: (ModelClass) => {return "Customers"}
			};

			let requestheaderStub:any = {	// stubbing requestHeader
				getPreferHeader: (req) => {return [
					{	0: "maxpagesize", 1: 50 }
				]}
			};
			// create the proxyquire proxy for sut module with the injected module stubs
			let sutProxy = proxyquire("../../../lib/base/get/odata_get", {
				'../../common/odata_common': commonsStub,
				'../../common/odata_req_header': requestheaderStub
			});

			// create sut (subject under test)
			sut = new sutProxy.ODataGetBase();
			sut.setConfig(odataConfig);
			// invoke method to test
			let promise = sut._getCollectionData(req, res);
			// check assertions
			//resSpy.should.eventually.have.been.calledOnce;
			let expectedResult = {
				data: [],
				nextLink: "http://localhost:3000/Customers?$skiptoken=200"
			};
			return Promise.all([
				promise.should.eventually.have.property('data'),
				promise.should.eventually.have.property('data').to.have.lengthOf(0)
			]);
		});

	});

	describe("getCollectionCount", () => {

		beforeEach(function () {
		});

		it("should return with bad request error cause param $count is not defined", () => {
			let req:any = {
				params: [
					"someWrongParam"
				]
			};

			// create the proxyquire proxy for sut module with the injected module stubs
			let sutProxy = proxyquire("../../../lib/base/get/odata_get", {});

			// create sut (subject under test)
			let sut:ODataGetBase = new sutProxy.ODataGetBase();
			// invoke method to test
			let promise = sut._getCollectionCount(req, null);
			// check assertions
			return promise.should.eventually.be.rejectedWith("Error: bad request");
		});


		it("should return error code 415 cause of wrong accept header", () => {
			let req:any = {
				app: {
					models: () => {}
				},
				params: [
					"$count"
				],
				accepts: (type:string) => {return false}
			};

			// Stubbing the commons and other modules that are used in .ts file
			let commonsStub:any = {
				getRequestModelClass: (models, param) => {
					return Promise.resolve({
						modelClass: {
							count: (filter:string, fn:Function) => {fn(null, 15)}
						}
					});
				}
			};		// stubbing odata_common.ts

			// create the proxyquire proxy for sut module with the injected module stubs
			let sutProxy = proxyquire("../../../lib/base/get/odata_get", {
				'../../common/odata_common': commonsStub
			});

			// create sut (subject under test)
			let sut:ODataGetBase = new sutProxy.ODataGetBase();
			// invoke method to test
			let promise = sut._getCollectionCount(req, null);
			// check assertions
			return promise.should.eventually.be.rejectedWith("415");
		})


		it("should return correct number of records", () => {
			let req:any = {
				app: {
					models: () => {}
				},
				params: [
					"$count"
				],
				accepts: (type:string) => {
					if (type === 'text/plain') {
						return true
					} else return false
				}
			};

			// Stubbing the commons and other modules that are used in .ts file
			// when count is called from n-odata-server it will return the value of 15
			// that is defined here.
			let commonsStub:any = {
				getRequestModelClass: (models, param) => {
					return Promise.resolve({
						modelClass: {
							count: (filter:string, fn:Function) => {fn(null, 15)}
						}
					});
				}
			};		// stubbing odata_common.ts

			// create the proxyquire proxy for sut module with the injected module stubs
			let sutProxy = proxyquire("../../../lib/base/get/odata_get", {
				'../../common/odata_common': commonsStub
			});

			// create sut (subject under test)
			let sut:ODataGetBase = new sutProxy.ODataGetBase();
			// invoke method to test
			let promise = sut._getCollectionCount(req, null);
			// check assertions
			return promise.should.eventually.be.equal(15);
		})


		it("should return an error cause count() threw error", () => {
			let req:any = {
				app: {
					models: () => {}
				},
				params: [
					"$count"
				],
				accepts: (type:string) => {
					if (type === 'text/plain') {
						return true
					} else return false
				}
			};

			// Stubbing the commons and other modules that are used in .ts file
			// when count is called from n-odata-server it will return the value of 15
			// that is defined here.
			let commonsStub:any = {
				getRequestModelClass: (models, param) => {
					return Promise.resolve({
						modelClass: {
							count: (filter:string, fn:Function) => {fn(new Error("this is an error case"), null)}
						}
					});
				}
			};		// stubbing odata_common.ts

			// create the proxyquire proxy for sut module with the injected module stubs
			let sutProxy = proxyquire("../../../lib/base/get/odata_get", {
				'../../common/odata_common': commonsStub
			});

			// create sut (subject under test)
			let sut:ODataGetBase = new sutProxy.ODataGetBase();
			// invoke method to test
			let promise = sut._getCollectionCount(req, null);
			// check assertions
			return promise.should.eventually.be.rejectedWith("Error: this is an error case");
		})

	});


	describe("getServiceDocument", () => {

		beforeEach(function () {
		});

		it("should return an empty service document", () => {
			let req:any = {
				app: {
					models: () => {return []}
				}
			};

			// create sut (subject under test)
			let sut:ODataGetBase = new ODataGetBase();
			// invoke method to test
			let promise = sut._getServiceDocument(req, null);
			// check assertions
			return Promise.all([
				promise.should.eventually.have.property('data'),
				promise.should.eventually.have.property('data').is.empty
			]);
		});


		it("should return a service document with n models", () => {
			let req:any = {
				app: {
					models: () => {return [
						{definition: {
							settings: {},
							name: "Customer"
						}},
						{definition: {
							settings: {},
							name: "Product"
						}}
					]}
				}
			};

			// create sut (subject under test)
			let sut:ODataGetBase = new ODataGetBase();
			// invoke method to test
			let promise = sut._getServiceDocument(req, null);
			// check assertions
			return Promise.all([
				promise.should.eventually.have.property('data'),
				promise.should.eventually.have.property('data').not.is.empty,
				promise.should.eventually.have.property('data').to.have.lengthOf(2),
				promise.should.eventually.to.have.deep.property('data[0].name', "Customers"),
				promise.should.eventually.to.have.deep.property('data[1].name', "Products")
			]);
		});

		it("should return a service document with n models where the plural of the model gets read from model.definition.settings", () => {
			let req:any = {
				app: {
					models: () => {return [
						{definition: {
							settings: {plural: "People"},
							name: "Person"
						}},
						{definition: {
							settings: {plural: "Plural"},
							name: "Single"
						}},
						{definition: {
							settings: {plural: "MoreProducts"},
							name: "Product"
						}}
					]}
				}
			};

			// create sut (subject under test)
			let sut:ODataGetBase = new ODataGetBase();
			// invoke method to test
			let promise = sut._getServiceDocument(req, null);
			// check assertions
			return Promise.all([
				promise.should.eventually.have.property('data'),
				promise.should.eventually.have.property('data').not.is.empty,
				promise.should.eventually.have.property('data').to.have.lengthOf(3),
				promise.should.eventually.to.have.deep.property('data[0].name', "People"),
				promise.should.eventually.to.have.deep.property('data[1].name', "Plural"),
				promise.should.eventually.to.have.deep.property('data[2].name', "MoreProducts")
			]);
		})

	});

});
