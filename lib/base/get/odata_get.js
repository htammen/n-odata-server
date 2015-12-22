/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
/**
 * Created by helmut on 01.12.15.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRequestHandler = require('../BaseRequestHandler');
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var req_header = require('../../common/odata_req_header');
/**
 * This is the return type of a collection request in OData V2
 */
var CollectionResult = (function () {
    function CollectionResult() {
    }
    ;
    /**
     * Returns the result for a collection request. This looks like
     * <pre><code>
     * {
   * "d": {
   *  "@odata.netxtLink": "http://0.0.0.0:3000/odata/people?$skiptoken=3",
   *  "results": [
   *    {
   *      "firstname": "Maria"
   *    },
   *    {
   *      "firstname": "Helmut"
   *    },
   *    {
   *      "firstname": "Franz",
   *      "age": 65
   *    }
   *  ]}
     * }
     * </code></pre>
     * @returns {{d: any}}
     **/
    CollectionResult.prototype.getRequestResult = function () {
        var retValue = { d: {} };
        if (this.nextLink) {
            retValue.d['@odata.netxtLink'] = this.nextLink;
        }
        if (this.count) {
            retValue.d.__count = this.count;
        }
        retValue.d.results = [];
        this.data.forEach(function (obj, idx) {
            var tmpObj = obj.toJSON();
            tmpObj.__metadata = obj.__data.__metadata;
            retValue.d.results.push(tmpObj);
        });
        return retValue;
    };
    ;
    return CollectionResult;
})();
exports.CollectionResult = CollectionResult;
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
        var retValue = { d: {} };
        retValue.d = this.data;
        return retValue;
    };
    ;
    return EntityResult;
})();
exports.EntityResult = EntityResult;
/**
 * This is the return type of a service document in OData V2
 */
var ServiceDocumentResult = (function () {
    function ServiceDocumentResult() {
    }
    ;
    /**
     * Returns the result for a collection request. This looks like
     * <pre><code>
     * {
   *   "d": {
   *     "EntitySets": [
   *       "SOHeaders",
   *       "SOItems"
   *     ]
   *   }
   * }
     * </code></pre>
     * @returns {{d: any}}
     **/
    ServiceDocumentResult.prototype.getRequestResult = function () {
        var retValue = { d: {} };
        retValue.d.EntitySets = this.data;
        return retValue;
    };
    ;
    return ServiceDocumentResult;
})();
exports.ServiceDocumentResult = ServiceDocumentResult;
var ODataGetBase = (function (_super) {
    __extends(ODataGetBase, _super);
    function ODataGetBase() {
        _super.call(this);
    }
    ;
    /**
     * Get all records for a collection. The name of the collection
     * is given in the 1st request parameter
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    ODataGetBase.prototype._getCollectionData = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //DONE: The odata.nextLink annotation MUST be included in a response that represents a partial result. "@odata.nextLink": "...?$skiptoken=342r89"
            commons.getModelClass(req.app, req.params[0]).then(function (ModelClass) {
                if (ModelClass) {
                    // Retrieve odata.maxpagesize from Prefer header of the request
                    var _maxpagesize;
                    var reqHeaderArr = req_header.getPreferHeader(req);
                    reqHeaderArr.forEach(function (obj, idx, arr) {
                        if (obj[0] === 'maxpagesize') {
                            _maxpagesize = obj[1];
                        }
                    });
                    var filter = {};
                    //TODO: apply $filter parameter
                    //TODO: apply $search parameter
                    // if user appended the $count parameter she just wants the number of records
                    // after filter and search has been applied
                    if (req.query.$count !== undefined) {
                        if (req.accepts("text/plain")) {
                            ModelClass.count(function (err, count) {
                                res.set('Content-Type', 'text/plain');
                                res.send(count.toString());
                            });
                        }
                        else {
                            res.sendStatus(415);
                        }
                    }
                    else {
                        // here we do the main work if the user wants data from a collection
                        var nextLink;
                        // retrieve only top=xx records
                        if (req.query.$top) {
                            filter.limit = req.query.$top;
                        }
                        // the implementation of $skiptoken is service specific. We define that $skiptoken behaves like $skip
                        if (req.query.$skip || req.query.$skiptoken) {
                            filter.skip = req.query.$skip || req.query.$skiptoken;
                        }
                        // adjust the number of records that are returned according to the maxpagesize setting, either by client
                        // or by the server application
                        if (!filter.limit || filter.limit > _this.oDataServerConfig.maxpagesize || (_maxpagesize && filter.limit > _maxpagesize)) {
                            var tmpMaxSize = _this.oDataServerConfig.maxpagesize;
                            if (_maxpagesize && tmpMaxSize && parseInt(_maxpagesize) < parseInt(tmpMaxSize)) {
                                tmpMaxSize = _maxpagesize;
                            }
                            // if limit has not been set yet we have to add a nextLink property to the response to enable the user to automatically
                            // page to the next chunk of data
                            if (!filter.limit) {
                                var _skiptoken = req.query.$skiptoken;
                                _skiptoken = (!isNaN(_skiptoken) ? _skiptoken + parseInt(tmpMaxSize) : parseInt(tmpMaxSize));
                                nextLink = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '?$skiptoken=' + _skiptoken;
                                // if nextLink is set, means we deliver partially response, we need to know if there would be more data
                                // if the nextLink is processed. If the current data chunk is the last one we MUST NOT set the nextLink into
                                // the response
                                if (nextLink) {
                                    var nlFilter = {};
                                    nlFilter.skip = _skiptoken;
                                    nlFilter.limit = 1; // just need to test if there is at least one more record
                                    // TODO: uiii, this hast to be moved to the promise chain a few lines down cause asynchronosy it's not
                                    // said that nextlink is detemined before the other db calls.
                                    ModelClass.find(nlFilter, function (err, data) {
                                        if (data.length === 0) {
                                            nextLink = undefined;
                                        }
                                    });
                                }
                                // set the filter limit to the calculated maxSize
                                filter.limit = tmpMaxSize;
                                res.set('Preference-Applied', 'odata.maxpagesize=' + tmpMaxSize);
                            }
                        }
                        // apply $select URL parameter
                        filter = _applySelect.call(_this, req, filter);
                        // Now we call the find method of the ModelClass with filter definition
                        var result = new CollectionResult();
                        ModelClass.find(filter).then(function (data) {
                            // add metadata
                            data.forEach(function (object, idx, arr) {
                                object.__data.__metadata = {
                                    uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + object.getId() + ')',
                                    type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                };
                            });
                            // add retrieved data from backend / db
                            result.data = data;
                            if (nextLink) {
                                result.nextLink = nextLink;
                            }
                            return result;
                        }).then(function (result) {
                            // if $inlinecount was requested we have to count all records in the database
                            if (req.query.$inlinecount) {
                                ModelClass.count().then(function (resultCount) {
                                    result.count = resultCount;
                                    resolve(result);
                                });
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                }
                else {
                    reject(Error("request failed"));
                }
            });
        });
    };
    ;
    /**
     * Get the data for exactly one object of an entity type
     * @param req
     * @param res
     * @private
     */
    ODataGetBase.prototype._getEntityData = function (req, res) {
        return new Promise(function (resolve, reject) {
            var param0 = req.params[0];
            // extract the id from the request
            var id = commons.getIdFromUrlParameter(param0);
            var collection = param0.substr(0, param0.indexOf('('));
            commons.getModelClass(req.app, param0).then(function (ModelClass) {
                if (ModelClass) {
                    // apply $select URL parameter
                    var filter = _applySelect(req);
                    ModelClass.findById(id, filter, function (err, instance) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (instance) {
                                var result = new EntityResult();
                                result.data = instance.toJSON();
                                resolve(result);
                            }
                            else {
                                console.error('entity data for request ' + req.originalUrl + ' was not found');
                                reject(404);
                            }
                        }
                    });
                }
                else {
                    reject(404);
                }
            });
        });
    };
    /**
     * Returns the service document of this service
     * The service document displays all entitysets, functions, Singletons, ... that the service
     * exposes
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    ODataGetBase.prototype._getServiceDocument = function (req, res) {
        return new Promise(function (resolve, reject) {
            var json = [];
            var models = req.app.models();
            models.forEach(function (model) {
                var modelObj = {};
                var plural = commons.getPluralForModel(model);
                modelObj.name = plural;
                modelObj.url = plural;
                json.push(modelObj);
            });
            var serviceDocumentResult = new ServiceDocumentResult();
            serviceDocumentResult.data = json;
            resolve(serviceDocumentResult);
        });
    };
    return ODataGetBase;
})(BaseRequestHandler.BaseRequestHandler);
exports.ODataGetBase = ODataGetBase;
/**
 * Applies the $select URL parameter that may be defined on the URL to the filter object of loopback find.
 * @param req
 * @param filter
 * @returns {filter}
 * @private
 */
function _applySelect(req, filter) {
    var selectList = req.query.$select;
    filter = filter || {};
    if (selectList) {
        // * means: give me all field which is loopback default
        if (selectList !== '*') {
            var arr = selectList.split(',');
            var fields = filter.fields || {};
            arr.forEach(function (obj, idx, array) {
                fields[obj] = true;
            });
            filter.fields = fields;
        }
    }
    return filter;
}
//# sourceMappingURL=odata_get.js.map