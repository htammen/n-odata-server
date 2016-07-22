"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var odata_delete_1 = require("../../base/delete/odata_delete");
var ODataDelete = (function (_super) {
    __extends(ODataDelete, _super);
    function ODataDelete() {
        _super.call(this);
    }
    ;
    ODataDelete.prototype.handleDelete = function (req, res) {
        var _this = this;
        _super.prototype._handleDelete.call(this, req, res).then(function (result) {
            res.sendStatus(204);
        }).catch(function (err) {
            _super.prototype.handleError.call(_this, err, res);
        });
    };
    return ODataDelete;
}(odata_delete_1.ODataDeleteBase));
exports.ODataDelete = ODataDelete;
//# sourceMappingURL=odata_delete.js.map