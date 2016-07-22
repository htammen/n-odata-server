"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commons = require('../../common/odata_common');
var BaseRequestHandler = require('../../base/BaseRequestHandler');
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
}(BaseRequestHandler.BaseRequestHandler));
exports.ODataPost = ODataPost;
function _handlePost(req, res) {
    this.setODataVersion(res);
    commons.getModelClass(req.app.models, req.params[0]).then(function (ModelClass) {
        if (ModelClass) {
            var readLocation = commons.getBaseURL(req) + ModelClass.definition.settings.plural;
            ModelClass.create(req.body, function (err, obj) {
                if (err || obj === null) {
                    res.sendStatus(500);
                }
                else {
                    res.location(readLocation + '(\'' + obj.id + '\')');
                    res.sendStatus(201);
                }
            });
        }
        else {
            res.sendStatus(404);
        }
    });
}
//# sourceMappingURL=odata_post.js.map