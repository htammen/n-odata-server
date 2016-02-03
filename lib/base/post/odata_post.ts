/// <reference path="../../../typings/main.d.ts" />

/**
 * Created by helmut on 09.12.15.
 */

import log4js = require('log4js');
import commons = require('../../common/odata_common');
import constants = require('../../constants/odata_constants');
import lb_constants = require('../../constants/loopback_constants');
import req_header = require('../../common/odata_req_header');
import {LoopbackModelClass} from "../../types/loopbacktypes";
import {Response} from "express";
import {Request} from "express";
import {LoopbackRelationDefinition} from "../../types/loopbacktypes";
import {BaseUpdateRequestHandler} from "../BaseUpdateRequestHandler";

var logger = log4js.getLogger("post");

export class ODataPostBase extends BaseUpdateRequestHandler {
	constructor() {
		super()
	};

	/**
	 * handles the POST request to the OData server.
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	_handlePost(req:Request, res:Response) {
		logger.trace("handle post");
		return new Promise((resolve, reject) => {
			// set OData-Version in response header
			this.setODataVersion(res, constants.ODATA_VERSION_2);

			commons.getModelClass((req.app as any).models, req.params[0]).then((ModelClass:LoopbackModelClass) => {
				if (ModelClass) {
					var location = commons.getBaseURL(req) + '/' + ModelClass.definition.settings.plural;

					// create a new Object and copy all properties of the model into this. this object does not
					// contain relations. If we would not filter out the relations they were
					// written to the database as "dynamic" members
					// Additionally we set the default values for propertes that are not transmitted with the request
					var createObj:Object = {};
					ModelClass.forEachProperty((propName, property) => {
						if (req.body[propName]) {
							createObj[propName] = req.body[propName];
						} else {
							createObj[propName] = property.default;
						}
					});

					ModelClass.create(createObj).then(instance => {
						// set location header to update or read URL
						res.location(location + '(\'' + instance.id + '\')');
						logger.trace("created %s with id %s.", ModelClass.modelName, instance.id);
						return instance;
					}).then(instance => {
						// create relations that are transmitted inline
						// update inline relations transmitted to this function
						this._upsertInlineRelations(instance, ModelClass, req.body).then(result => {
							resolve(204);
						}).catch(err => {
							reject(err);
						})
					}).catch(err => {
						reject(err);
					});
				} else {
					reject(404);
				}
			}).catch(err => {
				reject(err);
			})

		});
	}

}

