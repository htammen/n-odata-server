/**
 * This module implements the odata server functionality
 * At the moment it is implemented as local loopback component
 * See here for more details on creating and registering loopback components
 * https://docs.strongloop.com/display/public/LB/Creating+components
 *
 */
var constants = require('./constants/odata_constants');
var common = require('./common/odata_common');
var ODataGetV4 = require('./v4/get/odata_get');
var ODataPostV4 = require('./v4/post/odata_post');
var ODataPutV4 = require('./v4/put/odata_put');
var ODataDeleteV4 = require('./v4/delete/odata_delete');
var ODataGetV2 = require('./v2/get/odata_get');
var ODataPostV2 = require('./v2/post/odata_post');
var ODataDeleteV2 = require('./v2/delete/odata_delete');
var ODataPutV2 = require('./v2/put/odata_put');
var oDataServerConfig;
function _handleODataVersion2(loopbackApplication, options, oDataServerConfig) {
    this.oDataGet = new ODataGetV2.ODataGet();
    this.oDataPost = new ODataPostV2.ODataPost();
    this.oDataDelete = new ODataDeleteV2.ODataDelete();
    this.oDataPut = new ODataPutV2.ODataPut();
    common.setConfig(oDataServerConfig);
    this.oDataGet.setConfig(oDataServerConfig);
    loopbackApplication.use(options.path, function (req, res, next) {
        try {
            switch (req.method) {
                case 'GET':
                    _handleGet.call(this, req, res);
                    break;
                case 'POST':
                    _handlePost.call(this, req, res);
                    break;
                case 'PUT':
                    _handlePut.call(this, req, res);
                    var i = 2;
                    break;
                case 'DELETE':
                    _handleDelete.call(this, req, res);
                    break;
                default:
                    res.sendStatus(404);
                    break;
            }
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
}
function _handleODataVersion4(loopbackApplication, options, oDataServerConfig) {
    this.oDataGet = new ODataGetV4.ODataGet();
    this.oDataDelete = new ODataDeleteV4.ODataDelete();
    this.oDataPost = new ODataPostV4.ODataPost();
    this.oDataPut = new ODataPutV4.ODataPut();
    common.setConfig(oDataServerConfig);
    this.oDataGet.setConfig(oDataServerConfig);
    loopbackApplication.use(options.path, function (req, res, next) {
        try {
            switch (req.method) {
                case 'GET':
                    _handleGet.call(this, req, res);
                    break;
                case 'POST':
                    _handlePost.call(this, req, res);
                    break;
                case 'PUT':
                    _handlePut.call(this, req, res);
                    break;
                case 'PATCH':
                    _handlePATCH.call(this, req, res);
                    break;
                case 'MERGE':
                    _handlePATCH.call(this, req, res);
                    break;
                case 'DELETE':
                    _handleDelete.call(this, req, res);
                    break;
                default:
                    res.sendStatus(404);
                    break;
            }
        }
        catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
}
function _handleGet(req, res) {
    this.oDataGet.handleGet(req, res);
}
function _handlePost(req, res) {
    this.oDataPost.handlePost(req, res);
}
function _handlePut(req, res) {
    this.oDataPut.handlePut(req, res);
}
function _handlePATCH(req, res) {
    this.oDataPut.handlePatch(req, res);
}
function _handleDelete(req, res) {
    this.oDataDelete.handleDelete(req, res);
}
module.exports = function (loopbackApplication, options) {
    oDataServerConfig = options || {};
    if (!oDataServerConfig.maxpagesize) {
        oDataServerConfig.maxpagesize = constants.ODATA_MAXPAGESIZE;
    }
    var _pathArr = options.path.split('/');
    oDataServerConfig.odataPrefix = _pathArr[1];
    if (!oDataServerConfig.odataversion) {
        oDataServerConfig.odataversion = "4";
    }
    if (oDataServerConfig.odataversion === "4") {
        _handleODataVersion4.call(this, loopbackApplication, options, oDataServerConfig);
    }
    else if (oDataServerConfig.odataversion === "2") {
        _handleODataVersion2.call(this, loopbackApplication, options, oDataServerConfig);
    }
    else {
        console.log("odata version " + oDataServerConfig.odataversion + " not supported yet");
    }
};
//# sourceMappingURL=odata.js.map