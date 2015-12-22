/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
/**
 * Created by helmut on 09.12.15.
 */

import BaseRequestHandler = require('../BaseRequestHandler');
import commons = require('../../common/odata_common');
import constants = require('../../constants/odata_constants');
import req_header = require('../../common/odata_req_header');


export class ODataPostBase extends BaseRequestHandler.BaseRequestHandler{
	constructor() {super()};

	/**
	 * handles the POST request to the OData server.
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	_handlePost(req, res) {
		return new Promise((resolve, reject) => {
			// set OData-Version in response header
			this.setODataVersion(res, constants.ODATA_VERSION_2);

			commons.getModelClass(req.app, req.params[0]).then((ModelClass: any) => {
				if (ModelClass) {
					var readLocation = commons.getBaseURL(req) + ModelClass.definition.settings.plural;
					ModelClass.create(req.body, function (err, obj) {
						if (err || obj === null) {
							reject(err);
						} else {
							// set location header to update or read URL
							res.location(readLocation + '(\'' + obj.id + '\')');
							resolve();
						}
					});
				} else {
					reject(404);
				}
			});

		});
	}


}

