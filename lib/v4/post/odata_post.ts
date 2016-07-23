import commons = require('../../common/odata_common');
import BaseRequestHandler = require('../../base/BaseRequestHandler');
import {PostRequestHandler} from "../../base/BaseRequestHandler";

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export class ODataPost extends BaseRequestHandler.BaseRequestHandler implements PostRequestHandler {
	constructor() {super()};

	handlePost(req, res) {
		_handlePost.call(this, req, res);
	}

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

	commons.getModelClass(req.app.models, req.params[0]).then((ModelClass: any) => {

		if (ModelClass) {
			var readLocation = commons.getBaseURL(req) + ModelClass.definition.settings.plural;
			ModelClass.create(req.body, function (err, obj) {
				if (err || obj === null) {
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
	});
}

