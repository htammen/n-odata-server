/// <reference path="../../../typings/main.d.ts" />

import constants = require('../../constants/odata_constants');
import enums = require('../../constants/odata_enums');
import commons = require('../../common/odata_common');
import req_header = require('../../common/odata_req_header');
import BaseRequestHandler = require('../../base/BaseRequestHandler');
import {ODataPostBase} from "../../base/post/odata_post";

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export class ODataPost extends ODataPostBase {
	constructor() {
		super()
	};

	/**
	 * handles the POST request to the OData server.
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	handlePost(req, res) {

		super._handlePost(req, res).then(result => {
			res.sendStatus(201)
		}).catch(err => {
			super.handleError(err, res);
		});
	}

}

