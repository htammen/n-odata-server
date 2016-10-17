"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRequestHandler = require('../BaseRequestHandler');
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var ODataDeleteBase = (function (_super) {
    __extends(ODataDeleteBase, _super);
    function ODataDeleteBase() {
        _super.call(this);
    }
    ;
    ODataDeleteBase.prototype._handleDelete = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            var param0 = req.params[0];
            var id = commons.getIdFromUrlParameter(param0);
            commons.getModelClass(req.app.models, param0).then(function (ModelClass) {
                if (ModelClass) {
                    ModelClass.destroyById(id, function (err) {
                        if (!err) {
                            resolve();
                        }
                        else {
                            console.log(err);
                            reject(err);
                        }
                    });
                }
                else {
                    reject(404);
                }
            });
        });
    };
    return ODataDeleteBase;
}(BaseRequestHandler.BaseRequestHandler));
exports.ODataDeleteBase = ODataDeleteBase;
//# sourceMappingURL=odata_delete.js.map