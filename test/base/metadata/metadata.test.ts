/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by helmut on 23.07.16.
 */

//import expect = require("chai").expect;
import chai = require("chai");
import {expect} from "chai";
import {assert} from "chai";
import chaiAsPromised = require("chai-as-promised");
import {LoopbackModelClass} from "../../lib/types/loopbacktypes";
import lb_constants = require("../../lib/constants/loopback_constants");
import {Request} from "express-serve-static-core";
import {Response} from "express-serve-static-core";
import {Metadata} from "../../../lib/base/metadata/metadata";
import {LoopbadkApp} from "../../../lib/types/loopbacktypes";

/* see here for a good description of chai-as-promised: http://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/ */

describe("Metadata", function() {
	before(function () {
		chai.use(chaiAsPromised);
	});


	describe("buildMetadata", function () {
		let sut:Metadata;

		beforeEach(function () {
			let app:LoopbadkApp = {models: []};
			sut = new Metadata(app);
		});

		it("should build and return a simple metadata stream", function () {
			// TODO: implement a lot of tests here
			let promise:Promise = sut.buildMetadata();
			promise.then(xmlbuilder => {
				return expect(1===1);
			});
		});
	});
});
