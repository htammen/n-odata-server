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
    ODataPutBase.prototype._handlePut = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            commons.getModelClass(req.app, req.params[0]).then(function (ModelClass) {
                if (ModelClass) {
                    var id = commons.getIdFromUrlParameter(req.params[0]);
                    var reqObj = req.body;
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
    ODataPutBase.prototype._handlePatch = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            commons.getModelClass(req.app, req.params[0]).then(function (ModelClass) {
                if (ModelClass) {
                    var id = commons.getIdFromUrlParameter(req.params[0]);
                    var reqObj = req.body;
                    var updateObj = {};
                    ModelClass.forEachProperty(function (propName, property) {
                        if (reqObj[propName]) {
                            updateObj[propName] = reqObj[propName];
                        }
                    });
                    var idName = ModelClass.getIdName();
                    var whereObj = {};
                    whereObj[idName] = id;
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