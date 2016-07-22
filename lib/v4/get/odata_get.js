"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var enums = require('../../constants/odata_enums');
var commons = require('../../common/odata_common');
var req_header = require('../../common/odata_req_header');
var BaseRequestHandler = require('../../base/BaseRequestHandler');
var ODataGet = (function (_super) {
    __extends(ODataGet, _super);
    function ODataGet() {
        _super.call(this);
    }
    ;
    ODataGet.prototype.handleGet = function (req, res) {
        _handleGet.call(this, req, res);
    };
    return ODataGet;
}(BaseRequestHandler.BaseRequestHandler));
exports.ODataGet = ODataGet;
function _handleGet(req, res) {
    this.setODataVersion(res);
    var reqType = commons.getRequestType(req);
    switch (reqType) {
        case enums.GetRequestTypeEnum.SERVICE:
            _getServiceDocument(req, res);
            break;
        case enums.GetRequestTypeEnum.METADATA:
            _getMetadataDocument(req, res);
            break;
        case enums.GetRequestTypeEnum.COLLECTION:
            _getCollectionData(req, res);
            break;
        case enums.GetRequestTypeEnum.ENTITY:
            _getEntityData(req, res);
            break;
        default:
            res.sendStatus(404);
    }
}
function _getMetadataDocument(req, res) {
    var meta = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<edmx:Edmx Version=\"1.0\" xmlns:edmx=\"http://schemas.microsoft.com/ado/2007/06/edmx\"\n\t\t\t\t\t xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\"\n\t\t\t\t\t xmlns:sap=\"http://www.sap.com/Protocols/SAPData\">\n\t<edmx:DataServices m:DataServiceVersion=\"2.0\">\n\t\t<Schema Namespace=\"SAMPLEXX\" xml:lang=\"de\"\n\t\t\t\t\t\txmlns=\"http://schemas.microsoft.com/ado/2008/09/edm\">\n\t\t\t<EntityType Name=\"person\" sap:content-version=\"1\">\n\t\t\t\t<Key>\n\t\t\t\t\t<PropertyRef Name=\"id\"/>\n\t\t\t\t</Key>\n\t\t\t\t<Property Name=\"id\" Type=\"Edm.Int32\" Nullable=\"false\" sap:label=\"Person id\"/>\n\t\t\t\t<Property Name=\"firstname\" Type=\"Edm.String\" MaxLength=\"60\" sap:label=\"Firstname\"/>\n\t\t\t\t<Property Name=\"lastname\" Type=\"Edm.String\" MaxLength=\"60\" sap:label=\"Lastname\"/>\n\t\t\t\t<Property Name=\"gender\" Type=\"Edm.String\" sap:label=\"Gender (m/f)\"/>\n\t\t\t\t<Property Name=\"age\" Type=\"Edm.Int32\" sap:label=\"Age in years\"/>\n\t\t\t</EntityType>\n\t\t\t<EntityContainer Name=\"SAMPLEXX\" m:IsDefaultEntityContainer=\"true\">\n\t\t\t\t<EntitySet Name=\"people\" EntityType=\"SAMPLEXX.person\" sap:content-version=\"1\"/>\n\t\t\t</EntityContainer>\n\t\t\t<!--\n\t\t\t<atom:link rel=\"self\" href=\"https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/$metadata\"\n\t\t\t\t\t\t\t\t xmlns:atom=\"http://www.w3.org/2005/Atom\"/>\n\t\t\t<atom:link rel=\"latest-version\"\n\t\t\t\t\t\t\t\t href=\"https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/$metadata\"\n\t\t\t\t\t\t\t\t xmlns:atom=\"http://www.w3.org/2005/Atom\"/>\n\t\t\t-->\n\t\t</Schema>\n\t</edmx:DataServices>\n</edmx:Edmx>\n";
    res.set('Content-Type', 'application/xml');
    res.send(meta);
}
function _getServiceDocument(req, res) {
    var json = [];
    var models = req.app.models();
    models.forEach(function (model) {
        var modelObj = {};
        var plural = commons.getPluralForModel(model);
        modelObj.name = plural;
        modelObj.url = plural;
        json.push(modelObj);
    });
    var result = {};
    result['@odata.context'] = commons.getBaseURL(req) + '/$metadata';
    result.value = json;
    res.send(result);
}
function _getCollectionData(req, res) {
    var _this = this;
    commons.getModelClass(req.app.models, req.params[0]).then(function (ModelClass) {
        if (ModelClass) {
            var _maxpagesize;
            var reqHeaderArr = req_header.getPreferHeader(req);
            reqHeaderArr.forEach(function (obj, idx, arr) {
                if (obj[0] === 'maxpagesize') {
                    _maxpagesize = obj[1];
                }
            });
            var filter = {};
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
                filter = _applySelect(req, filter);
                ModelClass.find(filter, function (err, data) {
                    var result = {};
                    if (nextLink) {
                        result['@odata.netxtLink'] = nextLink;
                    }
                    result.value = data;
                    res.send(result);
                });
            }
        }
        else {
            res.sendStatus(404);
        }
    });
}
function _getEntityData(req, res) {
    var param0 = req.params[0];
    var id = commons.getIdFromUrlParameter(param0);
    var collection = param0.substr(0, param0.indexOf('('));
    commons.getModelClass(req.app.models, param0).then(function (ModelClass) {
        if (ModelClass) {
            var filter = _applySelect(req);
            ModelClass.findById(id, filter, function (err, instance) {
                if (err) {
                    console.error(err.toString());
                    res.sendStatus(500);
                }
                else {
                    if (instance) {
                        var result = instance.toJSON();
                        result['@odata.context'] = commons.getBaseURL(req) + '/$metadata#' + collection + '/$entity';
                        res.send(result);
                    }
                    else {
                        console.error('entity data for request ' + req.originalUrl + ' was not found');
                        res.sendStatus(404);
                    }
                }
            });
        }
        else {
            res.sendStatus(404);
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
//# sourceMappingURL=odata_get.js.map