/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by helmut on 10.12.15.
 */

import log4js = require('log4js');
import commons = require('../../common/odata_common');
import constants = require('../../constants/odata_constants');
import req_header = require('../../common/odata_req_header');
import lb_constants = require('../../constants/loopback_constants');
import lb_types = require('../../types/loopbacktypes');
import {LoopbackRelationDefinition} from "../../types/loopbacktypes";
import {LoopbackModelDefinition} from "../../types/loopbacktypes";
import {LoopbackModelClass} from "../../types/loopbacktypes";
import {BaseUpdateRequestHandler} from "../BaseUpdateRequestHandler";

import * as express from "express";

var logger = log4js.getLogger("put");

export class ODataPutBase extends BaseUpdateRequestHandler {
	constructor() {
		super()
	};

	/**
	 * handles the PUT request to the OData server. The PUT request is used to update an entity where
	 * only the submitted properties are set. All other properties are reset to their default values.
	 * Be aware that this could lead to data loss. If you only want to change the submitted properties
	 * and keep all other properties values use PATCH or MERGE (only OData V2.0).
	 * @param req
	 * @param res
	 * @private
	 */
	_handlePut(req:express.Request, res:express.Response) {
		logger.trace("handle put");
		return new Promise((resolve, reject) => {
			// set OData-Version in response header
			this.setODataVersion(res, constants.ODATA_VERSION_2);

			var req_app: any = req.app;
			commons.getModelClass(req_app.models, req.params[0]).then(((ModelClass:LoopbackModelClass) => {

				if (ModelClass) {
					var id = commons.getIdFromUrlParameter(req.params[0]);
					var reqObj:any = req.body;
					// create an object that is saved to the db and set all properties from request body
					// If not defined there set default value or undefined if no default has been defined
					var updateObj:Object = {};
					ModelClass.forEachProperty((propName, property) => {
						if (reqObj[propName]) {
							// With date types we allow OData dates as well as Javascript dates
							if(property.type.name === "Date") {
								if(reqObj[propName].indexOf("/Date(") > -1) {
									updateObj[propName] = new Date(parseInt(reqObj[propName].substr(6)));
								} else {
									updateObj[propName] = reqObj[propName];
								}
							} else {
								updateObj[propName] = reqObj[propName];
							}
						} else {
							updateObj[propName] = property.default;
						}
					});

					ModelClass.findById(id).then(instance => {
						logger.trace("found %s with id %s in database. Will try to update the object", ModelClass.modelName, id);
						return instance.updateAttributes(updateObj)
					}).then((instance) => {
						logger.trace("updated %s with id %s.", ModelClass.modelName, id);
						// update inline relations transmitted to this function
						this._upsertInlineRelations(instance, ModelClass, reqObj).then(result => {
							resolve(204);
						}).catch(err => {
							reject(err);
						})
					}).catch((err) => {
						if (err) {
							logger.error(err);
							reject(err);
						} else {
							logger.error('undefined error');
							reject(500);
						}
					});
					//})
					//.catch((err => {
					//	console.log('could not read object of model ' + ModelClass.name + ' with id ' + id);
					//	reject(500);
					//}).bind(this))

				} else {
					logger.warn('ModelClass not found');
					reject(404);
				}
			}).bind(this));
		})
	}

	/**
	 * handles the PATCH request to the OData server. The PATCH request is used to update an entity where
	 * only the submitted properties are set. The other properties of the entity will not be changed.
	 * @param req
	 * @param res
	 * @private
	 */
	_handlePatch(req:express.Request, res:express.Response) {
		// TODO: Currently the only thing the handlePatch differentiates from handlePut is that no default value is sett. Is this corrent?
		logger.trace("handle patch / merge");
		return new Promise((resolve, reject) => {
			// set OData-Version in response header
			this.setODataVersion(res, constants.ODATA_VERSION_2);

			var req_app: any = req.app;
			commons.getModelClass(req_app.models, req.params[0]).then((ModelClass:LoopbackModelClass) => {

				if (ModelClass) {
					var id = commons.getIdFromUrlParameter(req.params[0]);
					var reqObj = req.body;
					// create an object that is saved to the db and set all properties from request body
					// If not defined there set default value or undefined if no default has been defined
					var updateObj = {};
					ModelClass.forEachProperty((propName, property) => {
						if (reqObj[propName]) {
							if(property.type.name === "Date") {
								if(reqObj[propName].indexOf("/Date(") > -1) {
									updateObj[propName] = new Date(parseInt(reqObj[propName].substr(6)));
								} else {
									updateObj[propName] = reqObj[propName];
								}
							} else {
								updateObj[propName] = reqObj[propName];
							}
						}
					});

					ModelClass.findById(id).then(instance => {
						logger.trace("found %s with id %s in database. Will try to update the object", ModelClass.name, id);
						return instance.updateAttributes(updateObj)
					}).then((instance) => {
						logger.trace("updated %s with id %s.", ModelClass.name, id);
						// update inline relations transmitted to this function
						this._upsertInlineRelations(instance, ModelClass, reqObj).then(result => {
							resolve(204);
						}).catch(err => {
							reject(err);
						})
					}).catch((err) => {
						if (err) {
							logger.error(err);
							reject(err);
						} else {
							logger.error('undefined error');
							reject(500);
						}
					});
				} else {
					logger.warn('ModelClass not found');
					reject(404);
				}
			});
		});
	}
}

