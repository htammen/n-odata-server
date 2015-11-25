var commons = require('../common/odata_common');
var BaseRequestHandler = require('../base/BaseRequestHandler');

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
module.exports = ODataPost;


function ODataPost() {
	var retValue = {};

	// call the base class constructor
	// inheritance pattern is described here: http://metaduck.com/08-module-pattern-inheritance.html
	retValue.__proto__ = BaseRequestHandler();

	retValue.handlePost = _handlePost;

	return retValue;
}


/**
 * handles the POST request to the OData server.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _handlePost(req, res) {
	// set OData-Version in response header
	this.setODataVersion(res);

	var ModelClass = commons.getModelClass(req.app, req.params[0]);

	if(ModelClass) {
		var readLocation = commons.getBaseURL(req) + ModelClass.definition.settings.plural;
		ModelClass.create(req.body, function(err, obj) {
			if(err || obj === null) {
				res.sendStatus(500);
			} else {
				// set location header to update or read URL
				res.location(readLocation + '(\'' + obj.id + '\')');
				// status must be 201
				res.sendStatus(201);
			}
		});
	} else {
		res.sendStatus(404);
	}
}

