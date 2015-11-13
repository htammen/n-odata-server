var enums = require('../constants/odata_enums');
var commons = require('../common/odata_common');

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
module.exports = {
	handleGet: _handleGet
};



/**
 * handles the GET request to the OData server
 * e.g. http://0.0.0.0:3000/odata/people
 * Here `people` is the pluralModelName of the Model to search
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _handleGet(req, res) {
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
	result['@odata.context'] = commons.getBaseURL(req) + '/odata/$metadata';
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
		ModelClass.find(function(err, data) {
			var result = {};
			result.value = data;
			res.send(result);
		});
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
					result['@odata.context'] = commons.getBaseURL(req) + '/odata/$metadata#' + collection + '/$entity';
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

