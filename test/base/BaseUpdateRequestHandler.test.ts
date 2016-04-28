/// <reference path="../../typings/main.d.ts" />

//import expect = require("chai").expect;
import chai = require("chai");
import {expect} from "chai";
import {assert} from "chai";
import {BaseUpdateRequestHandler} from "../../lib/base/BaseUpdateRequestHandler";
import chaiAsPromised = require("chai-as-promised");
import {LoopbackModelClass} from "../../lib/types/loopbacktypes";
import lb_constants = require("../../lib/constants/loopback_constants");
import {LoopbackRelationDefinition} from "../../lib/types/loopbacktypes";

/* see here for a good description of chai-as-promised: http://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/ */

describe("BaseUpdateRequestHandler", function(){
	before(function() {
		chai.use(chaiAsPromised);
	});


	describe("_getIdOfNewOwner", function() {
		var sut = new BaseUpdateRequestHandler();

		before(function() {

		});

		it("should return the id of Customers cause pluralModelName is defined on modelTo of Relation", function() {
			var uri = "http://0.0.0.0:3000/odata/Customers(3)";
			var relDefinition:LoopbackRelationDefinition = {
				modelTo: {
					modelName: "Customer",
					pluralModelName: "Customers"
				}
			} as LoopbackRelationDefinition;

			expect(sut._getIdOfNewOwner(uri, relDefinition)).is.equal("3");
		});

		it("should return the id of Customers cause modelName is defined on modelTo of Relation", function() {
			var uri = "http://0.0.0.0:3000/odata/Customers(3)";
			var relDefinition:LoopbackRelationDefinition = {
				modelTo: {
					modelName: "Customer"
				}
			} as LoopbackRelationDefinition;

			expect(sut._getIdOfNewOwner(uri, relDefinition)).is.equal("3");
		});

		it("should return undefined cause uri is a collection uri", function() {
			var uri = "http://0.0.0.0:3000/odata/Customers";
			var relDefinition:LoopbackRelationDefinition = {
				modelTo: {
					modelName: "Customer",
					pluralModelName: "Customers"
				}
			} as LoopbackRelationDefinition;

			expect(sut._getIdOfNewOwner(uri, relDefinition)).to.be.undefined;
		});

		it("should return undefined cause neither modelName nor pluralModelName are defined on modelTo of Relation", function() {
			var uri = "http://0.0.0.0:3000/odata/Customers(3)";
			var relDefinition:LoopbackRelationDefinition = {
				modelTo: {
				}
			} as LoopbackRelationDefinition;

			expect(sut._getIdOfNewOwner(uri, relDefinition)).to.be.undefined;
		});
	});

	describe("_upsertInlineRelations()", function(){
		var ModelClassCustomer:LoopbackModelClass = {} as LoopbackModelClass;
		var ModelClassProduct:LoopbackModelClass = {} as LoopbackModelClass;
		var ModelClassCategory:LoopbackModelClass = {} as LoopbackModelClass;
		var reqObjContacts:any = {};
		var reqObjProducts:any = {};
		var reqObjCategory:any = {};
		var sut = new BaseUpdateRequestHandler();

		before(function() {
			// adjust subject under test
			sut._getIdOfNewOwner = function(uri, reldefinition) {
				return "newId";
			};

			// create ModelClassCustomer
			ModelClassCustomer.relations = {
				contacts: {
					type: lb_constants.LB_REL_BELONGSTO,
					keyFrom: 12
				}
			};

			// create ModelClassProduct
			ModelClassProduct.relations = {
				details: {
					type: lb_constants.LB_REL_HASONE,
					keyFrom: 12
				}
			};

			// create reqObjContacts
			reqObjContacts = {
				contacts: {
					__metadata: {
						uri: "abc"
					}
				}
			};

			// create reqObjProducts
			reqObjProducts = {
				details: {
					__metadata: {
						uri: "abc"
					}
				}
			};

			// create reqObjProducts
			reqObjCategory = {
				products: [
					{
						id: "abc",
						__metadata: {
							uri: "abc"
						}
					}
				]
			};

		});

		beforeEach(function() {
			ModelClassCategory.relations = {
				products: {
					type: lb_constants.LB_REL_HASMANY,
					keyFrom: 12,
					modelTo: {
						getIdName: function () {return "id";}
					}
				}
			};
		});

		it("should return a rejected promise cause no parameter is defined", function(){
			return expect(sut._upsertInlineRelations(null, null, null)).to.be.rejected;
		});

		it("should return a rejected promise cause first parameter is not defined", function(){
			return expect(sut._upsertInlineRelations(null, {relations: {}} as LoopbackModelClass, {})).to.be.rejected;
		});

		it("should return a fulfilled promise cause all parameters are defined even if they are empty", function(){
			return expect(sut._upsertInlineRelations({}, {relations:{}} as LoopbackModelClass, {})).to.eventually.equal(204);
		});

		it("checks the belongsTo funcitionality with linked relation definition and should return a fulfilled promise", function(){
			// create the instance
			var instance:any = {
				getId: function() {return "abc"},
				updateAttribute: function(keyFrom, id) {
					return Promise.resolve({});
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCustomer, reqObjContacts)).to.eventually.equal(204);
		});

		it("checks the belongsTo funcitionality with linked relation definition and should return a rejected promise", function(){
			// create the instance
			var instance:any = {
				getId: function() {return "abc"},
				updateAttribute: function(keyFrom, id) {
					return Promise.reject({});
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCustomer, reqObjContacts)).to.be.rejected;
		});

		it("checks the hasOne functionality with inline relation definition. Should return a fulfilled promise", function () {
			// create the instance
			var instance:any = {
				getId: function () {
					return "abc"
				},
				details: {
					update: function (relation) {
						return Promise.resolve({
							getId: function () {
								return "32"
							}
						})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassProduct, reqObjProducts)).to.eventually.equal(204);
		});

		it("checks the hasOne functionality with inline relation definition. Should return a rejected promise", function () {
			// create the instance
			var instance:any = {
				getId: function () {
					return "abc"
				},
				details: {
					update: function (relation) {
						return Promise.reject({
							err: {
								message: "error in update"
							}
						})
					},
					create: function (relation) {
						return Promise.reject({
							err: {
								message: "error in create"
							}
						})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassProduct, reqObjProducts)).to.be.rejected;
		});

		it("checks the hasOne functionality with inline relation definition. Should return a fulfilled promise", function () {
			// create the instance
			var instance:any = {
				getId: function () {
					return "abc"
				},
				details: {
					update: function (relation) {
						return Promise.reject({
							err: {
								message: "error in update"
							}
						})
					},
					create: function (relation) {
						return Promise.resolve({
							getId: function () {
								return "32"
							}
						})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassProduct, reqObjProducts)).to.eventually.equal(204);
		});

		it("checks the hasMany functionality with inline relation definition. Should return a fulfilled promise", function () {
			// create the instance
			ModelClassCategory.relations.products.modelTo.getIdName = function() {return null;};
			var instance:any = {
				getId: function () {
					return "abc"
				},
				products: {
					create: function (relation) {
						return Promise.resolve({
							getId: function () {
								return "11"
							}
						})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.eventually.equal(204);
		});

		it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
			// create the instance
			ModelClassCategory.relations.products.modelTo.getIdName = function() {return null;};
			var instance:any = {
				getId: function () {
					return "abc"
				},
				products: {
					create: function (relation) {
						return Promise.reject({})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
		});

		it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
			// create the instance
			var instance:any = {
				getId: function () {
					return "abc"
				},
				products: {
					create: function (relation) {
						return Promise.reject({})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
		});

		it("checks the hasMany functionality with inline relation definition. Should return a fulfilled promise", function () {
			// create the instance
			var instance:any = {
				getId: function () {
					return "abc"
				},
				products: {
					create: function (relation) {
						return Promise.resolve({
							getId: function () {
								return "11"
							}
						})
					},
					findById: function(id) {
						return Promise.resolve({
							updateAttributes: function (instance) {
								return Promise.resolve({
									getId: function() {return "aaa";}
								})
							}
						})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.eventually.equal(204);
		});

		it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
			// create the instance
			var instance:any = {
				getId: function () {
					return "abc"
				},
				products: {
					create: function (relation) {
						return Promise.resolve({
							getId: function () {
								return "11"
							}
						})
					},
					findById: function(id) {
						return Promise.resolve({
							updateAttributes: function (instance) {
								return Promise.reject({})
							},
							getId: function() {return "abc";}
						})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
		});

		it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
			// create the instance
			var instance:any = {
				getId: function () {
					return "abc"
				},
				products: {
					create: function (relation) {
						return Promise.resolve({
							getId: function () {
								return "11"
							}
						})
					},
					findById: function(id) {
						return Promise.reject({})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
		});

		it("checks the hasMany functionality with inline relation definition. Should return a rejected promise", function () {
			// create the instance
			var instance:any = {
				getId: function () {
					return "abc"
				},
				products: {
					create: function (relation) {
						return Promise.reject({})
					}
				}
			};

			return expect(sut._upsertInlineRelations(instance, ModelClassCategory, reqObjCategory)).to.be.rejected;
		});

	});

});
