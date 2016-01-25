/// <reference path="../../../typescript/declarations/node.d.ts" />
/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var odata_post_1 = require("../../base/post/odata_post");
/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
var ODataPost = (function (_super) {
    __extends(ODataPost, _super);
    function ODataPost() {
        _super.call(this);
    }
    ;
    /**
     * handles the POST request to the OData server.
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    ODataPost.prototype.handlePost = function (req, res) {
        var _this = this;
        _super.prototype._handlePost.call(this, req, res).then(function (result) {
            res.sendStatus(201);
        }).catch(function (err) {
            _super.prototype.handleError.call(_this, err, res);
        });
    };
    return ODataPost;
})(odata_post_1.ODataPostBase);
exports.ODataPost = ODataPost;
//# sourceMappingURL=odata_post.js.map