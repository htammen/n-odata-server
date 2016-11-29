/// <reference path="../typings/index.d.ts" />
/// <reference path="types/loopbacktypes.ts" />
/// <reference path="types/n_odata_types.ts" />
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
import {ODataServerConfig, RequestModelClass} from "./types/n_odata_types";
import {BaseRequestHandler} from "./base/BaseRequestHandler";
import {GetRequestHandler} from "./base/BaseRequestHandler";
import {PostRequestHandler} from "./base/BaseRequestHandler";
import {DeleteRequestHandler} from "./base/BaseRequestHandler";
import {PutRequestHandler} from "./base/BaseRequestHandler";
import {LoopbackApp, LoopbackRequest} from "./types/loopbacktypes";
import {HttpMethod} from "./constants/odata_enums";


fs.stat('n_odata_server_log.json', function (err, stat) {
	var fileName = __dirname + '/log4js.json';
	if (!err) {
		fileName = 'n_odata_server_log.json';
	}
	log4js.configure(fileName);
});

var logger = log4js.getLogger("odata");

/**
 * This is the main entry class for the n-odata-server. There is only one instance of
 * this class. It implements the singleton pattern
 */
export class OData {
	private static singletonInstance: OData;

	private oLoopbackApp: LoopbackApp;

	private _oDataServerConfig:ODataServerConfig;
	private oDataGet: GetRequestHandler;
	private oDataPost: PostRequestHandler;
	private oDataDelete: DeleteRequestHandler;
	private oDataPut: PutRequestHandler;

	/* private variable that holds the status of initialization */
	private initProceeded: boolean = false;

	constructor() {
		if(!OData.singletonInstance) {
			OData.singletonInstance = this;
		}
		return OData.singletonInstance;
	}

	/**
	 * Getter for oDataServerConfig
	 * @returns {ODataServerConfig}
	 */
	public getODataServerConfig():ODataServerConfig {
		return this._oDataServerConfig;
	}

	public init(loopbackApplication, options) {
		if(!this.initProceeded) {	// run init only once
			options = options || {}; // ensure that options not undefined
			this.oLoopbackApp = loopbackApplication;
			// save the options defined in a local variable
			this._oDataServerConfig = this._oDataServerConfig || options || {};
			// if not defined set a default value for server-side paging
			if (!this._oDataServerConfig.maxpagesize) {
				this._oDataServerConfig.maxpagesize = constants.ODATA_MAXPAGESIZE;
			}

			// retrieve odata prefix from path
			let _pathArr = (options && options.path && options.path.split('/'));
			if (_pathArr) {
				this._oDataServerConfig.odataPrefix = _pathArr[1];
			}

			if (!this._oDataServerConfig.odataversion) {
				this._oDataServerConfig.odataversion = "4";
			}
			common.setConfig(this._oDataServerConfig);

			if (this._oDataServerConfig.odataversion === "4") {
				this.oDataGet = new ODataGetV4.ODataGet();
				this.oDataDelete = new ODataDeleteV4.ODataDelete();
				this.oDataPost = new ODataPostV4.ODataPost();
				this.oDataPut = new ODataPutV4.ODataPut();

				this.oDataGet.setConfig(this._oDataServerConfig);
			} else {
				this.oDataGet = new ODataGetV2.ODataGet();
				this.oDataPost = new ODataPostV2.ODataPost();
				this.oDataDelete = new ODataDeleteV2.ODataDelete();
				this.oDataPut = new ODataPutV2.ODataPut();

				this.oDataGet.setConfig(this._oDataServerConfig);
			}

			// If using application wants to start odata server not via the recommended
			// way middleware but via component-config.json we start the server here. Otherwise
			// we do nothing more here. The server will then be started in /middleware/odata.ts
			if (!options.useViaMiddleware) {
				if (this._oDataServerConfig.odataversion === "4") {
					this._handleODataVersion4(loopbackApplication, options);
				} else if (this._oDataServerConfig.odataversion === "2") {
					this._handleODataVersion2(loopbackApplication, options);
				} else {
					logger.trace("odata version " + this._oDataServerConfig.odataversion + " not supported yet");
				}
			}

			this.initProceeded = true;	// ensure that init is only run once
		}
	};

	/**
	 * handles OData V2 requests
	 *
	 * @param loopbackApplication
	 * @param options
	 * @private
	 */
	private _handleODataVersion2(loopbackApplication, options) {
		// define the express / loopback route for OData V2
		loopbackApplication.use(options.path, function(req:express.Request, res:express.Response, next) {
			this.handleRequestV2(req, res, next)
		}.bind(this));
	}


	/**
	 * handles the OData V4 requests.
	 *
	 * @param loopbackApplication
	 * @param options
	 * @private
	 */
	private _handleODataVersion4(loopbackApplication, options) {
		loopbackApplication.use(options.path, function (req:express.Request, res:express.Response, next) {
			this.handleRequestV4(req, res, next);
		}.bind(this));
	}


	/**
	 * handle the request that was sent by Express
	 * @param req HTTP request
	 * @param res HTTP response
	 * @param next next phase in phase chain
	 */
	public handleRequestV2(req:LoopbackRequest, res:express.Response, next) {
		try {
			logger.info("processing OData V2 request of type " + req.method);
			logger.debug("baseUrl = " + req.baseUrl);
			this.checkAccess(req, res).then(() => {
				logger.debug("checkAccess passed successfully")
				let method:HttpMethod = this.getRequestMethod(req);
				switch (method) {
					case HttpMethod.GET:
						this._handleGet(req, res);
						break;
					case HttpMethod.POST:
						this._handlePost(req, res);
						break;
					// PUT is used to update an entity and to overwrite all property values with its default
					// values if they are not submitted with the request. In other words it resets an entity and
					// only sets the submitted properties
					case HttpMethod.PUT:
						this._handlePut(req, res);
						var i = 2;
						break;
					//// PATCH should be the preferred method to update an entity
					case HttpMethod.PATCH:
						this._handlePatch(req, res);
						break;
					//// MERGE is used in OData V2.0 to update an entity. This has been changed in
					//// in V4.0 to PATCH
					case HttpMethod.MERGE:
						this._handleMerge(req, res);
						break;
					case HttpMethod.DELETE:
						this._handleDelete(req, res);
						break;
					default:
						res.sendStatus(404);
						break;
				}
			}).catch((err) => {
				let statusCode = (err && err.statusCode) || 500;
				res.status(statusCode).send(err);
			});
		} catch (e) {
			logger.error(e);
			res.status(500).send(e);
		}
	}


	/**
	 * handle the V4 request that was sent by Express
	 * @param req HTTP request
	 * @param res HTTP response
	 * @param next next phase in phase chain
	 */
	public handleRequestV4(req:LoopbackRequest, res:express.Response, next) {
		try {
			this.checkAccess(req, res).then(() => {
				let method = this.getRequestMethod(req);
				switch (method) {
					case HttpMethod.GET:
						this._handleGet(req, res);
						break;
					case HttpMethod.POST:
						this._handlePost(req, res);
						break;
					// PUT is used to update an entity and to overwrite all property values with its default
					// values if they are not submitted with the request. In other words it resets an entity and
					// only sets the submitted properties
					case HttpMethod.PUT:
						this._handlePut(req, res);
						break;
					// PATCH should be the preferred method to update an entity
					case HttpMethod.PATCH:
						this._handlePatch(req, res);
						break;
					// MERGE is used in OData V2.0 to update an entity. This has been changed in
					// in V4.0 to PATCH
					case HttpMethod.MERGE:
						this._handlePatch(req, res);
						break;
					case HttpMethod.DELETE:
						this._handleDelete(req, res);
						break;
					default:
						res.sendStatus(404);
						break;
				}
			}).catch((err) => {
				let statusCode = (err && err.statusCode) || 500;
				res.status(statusCode).send(err);
			});
		} catch (e) {
			logger.error(e);
			res.status(500).send(e);
		}
	}

	/**
	 * handles the GET request to the OData server
	 * e.g. http://0.0.0.0:3000/odata/people
	 * Here `people` is the pluralModelName of the Model to search
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	private _handleGet(req: LoopbackRequest, res: express.Response) {
		// delegate to version dependend module
		this.oDataGet.handleGet(req, res);
	}

	/**
	 * handles the POST request to the OData server.
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	private _handlePost(req:LoopbackRequest, res:express.Response) {
		// delegate to version dependend module
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
	private _handlePut(req:LoopbackRequest, res:express.Response) {
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

	/**
	 * Check access to a function / OData service.
	 * If the user has access (Promise resolves) the handle... Method to handle the request can be called
	 * @param req HttpRequest that was sent by the client
	 * @param res HttpResponse that is sent back to the client
	 * @returns {Promise<any>|Promise}
	 */
	checkAccess(req: LoopbackRequest, res: express.Response) {
		return new Promise<any>((resolve, reject) =>
		{
			// $metadata and service requests are allways allowed
			if(req.params[0] === "$metadata" || req.params[0] === "") {
				logger.debug(`call to ${req.params[0]}. Doesn't need checkAccess`);
				resolve();
			} else {
				// get the http verb from the request
				let method:HttpMethod = this.getRequestMethod(req);

				let remotes: any = this.oLoopbackApp.remotes();
				// get the ModelClass from the request
				common.getRequestModelClass(this.oLoopbackApp.models, req.params[0]).then((modelClassResult: RequestModelClass) => {
					let ctx;
					// some requests do not return a modelClass
					if (modelClassResult && modelClassResult.modelClass) {
						for (let lbClass of remotes.classes()) {
							if (lbClass.name === modelClassResult.modelClass.modelName) {
								if (method === HttpMethod.GET) {
									ctx = this.getGETCheckAccessContext(req, lbClass);
									break;
								} else if (method === HttpMethod.POST) {
									ctx = this.getPOSTCheckAccessContext(req, lbClass);
									break;
								} else if (method === HttpMethod.PUT || method === HttpMethod.PATCH || method === HttpMethod.MERGE) {
									ctx = this.getPUTCheckAccessContext(req, lbClass);
									break;
								} else if (method === HttpMethod.DELETE) {
									ctx = this.getDELETECheckAccessContext(req, lbClass);
									break;
								}
							}
						}
					}
					// ctx must contain at least a method and an instance object
					if (ctx && ctx.method && ctx.instance) {
						// call the authorization method of the remotes object
						if (ctx.method.ctor.checkAccess) {
							ctx.method.ctor.checkAccess(req.accessToken, ctx.instance.id, ctx.method, ctx, (err, allowed) => {
								if (err) {
									logger.error(err);
									reject(err);
								} else if (allowed) {
									// delegate to get module
									resolve();
								} else {

									let messages = {
										403: {
											message: 'Access Denied',
											code: 'ACCESS_DENIED'
										},
										404: {
											message: ('could not find ' + ctx.method + ' with id ' + ctx.instance.id),
											code: 'MODEL_NOT_FOUND'
										},
										401: {
											message: 'Authorization Required',
											code: 'AUTHORIZATION_REQUIRED'
										}
									};

									let errStatusCode = 401;
									let e = new Error(messages[errStatusCode].message || messages[403].message) as any;
									e.statusCode = errStatusCode;
									e.code = messages[errStatusCode].code || messages[403].code;
									reject(e);
									//res.sendStatus(e.statusCode); //.send(e.message);
								}
							});
						}
					} else {
						logger.error(`Something went wrong with retrieving requestModelClass for request ${req.params[0]}`);
						let err = new Error(`You don't have access to request ${req.params[0]}.`) as any;
						err.statusCode = 401;
						reject(err);
					}
				}).catch(err => {
					logger.error(err);
					reject(err);
				});
			}
		});
	}

	/**
	 * returns the http method (verb) from the request
	 * @param req the http request
	 * @returns {HttpMethod} the verb/method of the http request, e.g. GET, POST, PUT, ...
	 */
	private getRequestMethod(req: express.Request) {
		let method = req.method;
		if( method === HttpMethod[HttpMethod.POST]) {
			// check if http post tunneling is used (SAPUI5 uses it)
			let x_http_method: string = req.get('x-http-method');
			if (x_http_method) {
				method = x_http_method;
			}
		}
		return HttpMethod[method];
	}

	/**
	 * Create context for checkAccess Method for a GET request
	 * @param req
	 * @param lbClass
	 * @returns {{method: any, req: LoopbackRequest, instance: {id: any}}}
	 */
	private getGETCheckAccessContext(req: LoopbackRequest, lbClass: any) {
		// find "find", "findById" or "findOne" method in sharedMethods --> thats our wanted sharedMethod
		let re = /^\w*[(]([a-zA-Z0-9']*)[)]/g,
			match = re.exec(req.params[0]),
			_id,
			lbMethod;
		if (match) {
			lbMethod = lbClass.find("findById", true);
			_id = match[1];
		} else {
			lbMethod = lbClass.find("find", true);
		}

		return {
			method: lbMethod,
			req: req,
			instance: {
				id: _id
			}
		};
	}

	/**
	 * Create context for checkAccess Method for a POST request
	 * @param req
	 * @param lbClass
	 * @returns {{method: any, req: LoopbackRequest, instance: {id: any}}}
	 */
	private getPOSTCheckAccessContext(req: LoopbackRequest, lbClass: any) {
		// find "create" method in sharedMethods --> this method has to be secured via a POST request
		let lbMethod;
		lbMethod = lbClass.find("create", true);

		return {
			method: lbMethod,
			req: req,
			instance: {
				id: null
			}
		};
	}

	/**
	 * Create context for checkAccess Method for a PUT request
	 * @param req
	 * @param lbClass
	 * @returns {{method: any, req: LoopbackRequest, instance: {id: any}}}
	 */
	private getPUTCheckAccessContext(req: LoopbackRequest, lbClass: any) {
		// find "updateAttributes" method in sharedMethods --> this method has to be secured via a POST request
		let re = /^\w*[(]([a-zA-Z0-9']*)[)]/g,
			match = re.exec(req.params[0]),
			_id,
			lbMethod;

		if (match) {
			lbMethod = lbClass.find("updateAttributes", false);
			_id = match[1];
		}

		return {
			method: lbMethod,
			req: req,
			instance: {
				id: _id
			}
		};
	}

	/**
	 * Create context for checkAccess Method for a DELETE request
	 * @param req
	 * @param lbClass
	 * @returns {{method: any, req: LoopbackRequest, instance: {id: any}}}
	 */
	private getDELETECheckAccessContext(req: LoopbackRequest, lbClass: any) {
		// find "updateAttributes" method in sharedMethods --> this method has to be secured via a POST request
		let re = /^\w*[(]([a-zA-Z0-9']*)[)]/g,
			match = re.exec(req.params[0]),
			_id,
			lbMethod;

		if (match) {
			lbMethod = lbClass.find("destroyById", true);
			_id = match[1];
		}

		return {
			method: lbMethod,
			req: req,
			instance: {
				id: _id
			}
		};
	}

}


/**
 * Exposes the main function of the n-odata-server
 */
export function init(loopbackApplication, options) {
	var oData = new OData();
	oData.init(loopbackApplication, options)
};


