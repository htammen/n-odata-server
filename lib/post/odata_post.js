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
	handlePost: _handlePost
};



/**
 * handles the POST request to the OData server.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _handlePost(req, res) {
	var ModelClass = commons.getModelClass(req.app, req.params[0]);

	if(ModelClass) {
		var readLocation = commons.getBaseURL(req) + '/odata/' + ModelClass.definition.settings.plural;
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

