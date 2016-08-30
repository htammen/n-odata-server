"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants = require('../../constants/odata_constants');
var enums = require('../../constants/odata_enums');
var commons = require('../../common/odata_common');
var ODataGetBase = require('../../base/get/odata_get');
var metadata_1 = require("../../base/metadata/metadata");
var ODataGet = (function (_super) {
    __extends(ODataGet, _super);
    function ODataGet() {
        _super.call(this);
    }
    ;
    ODataGet.prototype.handleGet = function (req, res) {
        this.setODataVersion(res, constants.ODATA_VERSION_2);
        var reqType = commons.getRequestType(req);
        switch (reqType) {
            case enums.GetRequestTypeEnum.SERVICE:
                _super.prototype._getServiceDocument.call(this, req, res).then(function (serviceDocumentResult) {
                    var result = serviceDocumentResult.getRequestResult();
                    res.send(result);
                }, function (error) {
                    console.error('An error occured: ', error);
                    res.status(500).send(error.toString());
                });
                break;
            case enums.GetRequestTypeEnum.METADATA:
                _getMetadataDocument.call(this, req, res);
                break;
            case enums.GetRequestTypeEnum.COLLECTION_COUNT:
                _super.prototype._getCollectionCount.call(this, req, res).then(function (collectionCount) {
                    res.set('Content-Type', 'text/plain');
                    res.send(collectionCount.toString());
                }, function (error) {
                    console.error(error);
                    res.status(500).send(error.toString());
                });
                break;
            case enums.GetRequestTypeEnum.COLLECTION:
                _super.prototype._getCollectionData.call(this, req, res).then(function (collectionResult) {
                    var result = collectionResult.getRequestResult();
                    res.send(result);
                }, function (error) {
                    console.error(error);
                    res.status(500).send(error.toString());
                });
                break;
            case enums.GetRequestTypeEnum.ENTITY:
                _super.prototype._getEntityData.call(this, req, res).then(function (entityResult) {
                    var result = entityResult.getRequestResult();
                    res.send(result);
                }, function (error) {
                    console.error('An error occured: ', error);
                    res.status(500).send(error.toString());
                });
                break;
            default:
                res.sendStatus(404);
        }
    };
    return ODataGet;
}(ODataGetBase.ODataGetBase));
exports.ODataGet = ODataGet;
function _getMetadataDocument(req, res) {
    new metadata_1.Metadata(req.app).buildMetadata().then(function (metaData) {
        res.set('Content-Type', 'application/xml');
        res.send(metaData);
    });
}
//# sourceMappingURL=odata_get.js.map