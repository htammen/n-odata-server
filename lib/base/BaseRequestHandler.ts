/// <reference path="../../typings/index.d.ts" />

import log4js = require('log4js');
import {Response} from "express";
import {ODataServerConfig} from "../types/n_odata_types";

var logger = log4js.getLogger("base");


/**
 * This is the return type of a entity request in OData V2
 */
export class EntityResult {
    data:any;
    value:any;

    constructor() {

    };

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
    getRequestResult():any {
        if (this.data) {
            var retValue:{d:any} = {d: {}};
            retValue.d = this.data;
            for (var prop in retValue.d) {
                if (retValue.d[prop] instanceof Date) {
                    retValue.d[prop] = "/Date(" + retValue.d[prop].getTime() + ")/";
                } else {
                    this.handleDateExpandedProperties(retValue.d[prop]);
                }
            }
            return retValue;
        } else {
            var retValue2:{value:any} = {value: {}};
            retValue2.value = this.value;
            return retValue2;
        }
    };

    private handleDateExpandedProperties(oExpanded:any):void {
        if (oExpanded instanceof Array) {
            for (var expanded in oExpanded) {
                for (var property in oExpanded[expanded]) {
                    if (oExpanded[expanded][property] instanceof Date) {
                        oExpanded[expanded][property] = "/Date(" + oExpanded[expanded][property].getTime() + ")/";
                    } else {
                        if (oExpanded[expanded][property] instanceof Array || oExpanded[expanded][property] instanceof Object) {
                            this.handleDateExpandedProperties(oExpanded[expanded][property]);
                        }
                    }
                }
            }
        } else if (oExpanded instanceof Object) {
            for (var property in oExpanded) {
                if (oExpanded[property] instanceof Date) {
                    oExpanded[property] = "/Date(" + oExpanded[property].getTime() + ")/";
                }
                else {
                    if (oExpanded[property] instanceof Array || oExpanded[property] instanceof Object) {
                        this.handleDateExpandedProperties(oExpanded[property]);
                    }
                }

            }
        }
    }
}

export interface IBaseRequestHandler {
    setConfig(config:ODataServerConfig);
}

/** Interface for GET requests handlers. The handler classes have to implement this interface */
export interface GetRequestHandler extends IBaseRequestHandler {
    handleGet(req:any, res:any);
}

/** Interface for POST requests handlers. The handler classes have to implement this interface */
export interface PostRequestHandler extends IBaseRequestHandler {
    handlePost(req:any, res:any);
}

/** Interface for PUT requests handlers. The handler classes have to implement this interface */
export interface PutRequestHandler extends IBaseRequestHandler {
    handlePut(req:any, res:any);
    handlePatch?(req:any, res:any);
    handleMerge?(req:any, res:any);
}

/** Interface for DELETE requests handlers. The handler classes have to implement this interface */
export interface DeleteRequestHandler extends IBaseRequestHandler {
    handleDelete(req:any, res:any);
}


/**
 * This is a base class for all OData request handler classes like odata_get, odata_put, ...
 * It exposes functions that are used by all derived classes
 * @type {BaseRequestHandler}
 */
export class BaseRequestHandler implements IBaseRequestHandler {
    oDataServerConfig:ODataServerConfig;

    /**
     * sets the config object that was created from the options object of the n-odata-server component
     * @param config
     * @private
     */
    setConfig(config:ODataServerConfig) {
        _setConfig.call(this, config)
    };

    /**
     * Sets the OData-Version response header. This must be delivered by an OData-Server
     * @param res
     * @private
     */
    setODataVersion(res:Response, version:string) {
        // default for OData version is 4.0
        if (!version) {
            version = "4.0"
        }
        if (version === "4.0") {
            res.set('OData-Version', version);
        } else if (version === "2.0") {
            res.set('dataserviceversion', version);
        }

    }

    /**
     * ErrorHandler method for all Request classes.
     * If the err parameter is of type object the object is logged and error code
     * 500 is added to the response. If the err parameter is of type number the number
     * is send as statusCode to the client. If none of these is true statusCode 500 is send
     * to the client and an 'undefined error' is logged.
     * @param err error object or statusCode
     * @param res response object that holds the data send to the client
     */
    handleError(err, res:Response) {
        if (typeof err === 'object') {
            console.error(err);
            res.status(500).send(err.toString());
        } else if (typeof err === 'number') {
            res.sendStatus(err);
        } else {
            console.error('undefined error');
            res.sendStatus(500);
        }
    }
}


/**
 * sets the config object that was created from the options object of the n-odata-server component
 * @param config
 * @private
 */
function _setConfig(config:ODataServerConfig) {
    logger.info("component config set to %s", JSON.stringify(config, null, '\t'));
    this.oDataServerConfig = config;
}



