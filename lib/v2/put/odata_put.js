"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var odata_put_1 = require("../../base/put/odata_put");
var ODataPut = (function (_super) {
    __extends(ODataPut, _super);
    function ODataPut() {
        _super.call(this);
    }
    ;
    ODataPut.prototype.handlePut = function (req, res) {
        var _this = this;
        _super.prototype._handlePut.call(this, req, res).then(function (result) {
            res.sendStatus(204);
        }).catch(function (err) {
            _super.prototype.handleError.call(_this, err, res);
        });
    };
    ODataPut.prototype.handleMerge = function (req, res) {
        var _this = this;
        _super.prototype._handlePatch.call(this, req, res).then(function (result) {
            res.sendStatus(204);
        }).catch(function (err) {
            _super.prototype.handleError.call(_this, err, res);
        });
    };
    return ODataPut;
}(odata_put_1.ODataPutBase));
exports.ODataPut = ODataPut;
//# sourceMappingURL=odata_put.js.map