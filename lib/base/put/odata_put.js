/// <reference path="../../../typings/main.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by helmut on 10.12.15.
 */
var log4js = require('log4js');
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var BaseUpdateRequestHandler_1 = require("../BaseUpdateRequestHandler");
var logger = log4js.getLogger("put");
var ODataPutBase = (function (_super) {
    __extends(ODataPutBase, _super);
    function ODataPutBase() {
        _super.call(this);
    }
    ;
    /**
     * handles the PUT request to the OData server. The PUT request is used to update an entity where
     * only the submitted properties are set. All other properties are reset to their default values.
     * Be aware that this could lead to data loss. If you only want to change the submitted properties
     * and keep all other properties values use PATCH or MERGE (only OData V2.0).
     * @param req
     * @param res
     * @private
     */
    ODataPutBase.prototype._handlePut = function (req, res) {
        var _this = this;
        logger.trace("handle put");
        return new Promise(function (resolve, reject) {
            // set OData-Version in response header
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            commons.getModelClass(req.app.models, req.params[0]).then((function (ModelClass) {
                if (ModelClass) {
                    var id = commons.getIdFromUrlParameter(req.params[0]);
                    var reqObj = req.body;
                    // create an object that is saved to the db and set all properties from request body
                    // If not defined there set default value or undefined if no default has been defined
                    var updateObj = {};
                    ModelClass.forEachProperty(function (propName, property) {
                        if (reqObj[propName]) {
                            // With date types we allow OData dates as well as Javascript dates
                            if (property.type.name === "Date") {
                                if (reqObj[propName].indexOf("/Date(") > -1) {
                                    updateObj[propName] = new Date(parseInt(reqObj[propName].substr(6)));
                                }
                                else {
                                    updateObj[propName] = reqObj[propName];
                                }
                            }
                            else {
                                updateObj[propName] = reqObj[propName];
                            }
                        }
                        else {
                            updateObj[propName] = property.default;
                        }
                    });
                    ModelClass.findById(id).then(function (instance) {
                        logger.trace("found %s with id %s in database. Will try to update the object", ModelClass.modelName, id);
                        return instance.updateAttributes(updateObj);
                    }).then(function (instance) {
                        logger.trace("updated %s with id %s.", ModelClass.modelName, id);
                        // update inline relations transmitted to this function
                        _this._upsertInlineRelations(instance, ModelClass, reqObj).then(function (result) {
                            resolve(204);
                        }).catch(function (err) {
                            reject(err);
                        });
                    }).catch(function (err) {
                        if (err) {
                            logger.error(err);
                            reject(err);
                        }
                        else {
                            logger.error('undefined error');
                            reject(500);
                        }
                    });
                }
                else {
                    logger.warn('ModelClass not found');
                    reject(404);
                }
            }).bind(_this));
        });
    };
    /**
     * handles the PATCH request to the OData server. The PATCH request is used to update an entity where
     * only the submitted properties are set. The other properties of the entity will not be changed.
     * @param req
     * @param res
     * @private
     */
    ODataPutBase.prototype._handlePatch = function (req, res) {
        var _this = this;
        // TODO: Currently the only thing the handlePatch differentiates from handlePut is that no default value is sett. Is this corrent?
        logger.trace("handle patch / merge");
        return new Promise(function (resolve, reject) {
            // set OData-Version in response header
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            commons.getModelClass(req.app.models, req.params[0]).then(function (ModelClass) {
                if (ModelClass) {
                    var id = commons.getIdFromUrlParameter(req.params[0]);
                    var reqObj = req.body;
                    // create an object that is saved to the db and set all properties from request body
                    // If not defined there set default value or undefined if no default has been defined
                    var updateObj = {};
                    ModelClass.forEachProperty(function (propName, property) {
                        if (reqObj[propName]) {
                            if (property.type.name === "Date") {
                                if (reqObj[propName].indexOf("/Date(") > -1) {
                                    updateObj[propName] = new Date(parseInt(reqObj[propName].substr(6)));
                                }
                                else {
                                    updateObj[propName] = reqObj[propName];
                                }
                            }
                            else {
                                updateObj[propName] = reqObj[propName];
                            }
                        }
                    });
                    ModelClass.findById(id).then(function (instance) {
                        logger.trace("found %s with id %s in database. Will try to update the object", ModelClass.name, id);
                        return instance.updateAttributes(updateObj);
                    }).then(function (instance) {
                        logger.trace("updated %s with id %s.", ModelClass.name, id);
                        // update inline relations transmitted to this function
                        _this._upsertInlineRelations(instance, ModelClass, reqObj).then(function (result) {
                            resolve(204);
                        }).catch(function (err) {
                            reject(err);
                        });
                    }).catch(function (err) {
                        if (err) {
                            logger.error(err);
                            reject(err);
                        }
                        else {
                            logger.error('undefined error');
                            reject(500);
                        }
                    });
                }
                else {
                    logger.warn('ModelClass not found');
                    reject(404);
                }
            });
        });
    };
    return ODataPutBase;
})(BaseUpdateRequestHandler_1.BaseUpdateRequestHandler);
exports.ODataPutBase = ODataPutBase;
//# sourceMappingURL=odata_put.js.map