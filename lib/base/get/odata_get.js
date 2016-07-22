"use strict";
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
var CollectionResult = (function () {
    function CollectionResult() {
    }
    ;
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
}());
exports.CollectionResult = CollectionResult;
var ServiceDocumentResult = (function () {
    function ServiceDocumentResult() {
    }
    ;
    ServiceDocumentResult.prototype.getRequestResult = function () {
        var retValue = { d: {} };
        retValue.d.EntitySets = this.data;
        return retValue;
    };
    ;
    return ServiceDocumentResult;
}());
exports.ServiceDocumentResult = ServiceDocumentResult;
var ODataGetBase = (function (_super) {
    __extends(ODataGetBase, _super);
    function ODataGetBase() {
        _super.call(this);
    }
    ;
    ODataGetBase.prototype._getCollectionData = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            commons.getRequestModelClass(req.app.models, req.params[0]).then((function (oResult) {
                var _this = this;
                var ModelClass = oResult.modelClass;
                try {
                    if (ModelClass) {
                        var _maxpagesize;
                        var reqHeaderArr = req_header.getPreferHeader(req);
                        reqHeaderArr.forEach(function (obj, idx, arr) {
                            if (obj[0] === 'maxpagesize') {
                                _maxpagesize = obj[1];
                            }
                        });
                        var filter = {};
                        filter = _applyFilter.call(this, req, filter);
                        if (oResult.foreignKeyFilter) {
                            if (!filter.where) {
                                filter.where = oResult.foreignKeyFilter;
                            }
                            else {
                                filter.where = { "and": [filter.where, oResult.foreignKeyFilter] };
                            }
                        }
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
                            var nextLink;
                            if (req.query.$top) {
                                filter.limit = req.query.$top;
                            }
                            if (req.query.$skip || req.query.$skiptoken) {
                                filter.skip = req.query.$skip || req.query.$skiptoken;
                            }
                            if (!filter.limit || filter.limit > this.oDataServerConfig.maxpagesize || (_maxpagesize && filter.limit > _maxpagesize)) {
                                var tmpMaxSize = this.oDataServerConfig.maxpagesize;
                                if (_maxpagesize && tmpMaxSize && parseInt(_maxpagesize) < parseInt(tmpMaxSize)) {
                                    tmpMaxSize = _maxpagesize;
                                }
                                if (!filter.limit) {
                                    var _skiptoken = req.query.$skiptoken;
                                    _skiptoken = (!isNaN(_skiptoken) ? _skiptoken + parseInt(tmpMaxSize) : parseInt(tmpMaxSize));
                                    nextLink = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '?$skiptoken=' + _skiptoken;
                                    if (nextLink) {
                                        var nlFilter = {};
                                        nlFilter.skip = _skiptoken;
                                        nlFilter.limit = 1;
                                        ModelClass.find(nlFilter, function (err, data) {
                                            if (data.length === 0) {
                                                nextLink = undefined;
                                            }
                                        });
                                    }
                                    filter.limit = tmpMaxSize;
                                    res.set('Preference-Applied', 'odata.maxpagesize=' + tmpMaxSize);
                                }
                            }
                            filter = _applySelect.call(this, req, filter);
                            filter = _applyExpand.call(this, req, filter);
                            console.log("filter: " + JSON.stringify(filter));
                            filter = _applyOrderBy.call(this, req, filter);
                            var result = new CollectionResult();
                            ModelClass.find(filter).then((function (data) {
                                data.forEach((function (object, idx, arr) {
                                    var propertyType = commons.convertType(ModelClass.definition._ids[0].property);
                                    switch (propertyType) {
                                        case "Edm.Decimal":
                                        case "Edm.Int32":
                                            object.__data.__metadata = {
                                                uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + object.getId() + ')',
                                                type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                            };
                                            break;
                                        default:
                                            object.__data.__metadata = {
                                                uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + object.getId() + '\')',
                                                type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                            };
                                            break;
                                    }
                                    for (var rel in ModelClass.relations) {
                                        _this._createDeferredObject(object, rel, req, ModelClass, object.getId());
                                    }
                                }).bind(_this));
                                result.data = data;
                                if (nextLink) {
                                    result.nextLink = nextLink;
                                }
                                return result;
                            }).bind(this)).then(function (result) {
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
    ODataGetBase.prototype._getCollectionCount = function (req, res) {
        return new Promise(function (resolve, reject) {
            var arrParams0 = req.params[0].split('/');
            if (arrParams0 && arrParams0[arrParams0.length - 1] === '$count') {
                commons.getRequestModelClass(req.app.models, req.params[0]).then(function (oResult) {
                    var ModelClass = oResult.modelClass;
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
    ODataGetBase.prototype._getEntityData = function (req, res) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var param0 = req.params[0];
            var arrParamToken = param0.split("/");
            commons.getRequestModelClass(req.app.models, req.params[0]).then((function (oResult) {
                var ModelClass = oResult.modelClass;
                var id;
                if (oResult.foreignKeyFilter) {
                    id = oResult.foreignKeyFilter[Object.keys(oResult.foreignKeyFilter)[0]];
                }
                else {
                    id = oResult.requestId;
                }
                if (ModelClass) {
                    var filter = _applySelect(req);
                    filter = _applyExpand.call(_this, req, filter);
                    _findInstanceByIdOrForeignkey.call(_this, ModelClass, id, filter, oResult).then((function (instance) {
                        if (instance && instance[0]) {
                            if (instance.length > 1) {
                                reject("It was expected to find a single instance but the resultset contains " + instance.length + " objects");
                            }
                            else {
                                instance = instance[0];
                            }
                            if (arrParamToken[1] === "$links") {
                                var result = new BaseRequestHandler_1.EntityResult();
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
                                instance.__data.__metadata = {
                                    uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + id + ')',
                                    type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                };
                                for (var rel in ModelClass.relations) {
                                    _this._createDeferredObject(instance, rel, req, ModelClass, id);
                                }
                                var result = new BaseRequestHandler_1.EntityResult();
                                result.data = instance.toJSON();
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
            }).bind(_this), function (error) {
                reject(Error(error));
            });
        });
    };
    ODataGetBase.prototype._createDeferredObject = function (instance, rel, req, ModelClass, id) {
        if (!instance.__data[rel]) {
            var propertyType = commons.convertType(ModelClass.definition._ids[0].property);
            switch (propertyType) {
                case "Edm.Decimal":
                case "Edm.Int32":
                    instance.__data[rel] = {
                        __deferred: {
                            uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + id + ')/' + rel
                        }
                    };
                    break;
                default:
                    instance.__data[rel] = {
                        __deferred: {
                            uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + id + '\')/' + rel
                        }
                    };
                    break;
            }
        }
    };
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
}(BaseRequestHandler.BaseRequestHandler));
exports.ODataGetBase = ODataGetBase;
function _findInstanceByIdOrForeignkey(ModelClass, id, filter, oReqQueryObject) {
    return new Promise(function (resolve, reject) {
        if (oReqQueryObject.foreignKeyFilter) {
            ModelClass.find({ where: oReqQueryObject.foreignKeyFilter }).then((function (instances) {
                resolve(instances);
            }));
        }
        else {
            ModelClass.findById(id, filter).then((function (instance) {
                resolve([instance]);
            }));
        }
    });
}
function _applySelect(req, filter) {
    var selectList = req.query.$select;
    filter = filter || {};
    if (selectList) {
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
function _applyFilter(req, filter) {
    var filterParam = req.query.$filter;
    filter = filter || {};
    if (filterParam) {
        var filterString = "$filter=" + filterParam;
        var ast = parser.parse(filterString);
        if (ast.error) {
            throw new Error(ast.error);
        }
        filter.where = _convertAstToLoopbackFilter(ast.$filter, filter.where);
    }
    return filter;
}
function _applyExpand(req, filter) {
    var expandParam = req.query.$expand;
    filter = filter || {};
    if (expandParam) {
        var expandString = "$expand=" + expandParam;
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
function _applyOrderBy(req, filter) {
    var orderByParam = req.query.$orderby;
    filter = filter || {};
    if (orderByParam) {
        var orderString = "$orderby=" + orderByParam;
        var ast = parser.parse(orderString);
        if (ast.error) {
            throw new Error(ast.error);
        }
        filter.order = [];
        ast.$orderby.forEach(function (obj) {
            for (var prop in obj) {
                var str = prop;
                str += " " + obj[prop].toUpperCase();
                filter.order.push(str);
            }
        });
    }
    return filter;
}
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
                var propName = _getPropertyFromAstFunction(ast.left);
                if (propName) {
                    where[propName] = _convertAstToRegexp(ast);
                }
            }
            break;
        case 'functioncall':
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
        case '(':
            break;
        case 'not':
            break;
        default:
            throw new Error('something went wrong. \'' + ast.type + '\' is not a supported query type.');
    }
    return where;
}
function _getPropertyFromAstFunction(ast) {
    var retValue = undefined;
    if (ast.type === 'functioncall') {
        ast.args.forEach(function (obj) {
            if (obj.type === 'property') {
                retValue = obj.name;
            }
        });
    }
    return retValue;
}
function _getSearchLiteralFromAstFunction(args) {
    var retValue = undefined;
    args.forEach(function (obj) {
        if (obj.type === 'literal') {
            retValue = obj.value;
        }
    });
    return retValue;
}
function _convertAstToRegexp(ast) {
    var searchValue = undefined;
    var bAddedLeft = false;
    if (ast.left === undefined) {
        ast.left = ast;
        bAddedLeft = true;
    }
    if (ast.left.type === 'functioncall') {
        switch (ast.left.func) {
            case 'substringof':
                if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
                    searchValue = '/' + _getSearchLiteralFromAstFunction(ast.left.args) + '/';
                }
                else {
                    searchValue = '/^((?!(' + _getSearchLiteralFromAstFunction(ast.left.args) + ')).)*$/';
                }
                break;
            case 'endswith':
                if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
                    searchValue = '/' + _getSearchLiteralFromAstFunction(ast.left.args) + '$/';
                }
                else {
                    searchValue = '/^((?!(' + _getSearchLiteralFromAstFunction(ast.left.args) + '$)).)*$/';
                }
                break;
            case 'startswith':
                if (ast.right === undefined || ast.right.value === undefined || (ast.right.value === true && ast.right.type === 'literal')) {
                    searchValue = '/^' + _getSearchLiteralFromAstFunction(ast.left.args) + '/';
                }
                else {
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
            case 'indexof':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'replace':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
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
            case 'tolower':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'toupper':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'trim':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'concat':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'day':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'hour':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'minute':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'month':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'second':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'year':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'round':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'floor':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'ceiling':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            case 'IsOf':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
            default:
                throw new Error('function ' + ast.left.func + ' not found');
        }
    }
    if (bAddedLeft) {
        delete ast.left;
    }
    return { regexp: searchValue };
}
//# sourceMappingURL=odata_get.js.map