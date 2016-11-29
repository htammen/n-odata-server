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
var odata_enums_1 = require("../../constants/odata_enums");
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
                else {
                    this.handleDateExpandedProperties(tmpObj[prop]);
                }
            }
            tmpObj.__metadata = obj.__data.__metadata;
            for (var expanded in tmpObj) {
                if (tmpObj[expanded] instanceof Object || tmpObj[expanded] instanceof Array) {
                    this.handleMetadataInExpanded(obj.__data[expanded].__data, tmpObj[expanded]);
                }
            }
            retValue.d.results.push(tmpObj);
        }.bind(this));
        return retValue;
    };
    ;
    CollectionResult.prototype.handleMetadataInExpanded = function (oOriginalData, oExpanded) {
        for (var property in oOriginalData) {
            if (property === "__metadata") {
                oExpanded.__metadata = oOriginalData[property];
            }
            else {
                if (!(oOriginalData[property] instanceof Date)) {
                    if (oOriginalData[property] instanceof Object || oOriginalData[property] instanceof Array) {
                        this.handleMetadataInExpanded(oOriginalData[property].__data, oExpanded[property]);
                    }
                }
            }
        }
    };
    ;
    CollectionResult.prototype.handleDateExpandedProperties = function (oExpanded) {
        if (oExpanded instanceof Array) {
            for (var expanded in oExpanded) {
                for (var property in oExpanded[expanded]) {
                    if (oExpanded[expanded][property] instanceof Date) {
                        oExpanded[expanded][property] = "/Date(" + oExpanded[expanded][property].getTime() + ")/";
                    }
                    else {
                        if (oExpanded[expanded][property] instanceof Array || oExpanded[expanded][property] instanceof Object) {
                            this.handleDateExpandedProperties(oExpanded[expanded][property]);
                        }
                    }
                }
            }
        }
        else if (oExpanded instanceof Object) {
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
        this._createMetadataForExpanded = function (instance, rel, req, ModelClass, id, expandedData) {
            if (expandedData instanceof Array) {
                if (expandedData.length === 0) {
                    return;
                }
                else {
                    for (var i in expandedData) {
                        var oItem = expandedData[i].__data;
                        if (typeof oItem[rel] === "undefined")
                            continue;
                        if (oItem[rel].__deferred)
                            continue;
                        var propertyType = commons.convertType(ModelClass.definition._ids[0].property);
                        switch (propertyType) {
                            case odata_enums_1.ODataType.EDM_DECIMAL:
                            case odata_enums_1.ODataType.EDM_INT32:
                                if (oItem[rel].__data instanceof Array) {
                                    oItem[rel].__data.map(function (oData) {
                                        oData.__data.__metadata = {
                                            uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + oData.id + ')',
                                            type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                        };
                                        return oData;
                                    });
                                }
                                else {
                                    if (typeof oItem[rel].__data !== "undefined" && typeof oItem[rel].__data.id !== "undefined") {
                                        oItem[rel].__data.__metadata = {
                                            uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + oItem[rel].__data.id + ')',
                                            type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                        };
                                    }
                                }
                                break;
                            default:
                                if (oItem[rel].__data instanceof Array) {
                                    oItem[rel].__data.map(function (oData) {
                                        oData.__data.__metadata = {
                                            uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + oData.id + '\')',
                                            type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                        };
                                        return oData;
                                    });
                                }
                                else {
                                    if (typeof oItem[rel].__data !== "undefined" && typeof oItem[rel].__data.id !== "undefined") {
                                        oItem[rel].__data.__metadata = {
                                            uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + oItem[rel].__data.id + '\')',
                                            type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                        };
                                    }
                                }
                                break;
                        }
                        for (var sProp in oItem[rel].__data) {
                            if (sProp === "__metadata" || sProp === "__deferred")
                                continue;
                            var oPropValue = oItem[rel].__data[sProp];
                            if (oPropValue instanceof Object && !(oPropValue instanceof Date)) {
                                this._createMetadataForExpanded(oItem[rel].__data, sProp, req, ModelClass.relations[sProp].modelTo, oPropValue.__data.id, oPropValue.__data);
                            }
                            else if (oPropValue instanceof Array) {
                                for (var iExpandedItem in oPropValue.__data) {
                                    this._createMetadataForExpanded(oItem[rel].__data, sProp, req, ModelClass.relations[sProp].modelTo, oPropValue.__data[iExpandedItem].id, oPropValue.__data[iExpandedItem]);
                                }
                            }
                        }
                    }
                }
            }
            else {
                var oModelData = void 0;
                if (typeof expandedData[rel] === "undefined") {
                    oModelData = expandedData;
                }
                else {
                    oModelData = expandedData[rel];
                }
                if (oModelData.__deferred) {
                    return;
                }
                if (oModelData instanceof Array) {
                    for (var i in oModelData) {
                        var propertyType = commons.convertType(ModelClass.definition._ids[0].property);
                        switch (propertyType) {
                            case odata_enums_1.ODataType.EDM_DECIMAL:
                            case odata_enums_1.ODataType.EDM_INT32:
                                oModelData[i].__metadata = {
                                    uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + oModelData[i].id + ')',
                                    type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                };
                                break;
                            default:
                                oModelData[i].__metadata = {
                                    uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + oModelData[i].id + '\')',
                                    type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                };
                                break;
                        }
                        var oData = oModelData[i];
                        for (var sProp in oData) {
                            if (sProp === "__metadata" || sProp === "__deferred")
                                continue;
                            var oPropValue = oData[sProp];
                            if (oPropValue instanceof Object && !(oPropValue instanceof Date)) {
                                this._createMetadataForExpanded(oData, sProp, req, ModelClass.relations[sProp].modelTo, oPropValue.id, oPropValue);
                            }
                            else if (oPropValue instanceof Array) {
                                for (var iExpandedItem in oPropValue) {
                                    this._createMetadataForExpanded(oData, rel, req, ModelClass, id, oPropValue[iExpandedItem]);
                                }
                            }
                        }
                    }
                }
                else if (oModelData instanceof Object) {
                    var propertyType = commons.convertType(ModelClass.definition._ids[0].property);
                    switch (propertyType) {
                        case odata_enums_1.ODataType.EDM_DECIMAL:
                        case odata_enums_1.ODataType.EDM_INT32:
                            oModelData.__metadata = {
                                uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + oModelData.id + ')',
                                type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                            };
                            break;
                        default:
                            oModelData.__metadata = {
                                uri: commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + oModelData.id + '\')',
                                type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                            };
                            break;
                    }
                    for (var sProp in oModelData) {
                        if (sProp === "__metadata" || sProp === "__deferred")
                            continue;
                        var oPropValue = oModelData[sProp];
                        if (oPropValue instanceof Object && !(oPropValue instanceof Date)) {
                            this._createMetadataForExpanded(oModelData, sProp, req, ModelClass.relations[sProp].modelTo, oPropValue.id, oPropValue);
                        }
                        else if (oPropValue instanceof Array) {
                            for (var iExpandedItem in oPropValue) {
                                this._createMetadataForExpanded(oModelData, rel, req, ModelClass, id, oPropValue[iExpandedItem]);
                            }
                        }
                    }
                }
            }
        };
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
                                var oCountFilter = filter.where;
                                ModelClass.count(oCountFilter, function (err, count) {
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
                                var effectiveMaxSize = this.oDataServerConfig.maxpagesize;
                                if (_maxpagesize && effectiveMaxSize && parseInt(_maxpagesize) < parseInt(effectiveMaxSize)) {
                                    effectiveMaxSize = _maxpagesize;
                                }
                                if (!filter.limit) {
                                    var _skiptoken = req.query.$skiptoken;
                                    _skiptoken = (!isNaN(_skiptoken) ? _skiptoken + parseInt(effectiveMaxSize) : parseInt(effectiveMaxSize));
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
                                    filter.limit = effectiveMaxSize;
                                    res.set('Preference-Applied', 'odata.maxpagesize=' + effectiveMaxSize);
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
                                        case odata_enums_1.ODataType.EDM_DECIMAL:
                                        case odata_enums_1.ODataType.EDM_INT32:
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
                                    for (var rel in ModelClass.relations) {
                                        _this._createMetadataForExpanded(object, rel, req, ModelClass.relations[rel].modelTo, object.getId(), data);
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            var arrParams0 = req.params[0].split('/');
            if (arrParams0 && arrParams0[arrParams0.length - 1] === '$count') {
                commons.getRequestModelClass(req.app.models, req.params[0]).then(function (oResult) {
                    var ModelClass = oResult.modelClass;
                    if (ModelClass) {
                        if (req.accepts("text/plain")) {
                            var filter = {};
                            filter = _applyFilter.call(_this, req, filter);
                            if (oResult.foreignKeyFilter) {
                                if (!filter) {
                                    filter = oResult.foreignKeyFilter;
                                }
                                else {
                                    filter = { "and": [filter.where, oResult.foreignKeyFilter] };
                                }
                            }
                            else {
                                filter = filter.where;
                            }
                            ModelClass.count(filter, function (err, count) {
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
                                for (var rel in ModelClass.relations) {
                                    _this._createDeferredObject(instance, rel, req, ModelClass, id);
                                }
                                var result = new BaseRequestHandler_1.EntityResult();
                                result.data = instance.toJSON();
                                for (var rel in ModelClass.relations) {
                                    _this._createMetadataForExpanded(instance, rel, req, ModelClass.relations[rel].modelTo, id, result.data);
                                }
                                var propertyType = commons.convertType(ModelClass.definition._ids[0].property);
                                var sKey = void 0;
                                switch (propertyType) {
                                    case odata_enums_1.ODataType.EDM_DECIMAL:
                                    case odata_enums_1.ODataType.EDM_INT32:
                                        sKey = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(' + id + ')';
                                        break;
                                    default:
                                        sKey = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '(\'' + id + '\')';
                                        break;
                                }
                                result.data.__metadata = {
                                    uri: sKey,
                                    type: constants.ODATA_NAMESPACE + '.' + ModelClass.definition.name
                                };
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
                case odata_enums_1.ODataType.EDM_DECIMAL:
                case odata_enums_1.ODataType.EDM_INT32:
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
            })).catch(function (err) {
                reject(err);
            });
        }
        else {
            ModelClass.findById(id, filter).then((function (instance) {
                resolve([instance]);
            })).catch(function (err) {
                reject(err);
            });
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
    var filterParam = req.query && req.query.$filter || undefined;
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
                var propName_1 = ast.left.name;
                propName_1 = propName_1.replace(/\//g, ".");
                if (ast.type === 'eq') {
                    where[propName_1] = ast.right.value;
                }
                else {
                    where[propName_1] = {};
                    where[propName_1][ast.type] = ast.right.value;
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