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
var ODataDeleteBase = (function (_super) {
    __extends(ODataDeleteBase, _super);
    function ODataDeleteBase() {
        _super.call(this);
    }
    ;
    /**
     * handles the DELETE request of the OData server
     * @param req
     * @param res
     * @private
     */
    ODataDeleteBase.prototype._handleDelete = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // set OData-Version in response header
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            var param0 = req.params[0];
            // extract the id from the request
            var id = commons.getIdFromUrlParameter(param0);
            commons.getModelClass(req.app, param0).then(function (ModelClass) {
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
                    res.sendStatus(404);
                }
            });
        });
    };
    return ODataDeleteBase;
})(BaseRequestHandler.BaseRequestHandler);
exports.ODataDeleteBase = ODataDeleteBase;
//# sourceMappingURL=odata_delete.js.map