/// <reference path="../../typings/main.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRequestHandler_1 = require("./BaseRequestHandler");
var log4js = require('log4js');
var lb_constants = require('../constants/loopback_constants');
var BaseUpdateRequestHandler = (function (_super) {
    __extends(BaseUpdateRequestHandler, _super);
    function BaseUpdateRequestHandler() {
        _super.call(this);
        this.logger = log4js.getLogger("base");
    }
    ;
    /**
     * Update / create the relations that were transmitted inline with a PUT / MERGE / PATCH or POST request
     * @param instance Object that is the parent for the relating objects
     * @param ModelClass ModelClass of the instance object
     * @param reqObj Request payload or object that was transmitted with the request
     * @returns {Promise} Promise that resolves if all objects were saved successfully, otherwise it rejects
     * @private
     */
    BaseUpdateRequestHandler.prototype._upsertInlineRelations = function (instance, ModelClass, reqObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var arrRelPromises = [];
            for (var rel in ModelClass.relations) {
                arrRelPromises.push(new Promise(function (resolve, reject) {
                    var relDefinition = ModelClass.relations[rel];
                    // is there a relation transmitted with the request?
                    if (reqObj[rel]) {
                        // we do have a relation "rel" in the request
                        if (relDefinition.type === lb_constants.LB_REL_HASONE) {
                            // A HasOne relation must either be updated or created. There can't be two related objects
                            instance[rel].update(reqObj[rel]).then(function (newRelObj) {
                                _this.logger.trace("sucessfully updated hasOne relation %s for object %s of model class %s. The new object has id %s", rel, instance.getId(), ModelClass.modelName, newRelObj.getId());
                                resolve();
                            }).catch(function (err) {
                                // Update failed. Probably cause there is no related object yet --> create a new one
                                _this.logger.trace("error while updating hasOne relation %s for object %s of model class %s. Error message: %s", rel, instance.getId(), ModelClass.modelName, err.message);
                                instance[rel].create(reqObj[rel]).then(function (newRelObj) {
                                    _this.logger.trace("sucessfully created hasOne relation %s for object %s of model class %s. The new object has id %s", rel, instance.getId(), ModelClass.modelName, newRelObj.getId());
                                    resolve();
                                }).catch(function (err) {
                                    _this.logger.trace("error while creating hasOne relation %s for object %s of model class %s. Error message: %s", rel, instance.getId(), ModelClass.modelName, err.message);
                                    reject();
                                });
                            });
                        }
                        else if (relDefinition.type === lb_constants.LB_REL_HASMANY) {
                            // A HasMany inline relation can only be inserted if no id is transmitted. If an id is known we try to update an existing relation
                            var relModelClassIdName = relDefinition.modelTo.getIdName();
                            // loop through all objects of this relation that were transmitted with the request and create a promise for each one
                            var arrRelHasManyPromises = [];
                            reqObj[rel].forEach(function (reqObjInstance) {
                                arrRelHasManyPromises.push(new Promise(function (resolve, reject) {
                                    if (reqObjInstance[relModelClassIdName]) {
                                        // there is an id in the request body --> update
                                        instance[rel].findById(reqObjInstance[relModelClassIdName]).then(function (foundRelObj) {
                                            foundRelObj.updateAttributes(reqObjInstance).then(function (updatedRelObj) {
                                                _this.logger.trace("updated relation object with id %s in relation %s of model %s with id %s", updatedRelObj.getId(), rel, ModelClass.modelName, instance.getId());
                                                resolve();
                                            }).catch(function (err) {
                                                _this.logger.trace("error while updating relation object with id %s in relation %s of model %s with id %s", foundRelObj.getId(), rel, ModelClass.modelName, instance.getId());
                                                reject(err);
                                            });
                                        }).catch(function (err) {
                                            _this.logger.trace("relation object with id %s of relation %s of model %s with id %s not found. Err: %s", reqObjInstance[relModelClassIdName], rel, ModelClass.modelName, instance.getId(), err.message);
                                            reject(err);
                                        });
                                    }
                                    else {
                                        // no id in request body --> create
                                        instance[rel].create(reqObjInstance).then(function (createdRelObj) {
                                            _this.logger.trace("inserted relation object with id %s into relation %s of model %s with id %s", createdRelObj.getId(), rel, ModelClass.modelName, instance.getId());
                                            resolve();
                                        }).catch(function (err) {
                                            _this.logger.trace("error while inserting relation object with into relation %s of model %s with id %s", rel, ModelClass.modelName, instance.getId());
                                            reject(err);
                                        });
                                    }
                                }));
                            });
                            Promise.all(arrRelHasManyPromises).then(function (arrPromiseResults) {
                                resolve();
                            }).catch(function (err) {
                                reject(err);
                            });
                        }
                    }
                    else {
                        // There is not relation "rel" transmitted with the request. Just resolve the Promise
                        resolve();
                    }
                }));
            }
            Promise.all(arrRelPromises).then(function (arrPromiseResults) {
                resolve(204);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return BaseUpdateRequestHandler;
})(BaseRequestHandler_1.BaseRequestHandler);
exports.BaseUpdateRequestHandler = BaseUpdateRequestHandler;
//# sourceMappingURL=BaseUpdateRequestHandler.js.map