/// <reference path="../../typings/main.d.ts" />
import constants = require('../constants/odata_constants');
import enums = require('../constants/odata_enums');
import lbConstants = require('../constants/loopback_constants');
import {LoopbackModelClass} from "../types/loopbacktypes";

var oDataServerConfig;

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export = {
	setConfig: _setConfig,
	getBaseURL: _getBaseURL,
	getRequestType: _getRequestType,
	getIdFromUrlParameter: _getIdFromUrlParameter,
	getPluralForModel: _getPluralForModel,
	getModelClass: _getModelClass,
	getRequestModelClass: _getRequestModelClass
};


function _setConfig(config) {
	oDataServerConfig = config;
}


/**
 * Returns the base URL for the service that consists of
 * <protocol>://<host>:<port>
 * E.g.: http://127.0.0.1:3000
 * @param req
 * @returns {string} URL
 * @private
 */
function _getBaseURL(req) {
	return req.protocol + '://' + req.hostname +
		':' + req.app.get('port') + '/' + oDataServerConfig.odataPrefix;
}

/**
 * Retrieve the odata-type of the request. That means for a GET-request
 * if it's a
 * - Service Document
 * - Collection of Entities
 * - Entity
 * - Singleton
 * - Collection of Derived Entities
 * - Derived Entity
 * - Collection of Entity References
 * - Entity Reference
 * - Property Value                 | http://host/service/Customers(1)/Addresses
 * - Collection of Complex or Primitive Types
 * 																| http://host/service/TopFiveHobbies()
 * - Complex or Primitive Typ       | http://host/service/MostPopularName()
 * - Operation Result               | http://host/service/TopFiveCustomers{}
 *
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
function _getRequestType(req) {
	var retValue = enums.GetRequestTypeEnum.UNDEFINED;
	var param0: string = req.params[0];
	if(req.params[0] === '')
		retValue = enums.GetRequestTypeEnum.SERVICE;
	else {
		var arrParams: string[] = param0.split('/');
		if(param0.toUpperCase() === "$METADATA") {
			retValue = enums.GetRequestTypeEnum.METADATA;
		}	else if(arrParams[arrParams.length-1] === '$count') {
			retValue = enums.GetRequestTypeEnum.COLLECTION_COUNT;
		} else if(_isRequestCollection(req)) {
			retValue = enums.GetRequestTypeEnum.COLLECTION;
		} else if(_isRequestEntity(req)) {
			retValue = enums.GetRequestTypeEnum.ENTITY;
		} else {

		}
	}
	return retValue;
}


/**
 * Determines if the given request is a request for a collection.
 * At the moment this function traverses all models and checks it the
 * request reflects the plural property of the model. If so, the request is
 * considered a ColleectionRequest
 * @param req
 * @private
 */
function _isRequestCollection(req) {
	var retValue = false;
	var reqParts = /^([^/(]+)(?:[(][']?(.*[^'])[']?[)])?(?:[/]([A-Za-z]+))?/g.exec(req.params[0]);
	// reqParts = [full_match, model, id, property]
	// util.inspect(reqParts);

	var models = req.app.models();
	models.forEach(function (model) {
		var plural = _getPluralForModel(model);
		if (plural === reqParts[1]) {
			//console.log("model found: " + plural);
			if (reqParts[2] && reqParts[3]) {
				//console.log("navigation by key and property");
				var modelRel = model.definition.settings.relations;
				//in case property is a relation of type 'hasMany'
				if (modelRel && modelRel[reqParts[3]] && modelRel[reqParts[3]].type === lbConstants.LB_REL_HASMANY) {
					//console.log("property is a collection");
					retValue = true;
				} else {
					//console.log("property is a entity");
				}
			} else if (!reqParts[2]) {
				//console.log("collection is requested directly");
				retValue = true;
			} else {
				//console.log("request is not a collection");
			}
		}
	});
	return retValue;
}

/**
 * Determines if the given request is a request for a single entity object
 * @param req
 * @private
 */
function _isRequestEntity(req) {
	var retValue = false;
	var reqParts = /^([^/(]+)(?:[(][']?(.*[^'])[']?[)])?(?:[/]([A-Za-z]+))?/g.exec(req.params[0]);
			// reqParts = [full_match, model, id, property]
			//util.inspect(reqParts);
	var models = req.app.models();
	models.forEach(function (model) {
		var plural = _getPluralForModel(model);
		if (plural === reqParts[1]) {
			//console.log("model found: " + plural);
			if (reqParts[2] && reqParts[3]) {
				//console.log("navigation by key and property");
				var modelRel = model.definition.settings.relations;
				//in case property is a relation of type 'hasMany'
				if (modelRel && modelRel[reqParts[3]] && (modelRel[reqParts[3]].type === lbConstants.LB_REL_BELONGSTO || modelRel[reqParts[3]].type === lbConstants.LB_REL_HASONE)) {
					//console.log("property is a entity");
					retValue = true;
				} else {
					//console.log("property is a collection");
				}
			} else if (reqParts[2]) {
				//console.log("entity is requested by id");
				retValue = true;
			} else {
				//console.log("collection is requested directly");
			}

		}
	});
	return retValue;
}


/**
 * Retrieves the plural for the given model. This is either retrieved
 * from the settings.plural of the model or if not defined an 's' is appended
 * to the model name
 * @param model
 * @returns {string}
 * @private
 */
function _getPluralForModel(model: LoopbackModelClass): string {
	var plural = model.definition.settings.plural;
	if (!plural) {
		plural = model.definition.name + 's';
	}
	return plural;
}


/**
 * Returns the id that was transmitted via the URL, e.g. People('1').
 * In this case it extracts 1 as id. Cause a numeric id is translated into EDM.DECIMAL OData clients
 * often format the value according to the OData formatting rules. In that case the client submits
 * People('1M'). So we have to cut the M to find the record in the database.
 * @param param0
 * @returns {string}
 * @private
 */
function _getIdFromUrlParameter(param0) {
	var retValue = param0.substring(param0.indexOf('(') + 1, param0.indexOf(')'));
	if(retValue.startsWith("'") || retValue.startsWith("\"")) {
		retValue = retValue.substring(1, retValue.length-1);
	}
	if(retValue.endsWith('M')) {
		retValue = retValue.substr(0, retValue.length-1);
	}
	return retValue;
}


/**
 * get the Model for request uri (e.g.: steps(1)/children).
 * @param  {[type]} models            [description]
 * @param  {[type]} requestUri      the request uri
 * @return {[type]}                Promise that resolves to a ModelClass
 */
function _getRequestModelClass(models, requestUri) {
	var reqParts = /^([^/(]+)(?:[(][']?(.*[^'])[']?[)])?(?:[/]([A-Za-z]+))?/g.exec(requestUri);
	if (!reqParts[3]) {
		return _getModelClass(models, reqParts[1]);
	} else {
		return new Promise(function (resolve, reject) {
			_getModelClass(models, reqParts[1]).then(function (BaseModelClass) {
				//console.log(util.inspect(BaseModelClass.defintion.settings.relations));
				var modelRel = BaseModelClass.settings.relations;
				if (modelRel && modelRel[reqParts[3]]) {
					var oFilter = {}, sForeignKey = modelRel[reqParts[3]].foreignKey;
					if (sForeignKey == "") {
						sForeignKey = reqParts[3] + "Id";
					}

					switch (modelRel[reqParts[3]].type) {
						case lbConstants.LB_REL_HASMANY:
							oFilter[sForeignKey] = reqParts[2];
							_getModelClass(models, modelRel[reqParts[3]].model).then(function (ModelClass) {
								resolve({modelClass: ModelClass, foreignKeyFilter: oFilter});
							});
							break;
						case lbConstants.LB_REL_BELONGSTO:
							BaseModelClass.findById(reqParts[2]).then(function (instance) {
								if (instance) {
									oFilter["_id"] = instance[sForeignKey];
									_getModelClass(models, modelRel[reqParts[3]].model).then(function (ModelClass) {
										resolve({modelClass: ModelClass, foreignKeyFilter: oFilter});
									});
								} else {
									reject();
								}
							});
							break;
						//TODO: lbConstants.LB_REL_HASONE
					}


				} else {
					resolve(BaseModelClass);
				}
			});
		});
	}
}

/**
 * get the Model for a className. The className must be equal to
 * the pluralModelName of the Model itself.
 * @param  {[type]} models            [description]
 * @param  {[type]} className      The name of the class
 * @return {[type]}                Promise that resolves to a ModelClass
 */
function _getModelClass(models: Function, className: string) {
	return new Promise<any>((resolve, reject) => {
		var ModelClass;

		if(className.indexOf('(') !== -1) {
			// its a request for a single entity object
			className = className.substr(0, className.indexOf('('));
		} else {
			// Try to get the singular class first
			ModelClass = models[className];
		}

		// Now try to get the class by it's plural definition
		// In this case its a collection
		if(!ModelClass) {
			for(var modelStr in models) {
				var model = models[modelStr];
				if(model.definition.settings.plural === className) {
					ModelClass = model;
					break;  // return from forEach
				} else {
					var plural = model.definition.name + 's';
					if(plural === className) {
						ModelClass = model;
						break;	// return from forEach
					}
				}
			};
		}

		resolve( ModelClass );
	})
}



