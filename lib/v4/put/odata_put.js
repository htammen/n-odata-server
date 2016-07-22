"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commons = require('../../common/odata_common');
var BaseRequestHandler = require('../../base/BaseRequestHandler');
var ODataPut = (function (_super) {
    __extends(ODataPut, _super);
    function ODataPut() {
        _super.call(this);
    }
    ;
    ODataPut.prototype.handlePut = function (req, res) {
        _handlePut.call(this, req, res);
    };
    ;
    ODataPut.prototype.handlePatch = function (req, res) {
        _handlePatch.call(this, req, res);
    };
    return ODataPut;
}(BaseRequestHandler.BaseRequestHandler));
exports.ODataPut = ODataPut;
function _handlePut(req, res) {
    this.setODataVersion(res);
    commons.getModelClass(req.app.models, req.params[0]).then(function (ModelClass) {
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
                    res.sendStatus(500);
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
}
function _handlePatch(req, res) {
    this.setODataVersion(res);
    commons.getModelClass(req.app.models, req.params[0]).then(function (ModelClass) {
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
                    res.sendStatus(500);
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
}
//# sourceMappingURL=odata_put.js.map