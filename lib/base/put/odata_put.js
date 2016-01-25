/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
/**
 * Created by helmut on 10.12.15.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRequestHandler = require('../BaseRequestHandler');
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
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
                            updateObj[propName] = reqObj[propName];
                        }
                        else {
                            updateObj[propName] = property.default;
                        }
                    });
                    var idName = ModelClass.getIdName();
                    var whereObj = {};
                    whereObj[idName] = id;
                    // Here we use the static method updataAll. We could also have read the entity
                    // and updated it with update
                    ModelClass.updateAll(whereObj, updateObj, function (err, results) {
                        if (err || results.count === 0) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                console.log('undefined error');
                                reject(500);
                            }
                        }
                        else {
                            resolve(204);
                        }
                    });
                }
                else {
                    console.log('ModelClass not found');
                    reject(404);
                }
            });
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
                            updateObj[propName] = reqObj[propName];
                        }
                    });
                    var idName = ModelClass.getIdName();
                    var whereObj = {};
                    whereObj[idName] = id;
                    // Here we use the static method updataAll. We could also have been read the entity
                    // and updated it with update
                    ModelClass.updateAll(whereObj, updateObj, function (err, results) {
                        if (err || results.count === 0) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                console.log('undefined error');
                                reject(500);
                            }
                        }
                        else {
                            res.sendStatus(204);
                        }
                    });
                }
                else {
                    res.sendStatus(404);
                }
            });
        });
    };
    return ODataPutBase;
})(BaseRequestHandler.BaseRequestHandler);
exports.ODataPutBase = ODataPutBase;
//# sourceMappingURL=odata_put.js.map