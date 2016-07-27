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

/* see here for a good description of chai-as-promised: http://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/ */

describe("ODataGetBase", function() {
	before(function () {
		chai.use(chaiAsPromised);
		chai.should();	// found this hack on the internet, otherwise tests with should fail
	});


	describe("_getCollectionData", function () {
		var sut:ODataGetBase;

		beforeEach(function () {
			sut = new ODataGetBase();
		});

		it("should return ordered collection", function () {
			// TODO: implement a lot of tests here
			let req:any = {
				url: "http://localhost:3000/Customer?$orderby=quantity"
			};
			let res:any = {
				status: 0
			};
			//let promise = sut._getCollectionData(req, res);
			//return promise.should.eventually.be.null;
			return expect(true).to.be.true;
		});
	});
});
