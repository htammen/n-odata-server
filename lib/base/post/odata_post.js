/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
/**
 * Created by helmut on 09.12.15.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRequestHandler = require('../BaseRequestHandler');
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var ODataPostBase = (function (_super) {
    __extends(ODataPostBase, _super);
    function ODataPostBase() {
        _super.call(this);
    }
    ;
    /**
     * handles the POST request to the OData server.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    ODataPostBase.prototype._handlePost = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // set OData-Version in response header
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            commons.getModelClass(req.app, req.params[0]).then(function (ModelClass) {
                if (ModelClass) {
                    var readLocation = commons.getBaseURL(req) + ModelClass.definition.settings.plural;
                    ModelClass.create(req.body).then(function (obj) {
                        // set location header to update or read URL
                        res.location(readLocation + '(\'' + obj.id + '\')');
                        resolve();
                    }, function (err) {
                        reject(err);
                    });
                }
                else {
                    reject(404);
                }
            });
        });
    };
    return ODataPostBase;
})(BaseRequestHandler.BaseRequestHandler);
exports.ODataPostBase = ODataPostBase;
//# sourceMappingURL=odata_post.js.map