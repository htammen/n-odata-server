/// <reference path="../../typings/main.d.ts" />
var log4js = require('log4js');
var logger = log4js.getLogger("base");
/**
 * This is the return type of a entity request in OData V2
 */
var EntityResult = (function () {
    function EntityResult() {
    }
    ;
    /**
     * Returns the result for a collection request. This looks like
     * <pre><code>
     * {
   *   "d": {
   *     "__metadata": {
   *       "uri": "https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/SOHeaders('0000000001')",
   *       "type": "SALESORDERXX.SOHeader"
   *     },
   *     "OrderId": "0000000001",
   *     "DocumentType": "TA",
   *     "DocumentDate": "/Date(1297382400000)/",
   *     "CustomerId": "0000100001",
   *     "SOItems": {
   *       "__deferred": {
   *         "uri": "https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/SOHeaders('0000000001')/SOItems"
   *       }
   *     }
   *   }
   * }
     * </code></pre>
     * @returns {{d: any}}
     **/
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
    /**
     * ErrorHandler method for all Request classes.
     * If the err parameter is of type object the object is logged and error code
     * 500 is added to the response. If the err parameter is of type number the number
     * is send as statusCode to the client. If none of these is true statusCode 500 is send
     * to the client and an 'undefined error' is logged.
     * @param err error object or statusCode
     * @param res response object that holds the data send to the client
     */
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
/**
 * sets the config object that was created from the options object of the n-odata-server component
 * @param config
 * @private
 */
function _setConfig(config) {
    logger.info("component config set to %s", JSON.stringify(config, null, '\t'));
    this.oDataServerConfig = config;
}
//# sourceMappingURL=BaseRequestHandler.js.map