var log4js = require('log4js');
var logger = log4js.getLogger("base");
var EntityResult = (function () {
    function EntityResult() {
    }
    ;
    EntityResult.prototype.getRequestResult = function () {
        if (this.data) {
            var retValue = { d: {} };
            retValue.d = this.data;
            for (var prop in retValue.d) {
                if (retValue.d[prop] instanceof Date) {
                    retValue.d[prop] = "/Date(" + retValue.d[prop].getTime() + ")/";
                }
            }
            return retValue;
        }
        else {
            var retValue2 = { value: {} };
            retValue2.value = this.value;
            return retValue2;
        }
    };
    ;
    return EntityResult;
})();
exports.EntityResult = EntityResult;
var BaseRequestHandler = (function () {
    function BaseRequestHandler() {
    }
    BaseRequestHandler.prototype.setConfig = function (config) {
        _setConfig.call(this, config);
    };
    ;
    BaseRequestHandler.prototype.setODataVersion = function (res, version) {
        if (!version) {
            version = "4.0";
        }
        if (version === "4.0") {
            res.set('OData-Version', version);
        }
        else if (version === "2.0") {
            res.set('dataserviceversion', version);
        }
    };
    BaseRequestHandler.prototype.handleError = function (err, res) {
        if (typeof err === 'object') {
            console.error(err);
            res.status(500).send(err.toString());
        }
        else if (typeof err === 'number') {
            res.sendStatus(err);
        }
        else {
            console.error('undefined error');
            res.sendStatus(500);
        }
    };
    return BaseRequestHandler;
})();
exports.BaseRequestHandler = BaseRequestHandler;
function _setConfig(config) {
    logger.info("component config set to %s", JSON.stringify(config, null, '\t'));
    this.oDataServerConfig = config;
}
//# sourceMappingURL=BaseRequestHandler.js.map