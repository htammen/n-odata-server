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
        if (typeof err === 'Object') {
            console.error(err);
            res.sendStatus(500);
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
    this.oDataServerConfig = config;
}
//# sourceMappingURL=BaseRequestHandler.js.map