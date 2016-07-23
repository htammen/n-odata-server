"use strict";
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
var fs = require('fs');
var log4js = require('log4js');
fs.stat('n_odata_server_log.json', function (err, stat) {
    var fileName = __dirname + '/log4js.json';
    if (!err) {
        fileName = 'n_odata_server_log.json';
    }
    log4js.configure(fileName);
});
var logger = log4js.getLogger("odata");
var OData = (function () {
    function OData() {
    }
    OData.prototype.init = function (loopbackApplication, options) {
        this.oDataServerConfig = options || {};
        if (!this.oDataServerConfig.maxpagesize) {
            this.oDataServerConfig.maxpagesize = constants.ODATA_MAXPAGESIZE;
        }
        var _pathArr = options.path.split('/');
        this.oDataServerConfig.odataPrefix = _pathArr[1];
        if (!this.oDataServerConfig.odataversion) {
            this.oDataServerConfig.odataversion = "4";
        }
        if (this.oDataServerConfig.odataversion === "4") {
            this._handleODataVersion4(loopbackApplication, options, this.oDataServerConfig);
        }
        else if (this.oDataServerConfig.odataversion === "2") {
            this._handleODataVersion2(loopbackApplication, options, this.oDataServerConfig);
        }
        else {
            console.log("odata version " + this.oDataServerConfig.odataversion + " not supported yet");
        }
    };
    ;
    OData.prototype._handleODataVersion2 = function (loopbackApplication, options, oDataServerConfig) {
        this.oDataGet = new ODataGetV2.ODataGet();
        this.oDataPost = new ODataPostV2.ODataPost();
        this.oDataDelete = new ODataDeleteV2.ODataDelete();
        this.oDataPut = new ODataPutV2.ODataPut();
        common.setConfig(oDataServerConfig);
        this.oDataGet.setConfig(oDataServerConfig);
        loopbackApplication.use(options.path, function (req, res, next) {
            try {
                logger.info("processing OData V2 request of type " + req.method);
                logger.debug("baseUrl = " + req.baseUrl);
                switch (req.method) {
                    case 'GET':
                        this._handleGet(req, res);
                        break;
                    case 'POST':
                        var x_http_method = req.get('x-http-method');
                        if (x_http_method) {
                            switch (x_http_method) {
                                case 'MERGE':
                                    this._handleMerge(req, res);
                                    break;
                                case 'PATCH':
                                    this._handleMerge(req, res);
                                    break;
                                case 'PUT':
                                    this._handlePut(req, res);
                                    break;
                                case 'DELETE':
                                    this._handleDelete(req, res);
                                    break;
                                default:
                                    res.status(500).send("HTTP verb " + x_http_method + " not supported by POST tunneling");
                            }
                        }
                        else {
                            this._handlePost(req, res);
                        }
                        break;
                    case 'PUT':
                        this._handlePut(req, res);
                        var i = 2;
                        break;
                    case 'DELETE':
                        this._handleDelete(req, res);
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
        }.bind(this));
    };
    OData.prototype._handleODataVersion4 = function (loopbackApplication, options, oDataServerConfig) {
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
                        this._handleGet(req, res);
                        break;
                    case 'POST':
                        var x_http_method = req.get('x-http-method');
                        if (x_http_method) {
                            switch (x_http_method) {
                                case 'MERGE':
                                    this._handlePatch(req, res);
                                    break;
                                case 'PATCH':
                                    this._handlePatch(req, res);
                                    break;
                                case 'PUT':
                                    this._handlePut(req, res);
                                    break;
                                case 'DELETE':
                                    this._handleDelete(req, res);
                                    break;
                                default:
                                    res.status(500).send("HTTP verb " + x_http_method + " not supported by POST tunneling");
                            }
                        }
                        else {
                            this._handlePost(req, res);
                        }
                        break;
                    case 'PUT':
                        this._handlePut(req, res);
                        break;
                    case 'PATCH':
                        this._handlePatch(req, res);
                        break;
                    case 'MERGE':
                        this._handlePatch(req, res);
                        break;
                    case 'DELETE':
                        this._handleDelete(req, res);
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
        }.bind(this));
    };
    OData.prototype._handleGet = function (req, res) {
        this.oDataGet.handleGet(req, res);
    };
    OData.prototype._handlePost = function (req, res) {
        this.oDataPost.handlePost(req, res);
    };
    OData.prototype._handlePut = function (req, res) {
        this.oDataPut.handlePut(req, res);
    };
    OData.prototype._handlePatch = function (req, res) {
        this.oDataPut.handlePatch(req, res);
    };
    OData.prototype._handleMerge = function (req, res) {
        this.oDataPut.handleMerge(req, res);
    };
    OData.prototype._handleDelete = function (req, res) {
        this.oDataDelete.handleDelete(req, res);
    };
    return OData;
}());
module.exports = function (loopbackApplication, options) {
    var oData = new OData();
    oData.init(loopbackApplication, options);
};
//# sourceMappingURL=odata.js.map