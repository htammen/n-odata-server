/// <reference path="../../../typings/index.d.ts" />

import constants = require('../../constants/odata_constants');
import enums = require('../../constants/odata_enums');
import commons = require('../../common/odata_common');
import req_header = require('../../common/odata_req_header');
import BaseRequestHandler = require('../../base/BaseRequestHandler');
import {ODataPostBase} from "../../base/post/odata_post";
import {PostRequestHandler} from "../../base/BaseRequestHandler";

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export class ODataPost extends ODataPostBase implements PostRequestHandler{
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

		super._handlePost(req, res).then((postResult:any) => {
			var result: any = postResult.getRequestResult();
			res.status(201).send(result);
		}).catch(err => {
			super.handleError(err, res);
		});
	}

}

