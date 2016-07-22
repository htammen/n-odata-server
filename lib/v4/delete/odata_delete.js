"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commons = require('../../common/odata_common');
var BaseRequestHandler = require('../../base/BaseRequestHandler');
var ODataDelete = (function (_super) {
    __extends(ODataDelete, _super);
    function ODataDelete() {
        _super.call(this);
    }
    ;
    ODataDelete.prototype.handleDelete = function (req, res) {
        _handleDelete.call(this, req, res);
    };
    return ODataDelete;
}(BaseRequestHandler.BaseRequestHandler));
exports.ODataDelete = ODataDelete;
function _handleDelete(req, res) {
    this.setODataVersion(res);
    var param0 = req.params[0];
    var id = commons.getIdFromUrlParameter(param0);
    commons.getModelClass(req.app.models, param0).then(function (ModelClass) {
        if (ModelClass) {
            ModelClass.destroyById(id, function (err) {
                if (!err) {
                    res.sendStatus(204);
                }
                else {
                    res.sendStatus(500);
                }
            });
        }
        else {
            res.sendStatus(404);
        }
    });
}
//# sourceMappingURL=odata_delete.js.map