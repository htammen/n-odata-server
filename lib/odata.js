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
var odata_enums_1 = require("./constants/odata_enums");
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
            options = options || {};
            this.oLoopbackApp = loopbackApplication;
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
                    logger.trace("odata version " + this._oDataServerConfig.odataversion + " not supported yet");
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
        var _this = this;
        try {
            logger.info("processing OData V2 request of type " + req.method);
            logger.debug("baseUrl = " + req.baseUrl);
            this.checkAccess(req, res).then(function () {
                logger.debug("checkAccess passed successfully");
                var method = _this.getRequestMethod(req);
                switch (method) {
                    case odata_enums_1.HttpMethod.GET:
                        _this._handleGet(req, res);
                        break;
                    case odata_enums_1.HttpMethod.POST:
                        _this._handlePost(req, res);
                        break;
                    case odata_enums_1.HttpMethod.PUT:
                        _this._handlePut(req, res);
                        var i = 2;
                        break;
                    case odata_enums_1.HttpMethod.PATCH:
                        _this._handlePatch(req, res);
                        break;
                    case odata_enums_1.HttpMethod.MERGE:
                        _this._handleMerge(req, res);
                        break;
                    case odata_enums_1.HttpMethod.DELETE:
                        _this._handleDelete(req, res);
                        break;
                    default:
                        res.sendStatus(404);
                        break;
                }
            }).catch(function (err) {
                var statusCode = (err && err.statusCode) || 500;
                res.status(statusCode).send(err);
            });
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    };
    OData.prototype.handleRequestV4 = function (req, res, next) {
        var _this = this;
        try {
            this.checkAccess(req, res).then(function () {
                var method = _this.getRequestMethod(req);
                switch (method) {
                    case odata_enums_1.HttpMethod.GET:
                        _this._handleGet(req, res);
                        break;
                    case odata_enums_1.HttpMethod.POST:
                        _this._handlePost(req, res);
                        break;
                    case odata_enums_1.HttpMethod.PUT:
                        _this._handlePut(req, res);
                        break;
                    case odata_enums_1.HttpMethod.PATCH:
                        _this._handlePatch(req, res);
                        break;
                    case odata_enums_1.HttpMethod.MERGE:
                        _this._handlePatch(req, res);
                        break;
                    case odata_enums_1.HttpMethod.DELETE:
                        _this._handleDelete(req, res);
                        break;
                    default:
                        res.sendStatus(404);
                        break;
                }
            }).catch(function (err) {
                var statusCode = (err && err.statusCode) || 500;
                res.status(statusCode).send(err);
            });
        }
        catch (e) {
            logger.error(e);
            res.status(500).send(e);
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
    OData.prototype.checkAccess = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (req.params[0] === "$metadata" || req.params[0] === "") {
                logger.debug("call to " + req.params[0] + ". Doesn't need checkAccess");
                resolve();
            }
            else {
                var method_1 = _this.getRequestMethod(req);
                var remotes_1 = _this.oLoopbackApp.remotes();
                common.getRequestModelClass(_this.oLoopbackApp.models, req.params[0]).then(function (modelClassResult) {
                    var ctx;
                    if (modelClassResult && modelClassResult.modelClass) {
                        for (var _i = 0, _a = remotes_1.classes(); _i < _a.length; _i++) {
                            var lbClass = _a[_i];
                            if (lbClass.name === modelClassResult.modelClass.modelName) {
                                if (method_1 === odata_enums_1.HttpMethod.GET) {
                                    ctx = _this.getGETCheckAccessContext(req, lbClass);
                                    break;
                                }
                                else if (method_1 === odata_enums_1.HttpMethod.POST) {
                                    ctx = _this.getPOSTCheckAccessContext(req, lbClass);
                                    break;
                                }
                                else if (method_1 === odata_enums_1.HttpMethod.PUT || method_1 === odata_enums_1.HttpMethod.PATCH || method_1 === odata_enums_1.HttpMethod.MERGE) {
                                    ctx = _this.getPUTCheckAccessContext(req, lbClass);
                                    break;
                                }
                                else if (method_1 === odata_enums_1.HttpMethod.DELETE) {
                                    ctx = _this.getDELETECheckAccessContext(req, lbClass);
                                    break;
                                }
                            }
                        }
                    }
                    if (ctx && ctx.method && ctx.instance) {
                        if (ctx.method.ctor.checkAccess) {
                            ctx.method.ctor.checkAccess(req.accessToken, ctx.instance.id, ctx.method, ctx, function (err, allowed) {
                                if (err) {
                                    logger.error(err);
                                    reject(err);
                                }
                                else if (allowed) {
                                    resolve();
                                }
                                else {
                                    var messages = {
                                        403: {
                                            message: 'Access Denied',
                                            code: 'ACCESS_DENIED'
                                        },
                                        404: {
                                            message: ('could not find ' + ctx.method + ' with id ' + ctx.instance.id),
                                            code: 'MODEL_NOT_FOUND'
                                        },
                                        401: {
                                            message: 'Authorization Required',
                                            code: 'AUTHORIZATION_REQUIRED'
                                        }
                                    };
                                    var errStatusCode = 401;
                                    var e = new Error(messages[errStatusCode].message || messages[403].message);
                                    e.statusCode = errStatusCode;
                                    e.code = messages[errStatusCode].code || messages[403].code;
                                    reject(e);
                                }
                            });
                        }
                    }
                    else {
                        logger.error("Something went wrong with retrieving requestModelClass for request " + req.params[0]);
                        var err = new Error("You don't have access to request " + req.params[0] + ".");
                        err.statusCode = 401;
                        reject(err);
                    }
                }).catch(function (err) {
                    logger.error(err);
                    reject(err);
                });
            }
        });
    };
    OData.prototype.getRequestMethod = function (req) {
        var method = req.method;
        if (method === odata_enums_1.HttpMethod[odata_enums_1.HttpMethod.POST]) {
            var x_http_method = req.get('x-http-method');
            if (x_http_method) {
                method = x_http_method;
            }
        }
        return odata_enums_1.HttpMethod[method];
    };
    OData.prototype.getGETCheckAccessContext = function (req, lbClass) {
        var re = /^\w*[(]([a-zA-Z0-9']*)[)]/g, match = re.exec(req.params[0]), _id, lbMethod;
        if (match) {
            lbMethod = lbClass.find("findById", true);
            _id = match[1];
        }
        else {
            lbMethod = lbClass.find("find", true);
        }
        return {
            method: lbMethod,
            req: req,
            instance: {
                id: _id
            }
        };
    };
    OData.prototype.getPOSTCheckAccessContext = function (req, lbClass) {
        var lbMethod;
        lbMethod = lbClass.find("create", true);
        return {
            method: lbMethod,
            req: req,
            instance: {
                id: null
            }
        };
    };
    OData.prototype.getPUTCheckAccessContext = function (req, lbClass) {
        var re = /^\w*[(]([a-zA-Z0-9']*)[)]/g, match = re.exec(req.params[0]), _id, lbMethod;
        if (match) {
            lbMethod = lbClass.find("updateAttributes", false);
            _id = match[1];
        }
        return {
            method: lbMethod,
            req: req,
            instance: {
                id: _id
            }
        };
    };
    OData.prototype.getDELETECheckAccessContext = function (req, lbClass) {
        var re = /^\w*[(]([a-zA-Z0-9']*)[)]/g, match = re.exec(req.params[0]), _id, lbMethod;
        if (match) {
            lbMethod = lbClass.find("destroyById", true);
            _id = match[1];
        }
        return {
            method: lbMethod,
            req: req,
            instance: {
                id: _id
            }
        };
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