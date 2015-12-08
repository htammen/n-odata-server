var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commons = require('../../common/odata_common');
var BaseRequestHandler = require('../../base/BaseRequestHandler');
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
    ODataPost.prototype.handlePost = function (req, res) {
        _handlePost.call(this, req, res);
    };
    return ODataPost;
})(BaseRequestHandler.BaseRequestHandler);
exports.ODataPost = ODataPost;
/**
 * handles the POST request to the OData server.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _handlePost(req, res) {
    // set OData-Version in response header
    this.setODataVersion(res);
    var ModelClass = commons.getModelClass(req.app, req.params[0]);
    if (ModelClass) {
        var readLocation = commons.getBaseURL(req) + ModelClass.definition.settings.plural;
        ModelClass.create(req.body, function (err, obj) {
            if (err || obj === null) {
                res.sendStatus(500);
            }
            else {
                // set location header to update or read URL
                res.location(readLocation + '(\'' + obj.id + '\')');
                // status must be 201
                res.sendStatus(201);
            }
        });
    }
    else {
        res.sendStatus(404);
    }
}
//# sourceMappingURL=odata_post.js.map