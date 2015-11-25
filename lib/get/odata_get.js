var constants = require('../constants/odata_constants');
var enums = require('../constants/odata_enums');
var commons = require('../common/odata_common');
var req_header = require('../common/odata_req_header');
var BaseRequestHandler = require('../base/BaseRequestHandler');

var oDataServerConfig;

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
module.exports = ODataGet;

function ODataGet() {
	var retValue = {};

	// call the base class constructor
	// inheritance pattern is described here: http://metaduck.com/08-module-pattern-inheritance.html
	retValue.__proto__ = BaseRequestHandler();

	retValue.setConfig = _setConfig;
	retValue.handleGet = _handleGet;

	return retValue;
}

function _setConfig(config) {
	oDataServerConfig = config;
}


/**
 * handles the GET request to the OData server
 * e.g. http://0.0.0.0:3000/odata/people
 * Here `people` is the pluralModelName of the Model to search
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _handleGet(req, res) {
	// set OData-Version in response header
	this.setODataVersion(res);

	var reqType = commons.getRequestType(req);
	switch (reqType) {
		case enums.GetRequestTypeEnum.SERVICE:
			_getServiceDocument(req, res);
			break;
		case enums.GetRequestTypeEnum.COLLECTION:
			_getCollectionData(req, res);
			break;
		case enums.GetRequestTypeEnum.ENTITY:
			_getEntityData(req, res);
			break;
		default:
			res.sendStatus(404);
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
function _getServiceDocument(req, res) {
	var json = [];

	var models = req.app.models();
	models.forEach(function(model) {
		if(model.definition)
			var modelObj = {};
		var plural = commons.getPluralForModel(model);
		modelObj.name = plural;
		modelObj.url = plural;
		json.push(modelObj);
	});

	var result = {};
	//TODO: The port is not available via the request. How can we get it?
	result['@odata.context'] = commons.getBaseURL(req) + '/$metadata';
	result.value = json;
	res.send(result);
}

/**
 * Get all records for a collection. The name of the collection
 * is given in the 1st request parameter
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _getCollectionData(req, res) {
	//TODO: The odata.nextLink annotation MUST be included in a response that represents a partial result. "@odata.nextLink": "...?$skiptoken=342r89"
	var ModelClass = commons.getModelClass(req.app, req.params[0]);
	if(ModelClass) {
		// Retrieve odata.maxpagesize from Prefer header of the request
		var _maxpagesize;
		var reqHeaderArr = req_header.getPreferHeader(req);
		reqHeaderArr.forEach(function(obj, idx, arr) {
			if(obj[0] === 'maxpagesize') {
				_maxpagesize = obj[1];
			}
		});

		var filter = {};
		//TODO: apply $filter parameter
		//TODO: apply $search parameter

		// if user appended the $count parameter she just wants the number of records
		// after filter and search has been applied
		if(req.query.$count !== undefined) {
			if(req.accepts("text/plain")) {
				ModelClass.count(function (err, count) {
					res.set('Content-Type', 'text/plain');
					res.send(count.toString());
				})
			} else {
				res.sendStatus(415)
			}
		} else {
			var nextLink;

			if (req.query.$top) {
				filter.limit = req.query.$top;
			}
			// the implementation of $skiptoken is service specific. We define that $skiptoken behaves like $skip
			if (req.query.$skip || req.query.$skiptoken) {
				filter.skip = req.query.$skip || req.query.$skiptoken;
			}
			// adjust the number of records that are returned according to the maxpagesize setting, either by client
			// or by the server application
			if(!filter.limit || filter.limit > oDataServerConfig.maxpagesize || (_maxpagesize && filter.limit > _maxpagesize)) {
				var tmpMaxSize = oDataServerConfig.maxpagesize;
				if(_maxpagesize && tmpMaxSize && parseInt(_maxpagesize) < parseInt(tmpMaxSize)) {
					tmpMaxSize = _maxpagesize;
				}
				// if limit has not been set yet we have to add a nextLink property to the response to enable the user to automatically
				// page to the next chunk of data
				if(!filter.limit) {
					var _skiptoken = new Number(req.query.$skiptoken);
					_skiptoken = (!isNaN(_skiptoken) ? _skiptoken + parseInt(tmpMaxSize) : parseInt(tmpMaxSize));
					nextLink = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '?$skiptoken=' + _skiptoken;
					// if nextLink is set, means we deliver partially response, we need to know if there would be more data
					// if the nextLink is processed. If the current data chunk is the last one we MUST NOT set the nextLink into
					// the response
					if(nextLink) {
						var nlFilter = {};
						nlFilter.skip = _skiptoken;
						nlFilter.limit = 1;	// just need to test if there is at least one more record
						ModelClass.find(nlFilter, function(err, data) {
							if(data.length === 0) {
								nextLink = undefined;
							}
						});
					}

					// set the filter limit to the calculated maxSize
					filter.limit = tmpMaxSize;
					res.set('Preference-Applied', 'odata.maxpagesize=' + tmpMaxSize);
				}
			}

			// Now we call the find method of the ModelClass with filter definition
			ModelClass.find(filter, function(err, data) {
				var result = {};
				if(nextLink) {
					result['@odata.netxtLink'] = nextLink;
				}
				result.value = data;
				res.send(result);
			});
		}
	} else {
		res.sendStatus(404);
	}
}

/**
 * Get the data for exactly one object of an entity type
 * @param req
 * @param res
 * @private
 */
function _getEntityData(req, res) {
	var param0 = req.params[0];
	// extract the id from the request
	var id = commons.getIdFromUrlParameter(param0);
	var collection = param0.substr(0, param0.indexOf('('));
	var ModelClass = commons.getModelClass(req.app, param0);
	if(ModelClass) {
		ModelClass.findById(id, function(err, instance) {
			if(err) {
				console.error(err.toString());
				res.sendStatus(500);
			} else {
				if(instance) {
					var result = instance.toJSON();
					result['@odata.context'] = commons.getBaseURL(req) + '/$metadata#' + collection + '/$entity';
					res.send(result);
				} else {
					console.error('entity data for request ' + req.originalUrl + ' was not found');
					res.sendStatus(404);
				}
			}
		});
	} else {
		res.sendStatus(404);
	}
}

