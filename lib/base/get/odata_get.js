/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
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
            tmpObj.__metadata = obj.__data.__metadata;
            retValue.d.results.push(tmpObj);
        });
        return retValue;
    };
    ;
    return CollectionResult;
})();
exports.CollectionResult = CollectionResult;
var EntityResult = (function () {
    function EntityResult() {
    }
    ;
    EntityResult.prototype.getRequestResult = function () {
        var retValue = { d: {} };
        retValue.d = this.data;
        return retValue;
    };
    ;
    return EntityResult;
})();
exports.EntityResult = EntityResult;
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
})();
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
            commons.getModelClass(req.app, req.params[0]).then(function (ModelClass) {
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
                        filter = _applyFilter.call(_this, req, filter);
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
                            if (!filter.limit || filter.limit > _this.oDataServerConfig.maxpagesize || (_maxpagesize && filter.limit > _maxpagesize)) {
                                var tmpMaxSize = _this.oDataServerConfig.maxpagesize;
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
                            filter = _applySelect.call(_this, req, filter);
                            filter = _applyExpand.call(_this, req, filter);
                            console.log("filter: " + JSON.stringify(filter));
                            var result = new CollectionResult();
                            ModelClass.find(filter).then(function (data) {
                                data.forEach(function (object, idx, arr) {
                                    object.__data.__metadata = {
                                        uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + object.getId() + ')',
                                        type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                    };
                                });
                                result.data = data;
                                if (nextLink) {
                                    result.nextLink = nextLink;
                                }
                                return result;
                            }).then(function (result) {
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
                }
                catch (e) {
                    reject(e);
                }
            }, function (error) {
                reject(Error(error));
            });
        });
    };
    ;
    ODataGetBase.prototype._getCollectionCount = function (req, res) {
        return new Promise(function (resolve, reject) {
            var arrParams0 = req.params[0].split('/');
            if (arrParams0 && arrParams0[arrParams0.length - 1] === '$count') {
                commons.getModelClass(req.app, arrParams0[0]).then(function (ModelClass) {
                    if (ModelClass) {
                        if (req.accepts("text/plain")) {
                            ModelClass.count().then(function (count) {
                                resolve(count);
                            });
                        }
                        else {
                            reject(415);
                        }
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
        return new Promise(function (resolve, reject) {
            var param0 = req.params[0];
            var id = commons.getIdFromUrlParameter(param0);
            var collection = param0.substr(0, param0.indexOf('('));
            commons.getModelClass(req.app, param0).then(function (ModelClass) {
                if (ModelClass) {
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
            break;
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
                break;
            case 'replace':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
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
                break;
            case 'toupper':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'trim':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'concat':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'day':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'hour':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'minute':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'month':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'second':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'year':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'round':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'floor':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'ceiling':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            case 'IsOf':
                throw new Error('function ' + ast.left.func + ' not implemented yet');
                break;
            default:
                throw new Error('function ' + ast.left.func + ' not found');
                break;
        }
    }
    if (bAddedLeft) {
        delete ast.left;
    }
    return { regexp: searchValue };
}
//# sourceMappingURL=odata_get.js.map