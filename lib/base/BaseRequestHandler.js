/**
 * This is a base class for all OData request handler classes like odata_get, odata_put, ...
 * It exposes functions that are used by all derived classes
 * @type {BaseRequestHandler}
 */
var BaseRequestHandler = (function () {
    function BaseRequestHandler() {
    }
    /**
     * sets the config object that was created from the options object of the n-odata-server component
     * @param config
     * @private
     */
    BaseRequestHandler.prototype.setConfig = function (config) {
        _setConfig.call(this, config);
    };
    ;
    /**
     * Sets the OData-Version response header. This must be delivered by an OData-Server
     * @param res
     * @private
     */
    BaseRequestHandler.prototype.setODataVersion = function (res, version) {
        // default for OData version is 4.0
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
    return BaseRequestHandler;
})();
exports.BaseRequestHandler = BaseRequestHandler;
/**
 * sets the config object that was created from the options object of the n-odata-server component
 * @param config
 * @private
 */
function _setConfig(config) {
    this.oDataServerConfig = config;
}
//# sourceMappingURL=BaseRequestHandler.js.map