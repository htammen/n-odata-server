/// <reference path="../../../typings/main.d.ts" />
/**
 * Created by helmut on 01.12.15.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parser = require('odata-parser');
var BaseRequestHandler = require('../BaseRequestHandler');
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var req_header = require('../../common/odata_req_header');
var BaseRequestHandler_1 = require("../BaseRequestHandler");
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
            for (var prop in tmpObj) {
                // convert dates into OData date format
                if (tmpObj[prop] instanceof Date) {
                    tmpObj[prop] = "/Date(" + tmpObj[prop].getTime() + ")/";
                }
            }
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
            commons.getRequestModelClass(req.app.models, req.params[0]).then((function (oResult) {
                var _this = this;
                var ModelClass = oResult;
                if (ModelClass.modelClass) {
                    ModelClass = ModelClass.modelClass;
                }
                try {
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
                        filter = _applyFilter.call(this, req, filter);
                        if (oResult.foreignKeyFilter) {
                            if (!filter.where) {
                                filter.where = oResult.foreignKeyFilter;
                            }
                            else {
                                filter.where = { "and": [filter.where, oResult.foreignKeyFilter] };
                            }
                        }
                        //TODO: apply $search parameter
                        // if user appended the $count parameter she just wants the number of records
                        // after filter and search has been applied
                        if (req.query.$count !== undefined) {
                            if (req.accepts("text/plain")) {
                                ModelClass.count(filter, function (err, count) {
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
                            if (!filter.limit || filter.limit > this.oDataServerConfig.maxpagesize || (_maxpagesize && filter.limit > _maxpagesize)) {
                                var tmpMaxSize = this.oDataServerConfig.maxpagesize;
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
                            filter = _applySelect.call(this, req, filter);
                            // apply $expand URL parameter
                            filter = _applyExpand.call(this, req, filter);
                            console.log("filter: " + JSON.stringify(filter));
                            // apply $orderBy
                            filter = _applyOrderBy.call(this, req, filter);
                            // Now we call the find method of the ModelClass with filter definition
                            var result = new CollectionResult();
                            ModelClass.find(filter).then((function (data) {
                                // add metadata
                                data.forEach((function (object, idx, arr) {
                                    object.__data.__metadata = {
                                        uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + object.getId() + '\')',
                                        type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                    };
                                    // add deferred relations
                                    for (var rel in ModelClass.relations) {
                                        _this._createDeferredObject(object, rel, req, ModelClass, object.getId());
                                    }
                                }).bind(_this));
                                // add retrieved data from backend / db to the result
                                result.data = data;
                                if (nextLink) {
                                    result.nextLink = nextLink;
                                }
                                return result;
                            }).bind(this)).then(function (result) {
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
                            }).catch(function (err) {
                                console.error(err);
                                reject(err);
                            });
                        }
                    }
                    else {
                        reject(Error("request failed"));
                    }
                }
                catch (e) {
                    reject(e);
                }
            }).bind(_this), function (error) {
                reject(Error(error));
            });
        });
    };
    ;
    /**
     * Retrieves the total number of records for a collection in the data store
     * @param req
     * @param res
     * @returns {Promise}
     * @private
     */
    ODataGetBase.prototype._getCollectionCount = function (req, res) {
        return new Promise(function (resolve, reject) {
            var arrParams0 = req.params[0].split('/');
            if (arrParams0 && arrParams0[arrParams0.length - 1] === '$count') {
                // the collection has to be in the first part of params
                commons.getRequestModelClass(req.app.models, req.params[0]).then(function (oResult) {
                    var ModelClass = oResult;
                    if (ModelClass.modelClass) {
                        ModelClass = ModelClass.modelClass;
                    }
                    if (ModelClass) {
                        if (req.accepts("text/plain")) {
                            ModelClass.count(oResult.foreignKeyFilter, function (err, count) {
                                if (!err) {
                                    resolve(count);
                                }
                                else {
                                    reject(err);
                                }
                            });
                        }
                        else {
                            reject(415);
                        }
                    }
                    else {
                        reject(415);
                    }
                });
            }
            else {
                reject(Error("bad request"));
            }
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            var param0 = req.params[0];
            var arrParamToken = param0.split("/");
            // extract the id from the request
            var id = commons.getIdFromUrlParameter(arrParamToken[0]);
            var collection = arrParamToken[0].substr(0, param0.indexOf('('));
            commons.getRequestModelClass(req.app.models, req.params[0]).then((function (oResult) {
                var ModelClass = oResult;
                if (ModelClass.modelClass) {
                    ModelClass = ModelClass.modelClass;
                }
                if (oResult.foreignKeyFilter) {
                    id = oResult.foreignKeyFilter[Object.keys(oResult.foreignKeyFilter)[0]];
                }
                if (ModelClass) {
                    // apply $select URL parameter
                    var filter = _applySelect(req);
                    // apply $expand URL parameter
                    filter = _applyExpand.call(_this, req, filter);
                    ModelClass.findById(id, filter).then((function (instance) {
                        if (instance) {
                            // Handling $links
                            if (arrParamToken[1] === "$links") {
                                var result = new BaseRequestHandler_1.EntityResult();
                                // retrieve the relations from the ModelClass instance
                                instance[arrParamToken[2]](function (err, res) {
                                    if (err) {
                                        console.error(err);
                                        reject(500);
                                    }
                                    else {
                                        console.log(res);
                                        var relDefinition = ModelClass.relations[arrParamToken[2]];
                                        var modelTo = relDefinition.modelTo;
                                        result.value = [];
                                        res.forEach(function (obj, idx, arr) {
                                            var url = commons.getBaseURL(req) + '/' + modelTo.pluralModelName + '(' + obj.getId() + ')';
                                            result.value.push({ url: url });
                                        });
                                        resolve(result);
                                    }
                                });
                            }
                            else {
                                // add metadata
                                instance.__data.__metadata = {
                                    uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + id + ')',
                                    type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                };
                                // add deferred relations
                                for (var rel in ModelClass.relations) {
                                    _this._createDeferredObject(instance, rel, req, ModelClass, id);
                                }
                                // Handling regular Entity requests
                                var result = new BaseRequestHandler_1.EntityResult();
                                result.data = instance.toJSON();
                                /* TODO: metadata is currently ignored by loopback. all properties beginning with "__".
                                 * reparsing stringified instance (after .toJSON()), add them and stringify again.
                                 */
                                resolve(result);
                            }
                        }
                        else {
                            console.error('entity data for request ' + req.originalUrl + ' was not found');
                            reject(404);
                        }
                    }).bind(_this)).catch(function (err) {
                        reject(err);
                    });
                }
                else {
                    reject(404);
                }
            }).bind(_this));
        });
    };
    /**
     * Helper method for generating a deferred entry
     * @param instance
     * @param rel
     * @param req
     * @param ModelClass
     * @param id
     * @private
     */
    ODataGetBase.prototype._createDeferredObject = function (instance, rel, req, ModelClass, id) {
        if (!instance.__data[rel]) {
            instance.__data[rel] = {
                __deferred: {
                    uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + id + '\')/' + rel
                }
            };
        }
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
/**
 * Applies the $filter URL parameter that may be defined on the URL to the filter object of loopback find.
 * @param req
 * @param {LoopbackFilter} filter the loopback filter object
 * @returns {LoopbackFilter} the injected filter parameter exceeded by the filter values
 * @private
 */
function _applyFilter(req, filter) {
    var filterParam = req.query.$filter;
    filter = filter || {}; // just to ensure that filter can't be undefined
    if (filterParam) {
        var filterString = "$filter=" + filterParam;
        // parse the filterString into an ast
        var ast = parser.parse(filterString);
        if (ast.error) {
            throw new Error(ast.error);
        }
        filter.where = _convertAstToLoopbackFilter(ast.$filter, filter.where);
    }
    return filter;
}
/**
 * Applies the $select URL parameter that may be defined on the URL to the filter object of loopback find.
 * @param req
 * @param filter
 * @returns {filter}
 * @private
 */
function _applyExpand(req, filter) {
    var expandParam = req.query.$expand;
    filter = filter || {};
    if (expandParam) {
        var expandString = "$expand=" + expandParam;
        // parse the expandString into an ast
        var ast = parser.parse(expandString);
        if (ast.error) {
            throw new Error(ast.error);
        }
        filter.include = [];
        ast.$expand.forEach(function (obj) {
            if (obj.indexOf('/') > -1) {
                var objArr = obj.split('/');
                var incl = {};
                incl[objArr[0]] = objArr[1];
                filter.include.push(incl);
            }
            else {
                filter.include.push(obj);
            }
        });
    }
    return filter;
}
/**
 * Applies the $orderby URL parameter for sorting the resultset
 * @param req
 * @param filter
 * @private
 */
function _applyOrderBy(req, filter) {
    var orderByParam = req.query.$orderby;
    filter = filter || {};
    if (orderByParam) {
        var orderString = "$orderby=" + orderByParam;
        // parse the expandString into an ast
        var ast = parser.parse(orderString);
        if (ast.error) {
            throw new Error(ast.error);
        }
        filter.order = [];
        ast.$orderby.forEach(function (obj) {
            //// does not work at the moment: ODataParser seems to have a problem here
            //if(obj.indexOf('/') > -1) {
            //	var objArr = obj.split('/');
            //	var incl = {};
            //	incl[objArr[0]] = objArr[1]
            //	filter.order.push(incl);
            //} else {
            for (var prop in obj) {
                var str = prop;
                str += " " + obj[prop].toUpperCase();
                filter.order.push(str);
            }
            //}
        });
    }
    return filter;
}
/**
 * converts the ast delivered by the odata parser into a loopback filter where expression
 * @param ast
 * @param where
 * @returns {any}
 * @private
 */
function _convertAstToLoopbackFilter(ast, where) {
    where = where || {};
    switch (ast.type) {
        case 'eq':
        case 'ne':
        case 'gt':
        case 'ge':
        case 'lt':
        case 'le':
            if (ast.left.type === 'property' && ast.right.type === 'literal') {
                if (ast.type === 'ne')
                    ast.type = 'neq';
                if (ast.type === 'ge')
                    ast.type = 'gte';
                if (ast.type === 'le')
                    ast.type = 'lte';
                if (ast.type === 'eq') {
                    where[ast.left.name] = ast.right.value;
                }
                else {
                    where[ast.left.name] = {};
                    where[ast.left.name][ast.type] = ast.right.value;
                }
            }
            else if (ast.left.type === 'functioncall') {
                // if functioncall is made in a form like $filter=startswith(ContactTitle, 'Order') eq true
                // it is deliverd on the left side of the ast. On the right side eq true is delivered
                var propName = _getPropertyFromAstFunction(ast.left);
                if (propName) {
                    where[propName] = _convertAstToRegexp(ast);
                }
            }
            break;
        case 'functioncall':
            // if functioncall is made in a form like $filter=startswith(ContactTitle, 'Order')
            // it is deliverd as own ast branch, there is no left or right
            var propName = _getPropertyFromAstFunction(ast);
            if (propName) {
                where[propName] = _convertAstToRegexp(ast);
            }
            break;
        case 'and':
            where.and = [];
            where.and.push(_convertAstToLoopbackFilter(ast.left, null));
            where.and.push(_convertAstToLoopbackFilter(ast.right, null));
            break;
        case 'or':
            where.or = [];
            where.or.push(_convertAstToLoopbackFilter(ast.left, null));
            where.or.push(_convertAstToLoopbackFilter(ast.right, null));
            break;
        // TODO: operators (parenthesis) for grouping come in another format from the parser, have to find a solution later.
        case '(':
            break;
        // TODO: not is currently not parsed by the parser and I have to investigate how to express the logical not in loopback.
        case 'not':
            break;
        default:
            throw new Error('something went wrong. \'' + ast.type + '\' is not a supported query type.');
            break;
    }
    return where;
}
/**
 * get the property of the functioncall. The property is the field name that has to be searched for in the
 * loopbacke data store
 * @param ast
 * @returns {string}
 * @private
 */
function _getPropertyFromAstFunction(ast) {
    var retValue = undefined;
    // the functions always are on the left side of the ast, the function arguments are in an array args
    if (ast.type === 'functioncall') {
        ast.args.forEach(function (obj) {
            if (obj.type === 'property') {
                retValue = obj.name;
            }
        });
    }
    return retValue;
}
/**
 * get the search value (literal) from the args of the odata ast
 * @param args
 * @returns {string}
 * @private
 */
function _getSearchLiteralFromAstFunction(args) {
    var retValue = undefined;
    args.forEach(function (obj) {
        if (obj.type === 'literal') {
            retValue = obj.value;
        }
    });
    return retValue;
}
/**
 * converts the abstract syntax tree delivered by the odata parser into a regular expression that can be
 * interpreted by loopback to retrieve the data from the data store
 * @param ast
 * @returns {{regexp: string}}
 * @private
 */
function _convertAstToRegexp(ast) {
    var searchValue = undefined;
    // if functioncall is made in a form like $filter=startswith(ContactTitle, 'Order') eq true
    // it is deliverd on the left side of the ast. On the right side eq true is delivered
    // if functioncall is made in a form like $filter=startswith(ContactTitle, 'Order') there is no left and no
    // right side. We push the whole ast to the left side so that we can treat both cased in the same way.
    // This is a trick but it works.
    var bAddedLeft = false;
    if (ast.left === undefined) {
        ast.left = ast;
        bAddedLeft = true;
    }
    // the functions always are on the left side of the ast, the function arguments are in an array args
    if (ast.left.type === 'functioncall') {
        switch (ast.left.func) {
            case 'substringof':
                if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
                    searchValue = '/' + _getSearchLiteralFromAstFunction(ast.left.args) + '/';
                }
                else {
                    // negate the search
                    searchValue = '/^((?!(' + _getSearchLiteralFromAstFunction(ast.left.args) + ')).)*$/';
                }
                break;
            case 'endswith':
                if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
                    searchValue = '/' + _getSearchLiteralFromAstFunction(ast.left.args) + '$/';
                }
                else {
                    // negate the search
                    searchValue = '/^((?!(' + _getSearchLiteralFromAstFunction(ast.left.args) + '$)).)*$/';
                }
                break;
            case 'startswith':
                if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
                    searchValue = '/^' + _getSearchLiteralFromAstFunction(ast.left.args) + '/';
                }
                else {
                    // negate the search
                    searchValue = '/^((?!(^' + _getSearchLiteralFromAstFunction(ast.left.args) + ')).)*$/';
                }
                break;
            case 'length':
                if (ast.right !== undefined && ast.right.value !== undefined && ast.right.type === 'literal') {
                    if (ast.type === 'eq') {
                        searchValue = '/^.{' + ast.right.value + '}$/';
                    }
                    else if (ast.type === 'ne') {
                        searchValue = '/^(.{0,' + (ast.right.value - 1) + '}|.{' + (ast.right.value + 1) + '})$/';
                    }
                    else if (ast.type === 'gt') {
                        searchValue = '/^(.{' + (ast.right.value + 1) + ',})$/';
                    }
                    else if (ast.type === 'ge') {
                        searchValue = '/^(.{' + (ast.right.value) + ',})$/';
                    }
                    else if (ast.type === 'lt') {
                        searchValue = '/^(.{0,' + (ast.right.value - 1) + '})$/';
                    }
                    else if (ast.type === 'le') {
                        searchValue = '/^(.{0,' + (ast.right.value) + '})$/';
                    }
                }
                else {
                    throw new Error('function ' + ast.left.func + ' requires a value to compare with');
                }
                break;
            //TODO: function indexof has to be implemented
            case 'indexof':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function replace has to be implemented
            case 'replace':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function substring has to be implemented
            case 'substring':
                if (ast.right !== undefined && ast.right.value !== undefined && ast.right.type === 'literal') {
                    if (ast.type === 'eq') {
                        searchValue = '/^.{' + _getSearchLiteralFromAstFunction(ast.left.args) + '}' + ast.right.value + '$/';
                    }
                    else if (ast.type === 'ne') {
                        throw new Error('function ' + ast.left.func + ' with operator ' + ast.type + ' not implemented yet');
                    }
                }
                else {
                    throw new Error('function ' + ast.left.func + ' requires a value to compare with');
                }
                break;
            //TODO: function tolower has to be implemented
            case 'tolower':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function toupper has to be implemented
            case 'toupper':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function trim has to be implemented
            case 'trim':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function concat has to be implemented
            case 'concat':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function day has to be implemented
            case 'day':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function hour has to be implemented
            case 'hour':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function minute has to be implemented
            case 'minute':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function month has to be implemented
            case 'month':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function second has to be implemented
            case 'second':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function year has to be implemented
            case 'year':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function round has to be implemented
            case 'round':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function floor has to be implemented
            case 'floor':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function ceiling has to be implemented
            case 'ceiling':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            //TODO: function IsOf has to be implemented
            case 'IsOf':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            default:
                throw new Error('function ' + ast.left.func + ' not found');
                break;
        }
    }
    // delete the left property if it was inserted at the top of this function
    if (bAddedLeft) {
        delete ast.left;
    }
    return { regexp: searchValue };
}
//# sourceMappingURL=odata_get.js.map