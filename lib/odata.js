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
        this.initProceeded = false;
        if (!OData.singletonInstance) {
            OData.singletonInstance = this;
        }
        return OData.singletonInstance;
    }
    OData.prototype.getODataServerConfig = function () {
        return this._oDataServerConfig;
    };
    OData.prototype.init = function (loopbackApplication, options) {
        if (!this.initProceeded) {
            this._oDataServerConfig = this._oDataServerConfig || options || {};
            if (!this._oDataServerConfig.maxpagesize) {
                this._oDataServerConfig.maxpagesize = constants.ODATA_MAXPAGESIZE;
            }
            var _pathArr = (options && options.path && options.path.split('/'));
            if (_pathArr) {
                this._oDataServerConfig.odataPrefix = _pathArr[1];
            }
            if (!this._oDataServerConfig.odataversion) {
                this._oDataServerConfig.odataversion = "4";
            }
            common.setConfig(this._oDataServerConfig);
            if (this._oDataServerConfig.odataversion === "4") {
                this.oDataGet = new ODataGetV4.ODataGet();
                this.oDataDelete = new ODataDeleteV4.ODataDelete();
                this.oDataPost = new ODataPostV4.ODataPost();
                this.oDataPut = new ODataPutV4.ODataPut();
                this.oDataGet.setConfig(this._oDataServerConfig);
            }
            else {
                this.oDataGet = new ODataGetV2.ODataGet();
                this.oDataPost = new ODataPostV2.ODataPost();
                this.oDataDelete = new ODataDeleteV2.ODataDelete();
                this.oDataPut = new ODataPutV2.ODataPut();
                this.oDataGet.setConfig(this._oDataServerConfig);
            }
            if (!options.useViaMiddleware) {
                if (this._oDataServerConfig.odataversion === "4") {
                    this._handleODataVersion4(loopbackApplication, options);
                }
                else if (this._oDataServerConfig.odataversion === "2") {
                    this._handleODataVersion2(loopbackApplication, options);
                }
                else {
                    console.log("odata version " + this._oDataServerConfig.odataversion + " not supported yet");
                }
            }
            this.initProceeded = true;
        }
    };
    ;
    OData.prototype._handleODataVersion2 = function (loopbackApplication, options) {
        loopbackApplication.use(options.path, function (req, res, next) {
            this.handleRequestV2(req, res, next);
        }.bind(this));
    };
    OData.prototype._handleODataVersion4 = function (loopbackApplication, options) {
        loopbackApplication.use(options.path, function (req, res, next) {
            this.handleRequestV4(req, res, next);
        }.bind(this));
    };
    OData.prototype.handleRequestV2 = function (req, res, next) {
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
    };
    OData.prototype.handleRequestV4 = function (req, res, next) {
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
exports.OData = OData;
function init(loopbackApplication, options) {
    var oData = new OData();
    oData.init(loopbackApplication, options);
}
exports.init = init;
;
//# sourceMappingURL=odata.js.map