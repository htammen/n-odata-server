import commons = require('../../common/odata_common');
import BaseRequestHandler = require('../../base/BaseRequestHandler');
import {DeleteRequestHandler} from "../../base/BaseRequestHandler";

/**
 * A module for exporting DELETE functions of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export class ODataDelete extends BaseRequestHandler.BaseRequestHandler implements DeleteRequestHandler {
	constructor() {super()};

	handleDelete(req, res) {
		_handleDelete.call(this, req, res);
	}

}


/**
 * handles the DELETE request of the OData server
 * @param req
 * @param res
 * @private
 */
function _handleDelete(req, res) {
	// set OData-Version in response header
	this.setODataVersion(res);

	var param0 = req.params[0];
	// extract the id from the request
	var id = commons.getIdFromUrlParameter(param0);
	commons.getModelClass(req.app.models, param0).then((ModelClass: any) => {
		if(ModelClass) {
			ModelClass.destroyById(id, function(err) {
				if(!err) {
					res.sendStatus(204);
				} else {
					res.sendStatus(500);
				}
			});
		} else {
			res.sendStatus(404);
		}
	});
}
