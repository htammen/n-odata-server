/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
/**
 * Created by helmut on 01.12.15.
 */

import parser = require('odata-parser');
import BaseRequestHandler = require('../BaseRequestHandler');
import commons = require('../../common/odata_common');
import constants = require('../../constants/odata_constants');
import req_header = require('../../common/odata_req_header');

/** Interface for metadata of OData */
interface Metadata {
	uri: String,
	type: String,
	etag?: String
}

/** Interface for loopback filter definition */
interface LoopbackFilter {
	fields?: any,
	include?: any,
	limit?: number,
	order?: string,
	skip?: number,
	where?: any
}

export interface CollectionResultResult {
	results: {[index: number]: any};
}

/**
 * This is the return type of a collection request in OData V2
 */
export class CollectionResult {
	nextLink:string;
	count:number;
	data:any;

	constructor() {
	};

	/**
	 * Returns the result for a collection request. This looks like
	 * <pre><code>
	 * {
   * "d": {
   *  "@odata.netxtLink": "http://0.0.0.0:3000/odata/people?$skiptoken=3",
   *  "results": [
   *    {
   *      "firstname": "Maria"
   *    },
   *    {
   *      "firstname": "Helmut"
   *    },
   *    {
   *      "firstname": "Franz",
   *      "age": 65
   *    }
   *  ]}
	 * }
	 * </code></pre>
	 * @returns {{d: any}}
	 **/
	getRequestResult():any {
		var retValue:{d: any} = {d: {}};
		if (this.nextLink) {
			retValue.d['@odata.netxtLink'] = this.nextLink;
		}
		if (this.count) {
			retValue.d.__count = this.count;
		}

		retValue.d.results = [];
		this.data.forEach(function (obj, idx) {
			var tmpObj = obj.toJSON();
			tmpObj.__metadata = obj.__data.__metadata;
			retValue.d.results.push(tmpObj)
		});

		return retValue;
	};
}

/**
 * This is the return type of a entity request in OData V2
 */
export class EntityResult {
	data:any;

	constructor() {
	};

	/**
	 * Returns the result for a collection request. This looks like
	 * <pre><code>
	 * {
   *   "d": {
   *     "__metadata": {
   *       "uri": "https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/SOHeaders('0000000001')",
   *       "type": "SALESORDERXX.SOHeader"
   *     },
   *     "OrderId": "0000000001",
   *     "DocumentType": "TA",
   *     "DocumentDate": "/Date(1297382400000)/",
   *     "CustomerId": "0000100001",
   *     "SOItems": {
   *       "__deferred": {
   *         "uri": "https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/SOHeaders('0000000001')/SOItems"
   *       }
   *     }
   *   }
   * }
	 * </code></pre>
	 * @returns {{d: any}}
	 **/
	getRequestResult():any {
		var retValue:{d: any} = {d: {}};
		retValue.d = this.data;

		return retValue;
	};
}

/**
 * This is the return type of a service document in OData V2
 */
export class ServiceDocumentResult {
	data:any;

	constructor() {
	};

	/**
	 * Returns the result for a collection request. This looks like
	 * <pre><code>
	 * {
   *   "d": {
   *     "EntitySets": [
   *       "SOHeaders",
   *       "SOItems"
   *     ]
   *   }
   * }
	 * </code></pre>
	 * @returns {{d: any}}
	 **/
	getRequestResult():any {
		var retValue:{d: any} = {d: {}};
		retValue.d.EntitySets = this.data;

		return retValue;
	};
}

export class ODataGetBase extends BaseRequestHandler.BaseRequestHandler {
	constructor() {
		super()
	};

	/**
	 * Get all records for a collection. The name of the collection
	 * is given in the 1st request parameter
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	_getCollectionData(req, res) {
		return new Promise((resolve, reject) => {
			//DONE: The odata.nextLink annotation MUST be included in a response that represents a partial result. "@odata.nextLink": "...?$skiptoken=342r89"
			commons.getModelClass(req.app, req.params[0]).then((ModelClass:any) => {
				try {
					if (ModelClass) {
						// Retrieve odata.maxpagesize from Prefer header of the request
						var _maxpagesize;
						var reqHeaderArr = req_header.getPreferHeader(req);
						reqHeaderArr.forEach(function (obj, idx, arr) {
							if (obj[0] === 'maxpagesize') {
								_maxpagesize = obj[1];
							}
						});

						var filter:LoopbackFilter = {};
						//TODO: apply $filter parameter
						filter = _applyFilter.call(this, req, filter);

						//TODO: apply $search parameter

						// if user appended the $count parameter she just wants the number of records
						// after filter and search has been applied
						if (req.query.$count !== undefined) {
							if (req.accepts("text/plain")) {
								ModelClass.count(filter, function (err, count) {
									res.set('Content-Type', 'text/plain');
									res.send(count.toString());
								})
							} else {
								res.sendStatus(415)
							}
						} else {
							// here we do the main work if the user wants data from a collection
							var nextLink;

							// retrieve only top=xx records
							if (req.query.$top) {
								filter.limit = req.query.$top;
							}
							// the implementation of $skiptoken is service specific. We define that $skiptoken behaves like $skip
							if (req.query.$skip || req.query.$skiptoken) {
								filter.skip = req.query.$skip || req.query.$skiptoken;
							}
							// adjust the number of records that are returned according to the maxpagesize setting, either by client
							// or by the server application
							if (!filter.limit || filter.limit > this.oDataServerConfig.maxpagesize || (_maxpagesize && filter.limit > _maxpagesize)) {
								var tmpMaxSize = this.oDataServerConfig.maxpagesize;
								if (_maxpagesize && tmpMaxSize && parseInt(_maxpagesize) < parseInt(tmpMaxSize)) {
									tmpMaxSize = _maxpagesize;
								}
								// if limit has not been set yet we have to add a nextLink property to the response to enable the user to automatically
								// page to the next chunk of data
								if (!filter.limit) {
									var _skiptoken:number = req.query.$skiptoken;
									_skiptoken = (!isNaN(_skiptoken) ? _skiptoken + parseInt(tmpMaxSize) : parseInt(tmpMaxSize));
									nextLink = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '?$skiptoken=' + _skiptoken;
									// if nextLink is set, means we deliver partially response, we need to know if there would be more data
									// if the nextLink is processed. If the current data chunk is the last one we MUST NOT set the nextLink into
									// the response
									if (nextLink) {
										var nlFilter:any = {};
										nlFilter.skip = _skiptoken;
										nlFilter.limit = 1;	// just need to test if there is at least one more record
										// TODO: uiii, this hast to be moved to the promise chain a few lines down cause asynchronosy it's not
										// said that nextlink is detemined before the other db calls.
										ModelClass.find(nlFilter, function (err, data) {
											if (data.length === 0) {
												nextLink = undefined;
											}
										});
									}

									// set the filter limit to the calculated maxSize
									filter.limit = tmpMaxSize;
									res.set('Preference-Applied', 'odata.maxpagesize=' + tmpMaxSize);
								}
							}

							// apply $select URL parameter
							filter = _applySelect.call(this, req, filter);

							// apply $expand URL parameter
							filter = _applyExpand.call(this, req, filter);

							console.log("filter: " + JSON.stringify(filter));

							// Now we call the find method of the ModelClass with filter definition
							var result:CollectionResult = new CollectionResult();
							ModelClass.find(filter).then(function (data) {
								// add metadata
								data.forEach(function (object, idx, arr) {
									object.__data.__metadata = {
										uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + object.getId() + ')',
										type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
									};
								});
								// add retrieved data from backend / db
								result.data = data;
								if (nextLink) {
									result.nextLink = nextLink;
								}
								return result;
							}).then(function (result) {
								// if $inlinecount was requested we have to count all records in the database
								if (req.query.$inlinecount) {
									ModelClass.count().then(function (resultCount) {
										result.count = resultCount;
										resolve(result);
									})
								} else {
									resolve(result);
								}
							});


							//ModelClass.find(filter, function (err, data) {
							//	var result:CollectionResult = new CollectionResult();
							//
							//	//// if $inlinecount was requested we have to count all records in the database
							//	//if(req.query.$inlinecount) {
							//   //
							//	//}
							//
							//	result.data = data;
							//	if (nextLink) {
							//		result.nextLink = nextLink;
							//	}
							//	resolve(result);
							//	//cb(result, data);
							//});
						}
					} else {
						reject(Error("request failed"));
						//res.sendStatus(404);
					}
				} catch (e) {
					reject(e);
				}
			}, (error) => {
				reject(Error(error));
			})
		});
	};

	/**
	 * Retrieves the total number of records for a collection in the data store
	 * @param req
	 * @param res
	 * @returns {Promise}
     * @private
     */
	_getCollectionCount(req, res) {
		return new Promise((resolve, reject) => {
			var arrParams0 = req.params[0].split('/');
			if (arrParams0 && arrParams0[arrParams0.length - 1] === '$count') {
				// the collection has to be in the first part of params
				commons.getModelClass(req.app, arrParams0[0]).then((ModelClass:any) => {
					if (ModelClass) {
						if (req.accepts("text/plain")) {
							ModelClass.count().then(function (count) {
								resolve(count);
							})
						} else {
							reject(415);
						}
					}
				})
			} else {
				reject(Error("bad request"));
			}
		})
	};



	/**
	 * Get the data for exactly one object of an entity type
	 * @param req
	 * @param res
	 * @private
	 */
	_getEntityData(req, res) {
		return new Promise((resolve, reject) => {
			var param0 = req.params[0];
			// extract the id from the request
			var id = commons.getIdFromUrlParameter(param0);
			var collection = param0.substr(0, param0.indexOf('('));
			commons.getModelClass(req.app, param0).then((ModelClass:any) => {
				if (ModelClass) {
					// apply $select URL parameter
					var filter = _applySelect(req);

					ModelClass.findById(id, filter, function (err, instance) {
						if (err) {
							reject(err);
						} else {
							if (instance) {
								var result:EntityResult = new EntityResult();
								result.data = instance.toJSON();
								resolve(result);
							} else {
								console.error('entity data for request ' + req.originalUrl + ' was not found');
								reject(404);
							}
						}
					});
				} else {
					reject(404);
				}
			})
		});
	}

	/**
	 * Returns the service document of this service
	 * The service document displays all entitysets, functions, Singletons, ... that the service
	 * exposes
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	_getServiceDocument(req, res) {
		return new Promise((resolve, reject) => {
			var json = [];

			var models = req.app.models();
			models.forEach(function (model) {
				var modelObj:any = {};
				var plural = commons.getPluralForModel(model);
				modelObj.name = plural;
				modelObj.url = plural;
				json.push(modelObj);
			});

			var serviceDocumentResult = new ServiceDocumentResult();
			serviceDocumentResult.data = json;
			resolve(serviceDocumentResult);
		})
	}

}


/**
 * Applies the $select URL parameter that may be defined on the URL to the filter object of loopback find.
 * @param req
 * @param filter
 * @returns {filter}
 * @private
 */
function _applySelect(req, filter?:LoopbackFilter) {
	var selectList = req.query.$select;
	filter = filter || {};
	if (selectList) {
		// * means: give me all field which is loopback default
		if (selectList !== '*') {
			var arr = selectList.split(',');
			var fields = filter.fields || {};
			arr.forEach(function (obj, idx, array) {
				fields[obj] = true;
			});
			filter.fields = fields;
		}
	}
	return filter;
}

/**
 * Applies the $filter URL parameter that may be defined on the URL to the filter object of loopback find.
 * @param req
 * @param {LoopbackFilter} filter the loopback filter object
 * @returns {LoopbackFilter} the injected filter parameter exceeded by the filter values
 * @private
 */
function _applyFilter(req, filter?:LoopbackFilter):LoopbackFilter {
	var filterParam:string = req.query.$filter;
	filter = filter || {}; // just to ensure that filter can't be undefined
	if (filterParam) {
		var filterString:string = "$filter=" + filterParam;
		// parse the filterString into an ast
		var ast:any = parser.parse(filterString);
		if (ast.error) {
			throw new Error(ast.error);
		}
		filter.where = _convertAstToLoopbackFilter(ast.$filter, filter.where);
	}
	return filter;
}

/**
 * Applies the $select URL parameter that may be defined on the URL to the filter object of loopback find.
 * @param req
 * @param filter
 * @returns {filter}
 * @private
 */
function _applyExpand(req, filter?:LoopbackFilter) {
	var expandParam = req.query.$expand;
	filter = filter || {};
	if (expandParam) {
		var expandString:string = "$expand=" + expandParam;
		// parse the expandString into an ast
		var ast:any = parser.parse(expandString);
		if (ast.error) {
			throw new Error(ast.error);
		}
		filter.include = [];
		ast.$expand.forEach(function(obj) {
			if(obj.indexOf('/') > -1) {
				var objArr = obj.split('/');
				var incl = {};
				incl[objArr[0]] = objArr[1]
				filter.include.push(incl);
			} else {
				filter.include.push(obj);
			}
		})
	}
	return filter;
}

/**
 * converts the ast delivered by the odata parser into a loopback filter where expression
 * @param ast
 * @param where
 * @returns {any}
 * @private
 */
function _convertAstToLoopbackFilter(ast:any, where:any):any {
	where = where || {};
	switch (ast.type) {
		case 'eq':
		case 'ne':
		case 'gt':
		case 'ge':
		case 'lt':
		case 'le':
			if (ast.left.type === 'property' && ast.right.type === 'literal') {
				if (ast.type === 'ne')  ast.type = 'neq';
				if (ast.type === 'ge')  ast.type = 'gte';
				if (ast.type === 'le')  ast.type = 'lte';

				if (ast.type === 'eq') {
					where[ast.left.name] = ast.right.value;
				} else {
					where[ast.left.name] = {};
					where[ast.left.name][ast.type] = ast.right.value;
				}
			} else if (ast.left.type === 'functioncall') {
				// if functioncall is made in a form like $filter=startswith(ContactTitle, 'Order') eq true
				// it is deliverd on the left side of the ast. On the right side eq true is delivered
				var propName = _getPropertyFromAstFunction(ast.left);
				if (propName) {
					where[propName] = _convertAstToRegexp(ast);
				}
			}
			break;

		case 'functioncall':
			// if functioncall is made in a form like $filter=startswith(ContactTitle, 'Order')
			// it is deliverd as own ast branch, there is no left or right
			var propName = _getPropertyFromAstFunction(ast);
			if (propName) {
				where[propName] = _convertAstToRegexp(ast);
			}
			break;

		case 'and':
			where.and = [];
			where.and.push(_convertAstToLoopbackFilter(ast.left, null));
			where.and.push(_convertAstToLoopbackFilter(ast.right, null));
			break;

		case 'or':
			where.or = [];
			where.or.push(_convertAstToLoopbackFilter(ast.left, null));
			where.or.push(_convertAstToLoopbackFilter(ast.right, null));
			break;

		// TODO: operators (parenthesis) for grouping come in another format from the parser, have to find a solution later.
		case '(':
			break;

		// TODO: not is currently not parsed by the parser and I have to investigate how to express the logical not in loopback.
		case 'not':
			break;

		default:
			throw new Error('something went wrong. \'' + ast.type + '\' is not a supported query type.');
			break;
	}

	return where;
}

/**
 * get the property of the functioncall. The property is the field name that has to be searched for in the
 * loopbacke data store
 * @param ast
 * @returns {string}
 * @private
 */
function _getPropertyFromAstFunction(ast:any):string {
	var retValue:string = undefined;
	// the functions always are on the left side of the ast, the function arguments are in an array args
	if (ast.type === 'functioncall') {
		ast.args.forEach((obj:any) => {
			if (obj.type === 'property') {
				retValue = obj.name;
			}
		});
	}
	return retValue;
}

/**
 * get the search value (literal) from the args of the odata ast
 * @param args
 * @returns {string}
 * @private
 */
function _getSearchLiteralFromAstFunction(args:any[]):string {
	var retValue:string = undefined;
	args.forEach((obj:any) => {
		if (obj.type === 'literal') {
			retValue = obj.value;
		}
	});
	return retValue;
}

/**
 * converts the abstract syntax tree delivered by the odata parser into a regular expression that can be
 * interpreted by loopback to retrieve the data from the data store
 * @param ast
 * @returns {{regexp: string}}
 * @private
 */
function _convertAstToRegexp(ast:any):any {
	var searchValue:string = undefined;
	// if functioncall is made in a form like $filter=startswith(ContactTitle, 'Order') eq true
	// it is deliverd on the left side of the ast. On the right side eq true is delivered
	// if functioncall is made in a form like $filter=startswith(ContactTitle, 'Order') there is no left and no
	// right side. We push the whole ast to the left side so that we can treat both cased in the same way.
	// This is a trick but it works.
	var bAddedLeft: boolean = false;
	if(ast.left === undefined) {
		ast.left = ast;
		bAddedLeft = true;
	}

	// the functions always are on the left side of the ast, the function arguments are in an array args
	if (ast.left.type === 'functioncall') {
		switch (ast.left.func) {
			case 'substringof':
				if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
					searchValue = '/' + _getSearchLiteralFromAstFunction(ast.left.args) + '/';
				} else {
					// negate the search
					searchValue = '/^((?!(' + _getSearchLiteralFromAstFunction(ast.left.args) + ')).)*$/'
				}
				break;

			case 'endswith':
				if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
					searchValue = '/' + _getSearchLiteralFromAstFunction(ast.left.args) + '$/';
				} else {
					// negate the search
					searchValue = '/^((?!(' + _getSearchLiteralFromAstFunction(ast.left.args) + '$)).)*$/'
				}
				break;

			case 'startswith':
				if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
					searchValue = '/^' + _getSearchLiteralFromAstFunction(ast.left.args) + '/';
				} else {
					// negate the search
					searchValue = '/^((?!(^' + _getSearchLiteralFromAstFunction(ast.left.args) + ')).)*$/'
				}
				break;

			case 'length':
				if (ast.right !== undefined && ast.right.value !== undefined && ast.right.type === 'literal') {
					if (ast.type === 'eq') {
						searchValue = '/^.{' + ast.right.value + '}$/';
					} else if (ast.type === 'ne') {
						searchValue = '/^(.{0,' + (ast.right.value - 1) + '}|.{' + (ast.right.value + 1) + '})$/';
					} else if (ast.type === 'gt') {
						searchValue = '/^(.{' + (ast.right.value + 1) + ',})$/';
					} else if (ast.type === 'ge') {
						searchValue = '/^(.{' + (ast.right.value) + ',})$/';
					} else if (ast.type === 'lt') {
						searchValue = '/^(.{0,' + (ast.right.value - 1) + '})$/';
					} else if (ast.type === 'le') {
						searchValue = '/^(.{0,' + (ast.right.value) + '})$/';
					}
				} else {
					throw new Error('function ' + ast.left.func + ' requires a value to compare with');
				}
				break;

			//TODO: function indexof has to be implemented
			case 'indexof':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function replace has to be implemented
			case 'replace':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function substring has to be implemented
			case 'substring':
				if (ast.right !== undefined && ast.right.value !== undefined && ast.right.type === 'literal') {
					if (ast.type === 'eq') {
						searchValue = '/^.{' + _getSearchLiteralFromAstFunction(ast.left.args) + '}' + ast.right.value + '$/';
					} else if (ast.type === 'ne') {
						throw new Error('function ' + ast.left.func + ' with operator ' + ast.type + ' not implemented yet');
					}
				} else {
					throw new Error('function ' + ast.left.func + ' requires a value to compare with');
				}
				break;

			//TODO: function tolower has to be implemented
			case 'tolower':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function toupper has to be implemented
			case 'toupper':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function trim has to be implemented
			case 'trim':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function concat has to be implemented
			case 'concat':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function day has to be implemented
			case 'day':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function hour has to be implemented
			case 'hour':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function minute has to be implemented
			case 'minute':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function month has to be implemented
			case 'month':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function second has to be implemented
			case 'second':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function year has to be implemented
			case 'year':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function round has to be implemented
			case 'round':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function floor has to be implemented
			case 'floor':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function ceiling has to be implemented
			case 'ceiling':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			//TODO: function IsOf has to be implemented
			case 'IsOf':
				throw new Error('function ' + ast.left.func + ' not implemented yet');
				break;

			default:
				throw new Error('function ' + ast.left.func + ' not found');
				break;
		}
	}

	// delete the left property if it was inserted at the top of this function
	if(bAddedLeft) {
		delete ast.left;
	}

	return {regexp: searchValue};
}
