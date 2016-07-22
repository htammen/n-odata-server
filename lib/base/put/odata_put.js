"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    ODataPutBase.prototype._handlePut = function (req, res) {
        var _this = this;
        logger.trace("handle put");
        return new Promise(function (resolve, reject) {
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            var req_app = req.app;
            commons.getModelClass(req_app.models, req.params[0]).then((function (ModelClass) {
                if (ModelClass) {
                    var id = commons.getIdFromUrlParameter(req.params[0]);
                    var reqObj = req.body;
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
                        else {
                            updateObj[propName] = property.default;
                        }
                    });
                    ModelClass.findById(id).then(function (instance) {
                        logger.trace("found %s with id %s in database. Will try to update the object", ModelClass.modelName, id);
                        return instance.updateAttributes(updateObj);
                    }).then(function (instance) {
                        logger.trace("updated %s with id %s.", ModelClass.modelName, id);
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
    ODataPutBase.prototype._handlePatch = function (req, res) {
        var _this = this;
        logger.trace("handle patch / merge");
        return new Promise(function (resolve, reject) {
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            var req_app = req.app;
            commons.getModelClass(req_app.models, req.params[0]).then(function (ModelClass) {
                if (ModelClass) {
                    var id = commons.getIdFromUrlParameter(req.params[0]);
                    var reqObj = req.body;
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
}(BaseUpdateRequestHandler_1.BaseUpdateRequestHandler));
exports.ODataPutBase = ODataPutBase;
//# sourceMappingURL=odata_put.js.map