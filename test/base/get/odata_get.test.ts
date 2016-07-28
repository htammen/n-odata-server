/// <reference path="../../../typings/index.d.ts" />

//import expect = require("chai").expect;
import chai = require("chai");
import {expect} from "chai";
import {assert} from "chai";
import chaiAsPromised = require("chai-as-promised");
import {LoopbackModelClass} from "../../lib/types/loopbacktypes";
import lb_constants = require("../../lib/constants/loopback_constants");
import {LoopbackRelationDefinition} from "../../lib/types/loopbacktypes";
import {ODataGetBase} from "../../../lib/base/get/odata_get";
import {Request} from "express-serve-static-core";
import {Response} from "express-serve-static-core";
import proxyquire = require("proxyquire");

/* see here for a good description of chai-as-promised: http://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/ */

describe("ODataGetBase", function() {
	before(function () {
		chai.use(chaiAsPromised);
		chai.should();	// found this hack on the internet, otherwise tests with should fail
	});


	describe("_getCollectionData", function () {
		var sut:ODataGetBase;

		beforeEach(function () {
		});

		it("should be rejected cause no ModelClass can be found", function () {
			// TODO: implement a lot of tests here
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
			let commonsStub:any = {};
			commonsStub.getRequestModelClass = (models, param) => {
				return Promise.resolve({});
			};
			// create the proxyquire proxy for metadata with the injected module stubs
			let sutProxy = proxyquire("../../../lib/base/get/odata_get", {'../../common/odata_common': commonsStub});

			sut = new sutProxy.ODataGetBase();

			let promise = sut._getCollectionData(req, res);
			return promise.should.eventually.be.rejected;
		});
	});
});
