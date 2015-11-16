var expect = require("chai").expect;
var assert = require("chai").assert;
var sinon = require("sinon");
var req_header = require("../../lib/common/odata_req_header.js");

describe("req_header", function(){

	describe("getPreferHeader()", function(){
		it("should return an array with 2 elements", function(){

			// Mock the request
			var req = { get: function (str) {} };
			var mock = sinon.mock(req);
			mock.expects("get").once().returns('odata.aaa=2,odata.bbb=4');

			// run the test
			var result = req_header.getPreferHeader(req);

			// evaluate the test
			expect(result).to.have.length(2);
			var res1 = result[0];
			expect(res1).to.have.members(['aaa','2']);
			var res2 = result[1];
			expect(res2).to.have.members(['bbb','4']);
		});

		it("should return an array with 1 element", function(){

			// Mock the request
			var req = { get: function (str) {} };
			var mock = sinon.mock(req);
			mock.expects("get").once().returns('odata.maxpagesize=233');

			// run the test
			var result = req_header.getPreferHeader(req);

			expect(result).to.have.length(1);
			var res1 = result[0];
			expect(res1).to.have.members(['maxpagesize','233']);
		});

		it("should return an array with 0 elements, cause header values don't start with odata.", function(){

			// Mock the request
			var req = { get: function (str) {} };
			var mock = sinon.mock(req);
			mock.expects("get").once().returns('aaa=2,anythingbutodata.bbb=4');

			// run the test
			var result = req_header.getPreferHeader(req);

			// evaluate the test
			expect(result).to.have.length(0);
		});

		it("should return an empty array cause no Prefer header is defined.", function(){

			// Mock the request
			var req = { get: function (str) {} };
			var mock = sinon.mock(req);
			mock.expects("get").once().returns(undefined);

			// run the test
			var result = req_header.getPreferHeader(req);

			// evaluate the test
			expect(result).to.have.length(0);
		});
	});

});
