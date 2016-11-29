/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by helmut on 01.12.15.
 */

import parser = require('odata-parser');
import BaseRequestHandler = require('../BaseRequestHandler');
import commons = require('../../common/odata_common');
import constants = require('../../constants/odata_constants');
import req_header = require('../../common/odata_req_header');
import {LoopbackFilter} from "../../types/loopbacktypes";
import {EntityResult} from "../BaseRequestHandler";
import {LoopbackRelationDefinition} from "../../types/loopbacktypes";
import {LoopbackModelClass} from "../../types/loopbacktypes";
import {RequestModelClass} from "../../types/n_odata_types";
import {Request} from "express-serve-static-core";
import {Response} from "express-serve-static-core";
import {ODataType} from "../../constants/odata_enums";

/** Interface for metadata of OData */
interface Metadata {
	uri:String,
	type:String,
	etag?:String
}

export interface CollectionResultResult {
	results:{[index:number]:any};
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
		var retValue:{d:any} = {d: {}};
		if (this.nextLink) {
			retValue.d['@odata.netxtLink'] = this.nextLink;
		}
		if (this.count) {
			retValue.d.__count = this.count;
		}

		retValue.d.results = [];
		this.data.forEach(function (obj, idx) {
			var tmpObj = obj.toJSON();
			for (var prop in tmpObj) {
				// convert dates into OData date format
				if (tmpObj[prop] instanceof Date) {
					tmpObj[prop] = "/Date(" + tmpObj[prop].getTime() + ")/"
				} else {
					this.handleDateExpandedProperties(tmpObj[prop]);
				}
			}

			tmpObj.__metadata = obj.__data.__metadata;

			//Loop responsible to add metadata section in all expanded properties
			for (var expanded in tmpObj) {
				if (tmpObj[expanded] instanceof Object || tmpObj[expanded] instanceof Array) {
					this.handleMetadataInExpanded(obj.__data[expanded].__data, tmpObj[expanded]);
				}
			}
			retValue.d.results.push(tmpObj)
		}.bind(this));

		return retValue;
	};

	/**
	 * This method is a workaround to show __metadata properties
	 * By default the method .toJSON() exclude all properties starting with "__"
	 * This routine receives the JSON converted and the object before conversion to move the
	 * __metadata properties
	 *
	 * The method is recursive to ensure that deep expanded properties will be covered
	 *
	 * @param oOriginalData     Original data before toJSON() conversion
	 * @param oExpanded         Object after conversion toJSON()
	 */
	private handleMetadataInExpanded(oOriginalData:any, oExpanded:any):void {
		for (var property in oOriginalData) {
			if (property === "__metadata") {
				oExpanded.__metadata = oOriginalData[property];
			} else {
				if (!(oOriginalData[property] instanceof Date)) {
					if (oOriginalData[property] instanceof Object || oOriginalData[property] instanceof Array) {
						this.handleMetadataInExpanded(oOriginalData[property].__data, oExpanded[property]);
					}
				}
			}
		}
	};

	/**
	 * This method is responsible to check recursively if have any Date property in a
	 * expanded entity (or deep)
	 * @param oExpanded     Expandend object
	 */
	private handleDateExpandedProperties(oExpanded:any):void {
		if (oExpanded instanceof Array) {
			for (var expanded in oExpanded) {
				for (var property in oExpanded[expanded]) {
					if (oExpanded[expanded][property] instanceof Date) {
						oExpanded[expanded][property] = "/Date(" + oExpanded[expanded][property].getTime() + ")/";
					} else {
						if (oExpanded[expanded][property] instanceof Array || oExpanded[expanded][property] instanceof Object) {
							this.handleDateExpandedProperties(oExpanded[expanded][property]);
						}
					}
				}
			}
		} else if (oExpanded instanceof Object) {
			for (var property in oExpanded) {
				if (oExpanded[property] instanceof Date) {
					oExpanded[property] = "/Date(" + oExpanded[property].getTime() + ")/";
				}
				else {
					if (oExpanded[property] instanceof Array || oExpanded[property] instanceof Object) {
						this.handleDateExpandedProperties(oExpanded[property]);
					}
				}

			}
		}
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
		var retValue:{d:any} = {d: {}};
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
			commons.getRequestModelClass(req.app.models as Function, req.params[0] as string).then((function (oResult:RequestModelClass) {
				var ModelClass = oResult.modelClass;
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
						if (oResult.foreignKeyFilter) {
							if (!filter.where) {
								filter.where = oResult.foreignKeyFilter;
							} else {
								filter.where = {"and": [filter.where, oResult.foreignKeyFilter]};
							}
						}
						//TODO: apply $search parameter

						// if user appended the $count parameter she just wants the number of records
						// after filter and search has been applied
						if (req.query.$count !== undefined) {
							if (req.accepts("text/plain")) {
								let oCountFilter:any = filter.where;
								ModelClass.count(oCountFilter, function (err, count) {
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
								let effectiveMaxSize = this.oDataServerConfig.maxpagesize;
								if (_maxpagesize && effectiveMaxSize && parseInt(_maxpagesize) < parseInt(effectiveMaxSize)) {
									effectiveMaxSize = _maxpagesize;
								}
								// if limit has not been set yet we have to add a nextLink property to the response to enable the user to automatically
								// page to the next chunk of data
								if (!filter.limit) {
									var _skiptoken:number = req.query.$skiptoken;
									_skiptoken = (!isNaN(_skiptoken) ? _skiptoken + parseInt(effectiveMaxSize) : parseInt(effectiveMaxSize));
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
									filter.limit = effectiveMaxSize;
									res.set('Preference-Applied', 'odata.maxpagesize=' + effectiveMaxSize);
								}
							}

							// apply $select URL parameter
							filter = _applySelect.call(this, req, filter);
							// apply $expand URL parameter
							filter = _applyExpand.call(this, req, filter);
							console.log("filter: " + JSON.stringify(filter));

							// apply $orderBy
							filter = _applyOrderBy.call(this, req, filter);


							// Now we call the find method of the ModelClass with filter definition
							var result:CollectionResult = new CollectionResult();
							ModelClass.find(filter).then(((data) => {
								// add metadata
								data.forEach(((object, idx, arr) => {
									var propertyType = commons.convertType(ModelClass.definition._ids[0].property);
									switch (propertyType) {
										case ODataType.EDM_DECIMAL:
										case ODataType.EDM_INT32:
											object.__data.__metadata = {
												uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + object.getId() + ')',
												type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
											};
											break;
										default:
											object.__data.__metadata = {
												uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + object.getId() + '\')',
												type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
											};
											break;
									}
									// add deferred relations
									for (var rel in ModelClass.relations) {
										this._createDeferredObject(object, rel, req, ModelClass, object.getId());
									}

									//create metadata for expanded
									for (var rel in ModelClass.relations) {
										this._createMetadataForExpanded(object, rel, req, ModelClass.relations[rel].modelTo, object.getId(), data);
									}
								}).bind(this));
								// add retrieved data from backend / db to the result
								result.data = data;
								if (nextLink) {
									result.nextLink = nextLink;
								}
								return result;
							}).bind(this)).then(function (result) {
								// if $inlinecount was requested we have to count all records in the database
								if (req.query.$inlinecount) {
									ModelClass.count().then(function (resultCount) {
										//noinspection TypeScriptUnresolvedVariable
										result.count = resultCount;
										resolve(result);
									})
								} else {
									resolve(result);
								}
							}).catch(err => {
								console.error(err);
								reject(err);
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
			}).bind(this), (error) => {
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
				commons.getRequestModelClass(req.app.models, req.params[0]).then((oResult:RequestModelClass) => {
					let ModelClass = oResult.modelClass;
					if (ModelClass) {
						if (req.accepts("text/plain")) {
							var filter:any = {}; //LoopbackFilter.where
							//TODO: apply $filter parameter
							filter = _applyFilter.call(this, req, filter);
							if(oResult.foreignKeyFilter) {
								if(!filter) {
									filter = oResult.foreignKeyFilter;
								} else {
									filter = { "and" : [filter.where, oResult.foreignKeyFilter]};
								}
							}else{
								filter = filter.where;
							}

							ModelClass.count(filter, function(err, count) {
								if (!err) {
									resolve(count);
								} else {
									reject(err);
								}
							})
						} else {
							reject(415);
						}
					} else {
						reject(415);
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
			let param0:string = req.params[0];
			let arrParamToken:Array<string> = param0.split("/");
			commons.getRequestModelClass(req.app.models, req.params[0]).then(((oResult:RequestModelClass) => {
				let ModelClass = oResult.modelClass;
				let id;
				if (oResult.foreignKeyFilter) {
					id = oResult.foreignKeyFilter[Object.keys(oResult.foreignKeyFilter)[0]];
				} else {
					id = oResult.requestId;
				}
				if (ModelClass) {
					// apply $select URL parameter
					let filter = _applySelect(req);
					// apply $expand URL parameter
					filter = _applyExpand.call(this, req, filter);


					_findInstanceByIdOrForeignkey.call(this, ModelClass, id, filter, oResult).then(((instance) => {
						//ModelClass.findById(id, filter).then( ((instance) => {
						if (instance && instance[0]) {
							// if instance is an array it was searched via the foreignKey. Cause we expect a single instance
							// we can work with we reject the promise in case we get more than one instance objects
							if (instance.length > 1) {
								reject("It was expected to find a single instance but the resultset contains " + instance.length + " objects");
							} else {
								instance = instance[0];
							}

							// Handling $links
							if (arrParamToken[1] === "$links") {
								var result:EntityResult = new EntityResult();
								// retrieve the relations from the ModelClass instance
								instance[arrParamToken[2]]((err, res) => {
									if (err) {
										console.error(err);
										reject(500);
									} else {
										console.log(res);
										var relDefinition:LoopbackRelationDefinition = ModelClass.relations[arrParamToken[2]];
										var modelTo:LoopbackModelClass = relDefinition.modelTo;
										result.value = [];
										res.forEach((obj, idx, arr) => {
											var url = commons.getBaseURL(req) + '/' + modelTo.pluralModelName + '(' + obj.getId() + ')'
											result.value.push({url: url});
										});
										resolve(result);
									}
								});

							} else {
								// add deferred relations
								for (var rel in ModelClass.relations) {
									this._createDeferredObject(instance, rel, req, ModelClass, id);
								}
								// Handling regular Entity requests
								var result:EntityResult = new EntityResult();
								result.data = instance.toJSON();

								//create metadata for expanded
								for (var rel in ModelClass.relations) {
									this._createMetadataForExpanded(instance, rel, req, ModelClass.relations[rel].modelTo, id, result.data);
								}

								//add metadata
								let propertyType:ODataType = commons.convertType(ModelClass.definition._ids[0].property)
								let sKey:string;
								switch (propertyType) {
									case ODataType.EDM_DECIMAL:
									case ODataType.EDM_INT32:
										sKey = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + id + ')';
										break;
									default:
										sKey = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + id + '\')';
										break;
								}

								result.data.__metadata = {
									uri: sKey,
									type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
								};
								resolve(result);
							}
						} else {
							console.error('entity data for request ' + req.originalUrl + ' was not found');
							reject(404);
						}
					}).bind(this)).catch(err => {
						reject(err);
					});

				} else {
					reject(404);
				}
			}).bind(this), (error) => {
				reject(Error(error));
			});
		});
	}

	/**
	 * Helper method for generating a metadata in deferred entry
	 *
	 * This method is responsible to apply metadata section for all expanded properties recursively
	 * The basic flow is:
	 * 1) Check if is a collection or an single entity request
	 * 2) Loop at all properties searching for expand navigation properties
	 * 3) Add the metadata section for the navigation property found in step 2
	 * 4) Check if have more navigation properties inside the the navigation property found in step 2
	 * 5) If it haves, call this method again recursively updating the data to the deep navigation
	 *
	 * @param instance      Relation's target model instance
	 * @param rel           Relation's target name
	 * @param req           Requisition object
	 * @param ModelClass    Class model of original model (not expanded)
	 * @param id            ObjectID of relation's target model
	 * @param expandedData  Relation's target data object
	 * @private
	 */
	_createMetadataForExpanded = function (instance, rel, req, ModelClass, id, expandedData) {
		//check if the expanded data is a collection
		if (expandedData instanceof Array) {
			if (expandedData.length === 0) { //if we have expanded data empty, no metadata is needed
				return;
			} else {
				/*
				 This section will loop in all individual result in expanded data and check the key type
				 to create the entity metadata.
				 After the metadata create, it's necessary loop in all properties to check others expanded attributes
				 */
				for (var i in expandedData) {
					let oItem = expandedData[i].__data;

					//deferred properties don't have metadata section
					if (typeof oItem[rel] === "undefined") continue;
					if (oItem[rel].__deferred) continue;

					//individual result metadata (key type check to insert 'key' or not.
					var propertyType:ODataType = commons.convertType(ModelClass.definition._ids[0].property);
					switch (propertyType) {
						case ODataType.EDM_DECIMAL:
						case ODataType.EDM_INT32:
							if (oItem[rel].__data instanceof Array) {
								//if we have a collection, insert just one entity
								oItem[rel].__data.map(function (oData) {
									oData.__data.__metadata = {
										uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + oData.id + ')',
										type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
									};
									return oData;
								});
							} else {
								//check if we don't have a empty result or undefined ObjectID
								if (typeof oItem[rel].__data !== "undefined" && typeof oItem[rel].__data.id !== "undefined") {
									//using map to insert in all items
									oItem[rel].__data.__metadata = {
										uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + oItem[rel].__data.id + ')',
										type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
									};
								}
							}
							break;
						default:
							if (oItem[rel].__data instanceof Array) {
								//if we have a collection, insert just one entity
								oItem[rel].__data.map(function (oData) {
									oData.__data.__metadata = {
										uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + oData.id + '\')',
										type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
									};
									return oData;
								});
							} else {
								//check if we don't have a empty result or undefined ObjectID
								if (typeof oItem[rel].__data !== "undefined" && typeof oItem[rel].__data.id !== "undefined") {
									//using map to insert in all items
									oItem[rel].__data.__metadata = {
										uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + oItem[rel].__data.id + '\')',
										type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
									};
								}
							}
							break;
					}
					/*
					 This part is a recursion responsible to process all other expands possible in properties
					 It's loop in all properties searching for other expands that are Objects or Arrays
					 */
					for (var sProp in oItem[rel].__data) {
						//no metadata and deffered needs to be processed
						if (sProp === "__metadata" || sProp === "__deferred") continue;

						let oPropValue:any = oItem[rel].__data[sProp];

						//checking if the property is another expand property (collection or single entry)
						if (oPropValue instanceof Object && !(oPropValue instanceof Date )) {
							//if is a single entry, call recursively
							this._createMetadataForExpanded(oItem[rel].__data, sProp, req, ModelClass.relations[sProp].modelTo, oPropValue.__data.id, oPropValue.__data);
						} else if (oPropValue instanceof Array) {
							for (var iExpandedItem in oPropValue.__data) {
								//if is a collection, call recursively for each collection member
								this._createMetadataForExpanded(oItem[rel].__data, sProp, req, ModelClass.relations[sProp].modelTo, oPropValue.__data[iExpandedItem].id, oPropValue.__data[iExpandedItem]);
							}
						}
					}
				}

			}

		} else { // if is not a collection, it's a single entity (logic based on array)
			let oModelData:any;

			if (typeof expandedData[rel] === "undefined") {
				oModelData = expandedData;
			} else {
				oModelData = expandedData[rel];
			}

			if (oModelData.__deferred) { //deferred don't needs metadata
				return;
			}
			/*
			 This part is a recursion responsible to process all other expands possible in properties
			 It's loop in all properties searching for other expands that are Objects or Arrays
			 */
			if (oModelData instanceof Array) {
				//If it's an Array, the metadata needs to be inside each one
				for (var i in oModelData) {
					//TODO: Modularize the metadata key creation process in commons library
					var propertyType:ODataType = commons.convertType(ModelClass.definition._ids[0].property);
					switch (propertyType) {
						case ODataType.EDM_DECIMAL:
						case ODataType.EDM_INT32:
							oModelData[i].__metadata = {
								uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + oModelData[i].id + ')',
								type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
							};
							break;
						default:
							oModelData[i].__metadata = {
								uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + oModelData[i].id + '\')',
								type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
							};
							break;
					}

					var oData = oModelData[i];

					for (var sProp in oData) {
						//no metadata and deffered needs to be processed
						if (sProp === "__metadata" || sProp === "__deferred") continue;

						let oPropValue:any = oData[sProp];

						//checking if the property is another expand property (collection or single entry)
						if (oPropValue instanceof Object && !(oPropValue instanceof Date )) {
							//if is a single entry, call recursively
							this._createMetadataForExpanded(oData, sProp, req, ModelClass.relations[sProp].modelTo, oPropValue.id, oPropValue);
						} else if (oPropValue instanceof Array) {
							//if is a collection, call recursively for each collection member
							for (var iExpandedItem in oPropValue) {
								this._createMetadataForExpanded(oData, rel, req, ModelClass, id, oPropValue[iExpandedItem]);
							}
						}
					}
				}
			} else if (oModelData instanceof Object) {
				//if it's a single entry, metadata needs to be at the end
				//TODO: Modularize the metadata key creation process in commons library
				var propertyType:ODataType = commons.convertType(ModelClass.definition._ids[0].property);
				switch (propertyType) {
					case ODataType.EDM_DECIMAL:
					case ODataType.EDM_INT32:
						oModelData.__metadata = {
							uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + oModelData.id + ')',
							type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
						};
						break;
					default:
						oModelData.__metadata = {
							uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + oModelData.id + '\')',
							type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
						};
						break;
				}

				for (var sProp in oModelData) {
					//no metadata and deffered needs to be processed
					if (sProp === "__metadata" || sProp === "__deferred") continue;

					let oPropValue:any = oModelData[sProp];

					//checking if the property is another expand property (collection or single entry)
					if (oPropValue instanceof Object && !(oPropValue instanceof Date )) {
						//if is a single entry, call recursively
						this._createMetadataForExpanded(oModelData, sProp, req, ModelClass.relations[sProp].modelTo, oPropValue.id, oPropValue);
					} else if (oPropValue instanceof Array) {
						//if is a collection, call recursively for each collection member
						for (var iExpandedItem in oPropValue) {
							this._createMetadataForExpanded(oModelData, rel, req, ModelClass, id, oPropValue[iExpandedItem]);
						}
					}
				}
			}


		}
	};

	/**
	 * Helper method for generating a deferred entry
	 * @param instance
	 * @param rel
	 * @param req
	 * @param ModelClass
	 * @param id
	 * @private
	 */
	_createDeferredObject(instance:{__data:any}, rel:string, req:any, ModelClass:any, id:any) {
		if (!instance.__data[rel]) {
			var propertyType:ODataType = commons.convertType(ModelClass.definition._ids[0].property);
			switch (propertyType) {
				case ODataType.EDM_DECIMAL:
				case ODataType.EDM_INT32:
					instance.__data[rel] = {
						__deferred: {
							uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + id + ')/' + rel
						}
					};
					break;
				default:
					instance.__data[rel] = {
						__deferred: {
							uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + id + '\')/' + rel
						}
					};
					break;
			}
		}
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
 * Find a single model instance either by id or by foreignKey. If a foreignKey is defined in oReqQueryObject then
 * this function will try to find the object via a foreignKey search. Otherwise it will search by using findById.
 * @param ModelClass
 * @param id
 * @param filter
 * @param oReqQueryObject
 * @returns {Promise}
 * @private
 */
function _findInstanceByIdOrForeignkey(ModelClass:LoopbackModelClass, id:any, filter:LoopbackFilter, oReqQueryObject:RequestModelClass) {
	return new Promise((resolve, reject) => {
		if (oReqQueryObject.foreignKeyFilter) {
			ModelClass.find({where: oReqQueryObject.foreignKeyFilter}).then(((instances) => {
				resolve(instances);
			})).catch((err) => {
				reject(err);
			});
		} else {
			ModelClass.findById(id, filter).then(((instance) => {
				resolve([instance]);
			})).catch((err) => {
				reject(err);
			});
		}
	});
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
	let filterParam:string = req.query && req.query.$filter || undefined;
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
		ast.$expand.forEach(function (obj) {
			if (obj.indexOf('/') > -1) {
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
 * Applies the $orderby URL parameter for sorting the resultset
 * @param req
 * @param filter
 * @private
 */
function _applyOrderBy(req, filter?:LoopbackFilter) {
	var orderByParam = req.query.$orderby;
	filter = filter || {};
	if (orderByParam) {
		var orderString:string = "$orderby=" + orderByParam;
		// parse the expandString into an ast
		var ast:any = parser.parse(orderString);
		if (ast.error) {
			throw new Error(ast.error);
		}
		filter.order = [];
		ast.$orderby.forEach(function (obj) {

			//// does not work at the moment: ODataParser seems to have a problem here
			//if(obj.indexOf('/') > -1) {
			//	var objArr = obj.split('/');
			//	var incl = {};
			//	incl[objArr[0]] = objArr[1]
			//	filter.order.push(incl);
			//} else {
			for (var prop in obj) {
				var str:string = prop;
				str += " " + obj[prop].toUpperCase();
				filter.order.push(str);
			}
			//}
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

				// properties of associated objects are refererred in OData with / but in
				// loopback with . --> exchange / by .
				let propName = ast.left.name;
				propName = propName.replace(/\//g, ".");
				if (ast.type === 'eq') {
					where[propName] = ast.right.value;
				} else {
					where[propName] = {};
					where[propName][ast.type] = ast.right.value;
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
	var bAddedLeft:boolean = false;
	if (ast.left === undefined) {
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

			//TODO: function replace has to be implemented
			case 'replace':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

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

			//TODO: function toupper has to be implemented
			case 'toupper':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function trim has to be implemented
			case 'trim':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function concat has to be implemented
			case 'concat':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function day has to be implemented
			case 'day':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function hour has to be implemented
			case 'hour':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function minute has to be implemented
			case 'minute':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function month has to be implemented
			case 'month':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function second has to be implemented
			case 'second':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function year has to be implemented
			case 'year':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function round has to be implemented
			case 'round':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function floor has to be implemented
			case 'floor':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function ceiling has to be implemented
			case 'ceiling':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			//TODO: function IsOf has to be implemented
			case 'IsOf':
				throw new Error('function ' + ast.left.func + ' not implemented yet');

			default:
				throw new Error('function ' + ast.left.func + ' not found');
		}
	}

	// delete the left property if it was inserted at the top of this function
	if (bAddedLeft) {
		delete ast.left;
	}

	return {regexp: searchValue};
}
