/// <reference path="../../typings/index.d.ts" />

import {BaseRequestHandler} from "./BaseRequestHandler";
import log4js = require('log4js');
import lb_constants = require('../constants/loopback_constants');
import {LoopbackModelClass} from "../types/loopbacktypes";
import {LoopbackRelationDefinition} from "../types/loopbacktypes";

export class BaseUpdateRequestHandler extends BaseRequestHandler {
	logger = log4js.getLogger("base");

	constructor() {
		super()
	};

	/**
	 * Update / create the relations that were transmitted inline with a PUT / MERGE / PATCH or POST request
	 * @param instance Object that is the parent for the relating objects
	 * @param ModelClass ModelClass of the instance object
	 * @param reqObj Request payload or object that was transmitted with the request
	 * @returns {Promise} Promise that resolves if all objects were saved successfully, otherwise it rejects
	 * @private
	 */
	_upsertInlineRelations(instance:any, ModelClass:LoopbackModelClass, reqObj:Object) {
		var that = this;
		return new Promise((resolve, reject) => {
			if(!instance || !ModelClass || !reqObj) {
				reject("none of the parameters must be null or undefined");
			}
			var arrRelPromises:Array<any> = [];
			// collect  all relation requests in an array of relation promises. These will be processed later
			for (var rel in ModelClass.relations) {
				arrRelPromises.push(new Promise((resolve, reject) => {
					var relDefinition:LoopbackRelationDefinition = ModelClass.relations[rel];
					// is there a relation transmitted with the request?
					if (reqObj[rel]) {
						// we do have a relation "rel" in the request
						if (relDefinition.type === lb_constants.LB_REL_HASONE) {
							// A HasOne relation must either be updated or created. There can't be two related objects
							instance[rel].update(reqObj[rel]).then((newRelObj) => {
								this.logger.trace("sucessfully updated hasOne relation %s for object %s of model class %s. The new object has id %s", rel, instance.getId(), ModelClass.modelName, newRelObj.getId());
								resolve();
							}).catch((err) => {
								// Update failed. Probably cause there is no related object yet --> create a new one
								this.logger.trace("error while updating hasOne relation %s for object %s of model class %s. Error message: %s", rel, instance.getId(), ModelClass.modelName, err.message);
								instance[rel].create(reqObj[rel]).then((newRelObj) => {
									this.logger.trace("sucessfully created hasOne relation %s for object %s of model class %s. The new object has id %s", rel, instance.getId(), ModelClass.modelName, newRelObj.getId());
									resolve();
								}).catch(err => {
									this.logger.trace("error while creating hasOne relation %s for object %s of model class %s. Error message: %s", rel, instance.getId(), ModelClass.modelName, err.message);
									reject();
								})
							})
						} else if (relDefinition.type === lb_constants.LB_REL_HASMANY) {
							// A HasMany inline relation can only be inserted if no id is transmitted. If an id is known we try to update an existing relation
							var relModelClassIdName:string = relDefinition.modelTo.getIdName();
							// loop through all objects of this relation that were transmitted with the request and create a promise for each one
							var arrRelHasManyPromises: Array<any> = [];
							reqObj[rel].forEach((reqObjInstance) => {
								arrRelHasManyPromises.push(new Promise((resolve, reject) => {
									if (reqObjInstance[relModelClassIdName]) {
										// there is an id in the request body --> update
										instance[rel].findById(reqObjInstance[relModelClassIdName]).then((foundRelObj) => {
											foundRelObj.updateAttributes(reqObjInstance).then(updatedRelObj => {
												this.logger.trace("updated relation object with id %s in relation %s of model %s with id %s", updatedRelObj.getId(), rel, ModelClass.modelName, instance.getId());
												resolve();
											}).catch(err => {
												this.logger.trace("error while updating relation object with id %s in relation %s of model %s with id %s", foundRelObj.getId(), rel, ModelClass.modelName, instance.getId());
												reject(err);
											})
										}).catch(err => {
											this.logger.trace("relation object with id %s of relation %s of model %s with id %s not found. Err: %s", reqObjInstance[relModelClassIdName], rel, ModelClass.modelName, instance.getId(), err.message);
											reject(err);
										})
									} else {
										// no id in request body --> create
										instance[rel].create(reqObjInstance).then(createdRelObj => {
											this.logger.trace("inserted relation object with id %s into relation %s of model %s with id %s", createdRelObj.getId(), rel, ModelClass.modelName, instance.getId());
											resolve();
										}).catch(err => {
											this.logger.trace("error while inserting relation object with into relation %s of model %s with id %s", rel, ModelClass.modelName, instance.getId());
											reject(err);
										})
									}
								}))
							});
							Promise.all(arrRelHasManyPromises).then(arrPromiseResults => {
								resolve();
							}).catch(err => {
								reject(err);
							})
						} else if (relDefinition.type === lb_constants.LB_REL_BELONGSTO) {
							// loop through all objects of this relation that were transmitted with the request and create a promise for each one
							var reqObjInstance:any = reqObj[rel];
							if(reqObjInstance.__metadata && reqObjInstance.__metadata.uri) {
								var idOfNewOwner = that._getIdOfNewOwner(reqObjInstance.__metadata.uri, relDefinition);
								instance.updateAttribute(relDefinition.keyFrom, idOfNewOwner).then((udatedInstance) => {
									this.logger.trace("sucessfully updated belongsTo relation %s for object %s of model class %s. The new owner has id %s", rel, instance.getId(), ModelClass.modelName, idOfNewOwner);
									resolve();
								}).catch((err) => {
									// Update failed.
									this.logger.trace("error while updating belongsTo relation %s for object %s of model class %s. Error message: %s", rel, instance.getId(), ModelClass.modelName, err.message);
									reject();
								})
							}
						}
					} else {
						// There is not relation "rel" transmitted with the request. Just resolve the Promise
						resolve();
					}
				}));
			}
			// Process all collected relation promises
			if(arrRelPromises.length > 0) {
				Promise.all(arrRelPromises).then((arrPromiseResults) => {
					resolve(204);
				}).catch(err => {
					reject(err);
				})
			} else {
				// no relations to update --> resolve
				resolve(204);
			}
		})
	}

	/**
	 * Retrieve the id out of the uri to the owner of a belongsTo relation
	 * @param uri URI to the owner object
	 * @param relDefinition The relation definition
	 * @private
   */
	_getIdOfNewOwner(uri: string, relDefinition: LoopbackRelationDefinition): any {
		var retValue;
		var modelToClass: string = relDefinition.modelTo.pluralModelName;
		if(!modelToClass) {
			modelToClass = relDefinition.modelTo.modelName + "s";
		}
		var idx:number = uri.indexOf(modelToClass)
		if(idx > -1) {
			var idxOfClosingParanthese = uri.indexOf(")", idx);
			if(idxOfClosingParanthese > -1) {
				retValue = uri.substring(idx + modelToClass.length + 1, idxOfClosingParanthese);
			}
		}
		return retValue;
	}
}
