/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by helmut on 10.12.15.
 */

import BaseRequestHandler = require('../BaseRequestHandler');
import commons = require('../../common/odata_common');
import constants = require('../../constants/odata_constants');
import req_header = require('../../common/odata_req_header');


export class ODataDeleteBase extends BaseRequestHandler.BaseRequestHandler{
	constructor() {super()};

	/**
	 * handles the DELETE request of the OData server
	 * @param req
	 * @param res
	 * @private
	 */
	_handleDelete(req, res) {
		return new Promise((resolve, reject) => {
			// set OData-Version in response header
			this.setODataVersion(res, constants.ODATA_VERSION_2);

			var param0 = req.params[0];
			// extract the id from the request
			var id = commons.getIdFromUrlParameter(param0);
			commons.getModelClass(req.app.models, param0).then((ModelClass: any) => {
				if(ModelClass) {
					ModelClass.destroyById(id, function(err) {
						if(!err) {
							resolve();
						} else {
							console.log(err);
							reject(err);
						}
					});
				} else {
					reject(404);
				}
			});
		});
	}

}

