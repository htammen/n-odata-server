var expect = require("chai").expect;
var assert = require("chai").assert;
var common = require("../../lib/common/odata_common.js");

describe("Common", function(){

	describe("getIdFromUrlParameter()", function(){
		it("should return '2' as id", function(){
			var param = "Customer('2')";
			var result = common.getIdFromUrlParameter(param);

			expect(result).to.equal('2');
		});

		it("should return 'Hello World ID' as id", function(){
			var param = "Customer('Hello World ID')";
			var result = common.getIdFromUrlParameter(param);

			expect(result).to.equal('Hello World ID');
		});

		it("should return 3453 as id", function(){
			var param = 'Customer(3453)';
			var result = common.getIdFromUrlParameter(param);

			expect(result).to.equal('3453');
		});

		it("should return 7 as id", function(){
			var param = 'Customer(7)';
			var result = common.getIdFromUrlParameter(param);

			expect(result).to.equal('7');
		});

		it("should return 64 as id", function(){
			var param = 'Customer(64)';
			var result = common.getIdFromUrlParameter(param);

			expect(result).to.equal('64');
		});
	});

});
