/// <reference path="../typings/index.d.ts" />
/**
 * This module implements the odata server functionality
 * At the moment it is implemented as local loopback component
 * See here for more details on creating and registering loopback components
 * https://docs.strongloop.com/display/public/LB/Creating+components
 *
 */

// OData V4
import constants = require('./constants/odata_constants');
import common = require('./common/odata_common');
import ODataGetV4 = require('./v4/get/odata_get');
import ODataPostV4 = require('./v4/post/odata_post');
import ODataPutV4 = require('./v4/put/odata_put');
import ODataDeleteV4 = require('./v4/delete/odata_delete');
// OData V2
import ODataGetV2 = require('./v2/get/odata_get');
import ODataPostV2 = require('./v2/post/odata_post');
import ODataDeleteV2 = require('./v2/delete/odata_delete');
import ODataPutV2 = require('./v2/put/odata_put');
import fs = require( 'fs' );

import * as express from "express";

// Configure logging
// TODO: make logging more flexible, e.g. let user configure the name and location of the log file via component configuration
import log4js = require('log4js');
import {ODataServerConfig} from "./types/n_odata_types";
import {BaseRequestHandler} from "./base/BaseRequestHandler";
import {GetRequestHandler} from "./base/BaseRequestHandler";
import {PostRequestHandler} from "./base/BaseRequestHandler";
import {DeleteRequestHandler} from "./base/BaseRequestHandler";
import {PutRequestHandler} from "./base/BaseRequestHandler";


fs.stat('n_odata_server_log.json', function (err, stat) {
	var fileName = __dirname + '/log4js.json';
	if (!err) {
		fileName = 'n_odata_server_log.json';
	}
	log4js.configure(fileName);
});

var logger = log4js.getLogger("odata");

/**
 * This is the main entry class for the n-odata-server
 */
class OData {
	private oDataServerConfig:ODataServerConfig;
	private oDataGet: GetRequestHandler;
	private oDataPost: PostRequestHandler;
	private oDataDelete: DeleteRequestHandler;
	private oDataPut: PutRequestHandler;

	public init(loopbackApplication, options) {
		// save the options defined in a local variable
		this.oDataServerConfig = options || {};
		// if not defined set a default value for server-side paging
		if (!this.oDataServerConfig.maxpagesize) {
			this.oDataServerConfig.maxpagesize = constants.ODATA_MAXPAGESIZE;
		}

		// retrieve odata prefix from path
		var _pathArr = options.path.split('/');
		this.oDataServerConfig.odataPrefix = _pathArr[1];

		if (!this.oDataServerConfig.odataversion) {
			this.oDataServerConfig.odataversion = "4";
		}

		if (this.oDataServerConfig.odataversion === "4") {
			this._handleODataVersion4(loopbackApplication, options, this.oDataServerConfig);
		} else if (this.oDataServerConfig.odataversion === "2") {
			this._handleODataVersion2(loopbackApplication, options, this.oDataServerConfig);
		} else {
			console.log("odata version " + this.oDataServerConfig.odataversion + " not supported yet");
		}
	};

	/**
	 * handles OData V2 requests
	 *
	 * @param loopbackApplication
	 * @param options
	 * @param oDataServerConfig
	 * @private
	 */
	private _handleODataVersion2(loopbackApplication, options, oDataServerConfig) {
		this.oDataGet = new ODataGetV2.ODataGet();
		this.oDataPost = new ODataPostV2.ODataPost();
		this.oDataDelete = new ODataDeleteV2.ODataDelete();
		this.oDataPut = new ODataPutV2.ODataPut();

		common.setConfig(oDataServerConfig);
		this.oDataGet.setConfig(oDataServerConfig);

		loopbackApplication.use(options.path, function (req:express.Request, res:express.Response, next) {
			try {
				logger.info("processing OData V2 request of type " + req.method);
				logger.debug("baseUrl = " + req.baseUrl);
				switch (req.method) {
					case 'GET':
						this._handleGet(req, res);
						break;
					case 'POST':
						var x_http_method:string = req.get('x-http-method');
						if (x_http_method) {
							switch (x_http_method) {
								case 'MERGE':
									this._handleMerge(req, res);
									break;
								case 'PATCH':
									this._handleMerge(req, res);
									break;
								case 'PUT':
									this._handlePut(req, res);
									break;
								case 'DELETE':
									this._handleDelete(req, res);
									break;

								default:
									res.status(500).send("HTTP verb " + x_http_method + " not supported by POST tunneling");
							}
						} else {
							this._handlePost(req, res);
						}
						break;
					// PUT is used to update an entity and to overwrite all property values with its default
					// values if they are not submitted with the request. In other words it resets an entity and
					// only sets the submitted properties
					case 'PUT':
						this._handlePut(req, res);
						var i = 2;
						break;
					//// PATCH should be the preferred method to update an entity
					//case 'PATCH':
					//	_handlePATCH.call(this, req, res);
					//	break;
					//// MERGE is used in OData V2.0 to update an entity. This has been changed in
					//// in V4.0 to PATCH
					//case 'MERGE':
					//	_handlePATCH.call(this, req, res);
					//	break;
					case 'DELETE':
						this._handleDelete(req, res);
						break;
					default:
						res.sendStatus(404);
						break;
				}
			} catch (e) {
				console.log(e);
				res.sendStatus(500);
			}
		}.bind(this));
	}


	/**
	 * handles the OData V4 requests.
	 *
	 * @param loopbackApplication
	 * @param options
	 * @param oDataServerConfig
	 * @private
	 */
	private _handleODataVersion4(loopbackApplication, options, oDataServerConfig) {
		this.oDataGet = new ODataGetV4.ODataGet();
		this.oDataDelete = new ODataDeleteV4.ODataDelete();
		this.oDataPost = new ODataPostV4.ODataPost();
		this.oDataPut = new ODataPutV4.ODataPut();

		common.setConfig(oDataServerConfig);
		this.oDataGet.setConfig(oDataServerConfig);

		loopbackApplication.use(options.path, function (req:express.Request, res:express.Response, next) {
			try {
				switch (req.method) {
					case 'GET':
						this._handleGet(req, res);
						break;
					case 'POST':
						var x_http_method:string = req.get('x-http-method');
						if (x_http_method) {
							switch (x_http_method) {
								case 'MERGE':
									this._handlePatch(req, res);
									break;
								case 'PATCH':
									this._handlePatch(req, res);
									break;
								case 'PUT':
									this._handlePut(req, res);
									break;
								case 'DELETE':
									this._handleDelete(req, res);
									break;

								default:
									res.status(500).send("HTTP verb " + x_http_method + " not supported by POST tunneling");
							}
						} else {
							this._handlePost(req, res);
						}
						break;
					// PUT is used to update an entity and to overwrite all property values with its default
					// values if they are not submitted with the request. In other words it resets an entity and
					// only sets the submitted properties
					case 'PUT':
						this._handlePut(req, res);
						break;
					// PATCH should be the preferred method to update an entity
					case 'PATCH':
						this._handlePatch(req, res);
						break;
					// MERGE is used in OData V2.0 to update an entity. This has been changed in
					// in V4.0 to PATCH
					case 'MERGE':
						this._handlePatch(req, res);
						break;
					case 'DELETE':
						this._handleDelete(req, res);
						break;
					default:
						res.sendStatus(404);
						break;
				}
			} catch (e) {
				console.log(e);
				res.sendStatus(500);
			}
		}.bind(this));
	}

	/**
	 * handles the GET request to the OData server
	 * e.g. http://0.0.0.0:3000/odata/people
	 * Here `people` is the pluralModelName of the Model to search
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	private _handleGet(req:express.Request, res:express.Response) {
		// delegate to get module
		this.oDataGet.handleGet(req, res);
	}


	/**
	 * handles the POST request to the OData server.
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	private _handlePost(req:express.Request, res:express.Response) {
		// delegate to post module
		this.oDataPost.handlePost(req, res);
	}

	/**
	 * handles the PUT request to the OData server. The PUT request is used to update an entity where
	 * only the submitted properties are set. All other properties are reset to their default values.
	 * Be aware that this could lead to data loss. If you only want to change the submitted properties
	 * and keep all other properties values use PATCH or MERGE (only OData V2.0).
	 * @param req
	 * @param res
	 * @private
	 */
	private _handlePut(req:express.Request, res:express.Response) {
		// delegate to put module
		this.oDataPut.handlePut(req, res);
	}

	/**
	 * handles the PATCH request to the OData server. The PATCH request is used to update an entity where
	 * only the submitted properties are set. The other properties of the entity will not be changed.
	 * @param req
	 * @param res
	 * @private
	 */
	private _handlePatch(req:express.Request, res:express.Response) {
		// delegate to put module
		this.oDataPut.handlePatch(req, res);
	}


	/**
	 * handles the MERGE request to the OData server. The MERGE request is used to update an entity where
	 * only the submitted properties are set. The other properties of the entity will not be changed.
	 * This is only available with OData V2
	 * @param req
	 * @param res
	 * @private
	 */
	private _handleMerge(req:express.Request, res:express.Response) {
		// delegate to put module
		this.oDataPut.handleMerge(req, res);
	}


	/**
	 * handles the DELETE request of the OData server
	 * @param req
	 * @param res
	 * @private
	 */
	private _handleDelete(req:express.Request, res:express.Response) {
		// delegate to delete module
		this.oDataDelete.handleDelete(req, res);
	}

}


/**
 * Exposes the main function of the n-odata-server
 */
export = function(loopbackApplication, options) {
	var oData = new OData();
	oData.init(loopbackApplication, options)
};


