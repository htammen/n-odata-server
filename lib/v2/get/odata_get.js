/// <reference path="../../../typescript/declarations/node.d.ts" />
/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants = require('../../constants/odata_constants');
var enums = require('../../constants/odata_enums');
var commons = require('../../common/odata_common');
var ODataGetBase = require('../../base/get/odata_get');
var metadata_1 = require("./metadata");
/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
var ODataGet = (function (_super) {
    __extends(ODataGet, _super);
    function ODataGet() {
        _super.call(this);
    }
    ;
    /**
     * handles the GET request to the OData server
     * e.g. http://0.0.0.0:3000/odata/people
     * Here `people` is the pluralModelName of the Model to search
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    ODataGet.prototype.handleGet = function (req, res) {
        //_handleGet.call(this, req, res);
        // set OData-Version in response header
        this.setODataVersion(res, constants.ODATA_VERSION_2);
        // is it a service-, collection- or single entity request?
        var reqType = commons.getRequestType(req);
        switch (reqType) {
            case enums.GetRequestTypeEnum.SERVICE:
                _super.prototype._getServiceDocument.call(this, req, res).then(function (serviceDocumentResult) {
                    var result = serviceDocumentResult.getRequestResult();
                    res.send(result);
                }, function (error) {
                    console.error('An error occured: ', error);
                    res.sendStatus(500);
                });
                break;
            case enums.GetRequestTypeEnum.METADATA:
                _getMetadataDocument.call(this, req, res);
                break;
            case enums.GetRequestTypeEnum.COLLECTION_COUNT:
                /* retrieve the number of records for a collection */
                _super.prototype._getCollectionCount.call(this, req, res).then(function (collectionCount) {
                    res.set('Content-Type', 'text/plain');
                    res.send(collectionCount.toString());
                }, function (error) {
                    console.error(error);
                    res.status(500).send(error.toString());
                });
                break;
            case enums.GetRequestTypeEnum.COLLECTION:
                /* get a collection as result set */
                _super.prototype._getCollectionData.call(this, req, res).then(function (collectionResult) {
                    var result = collectionResult.getRequestResult();
                    res.send(result);
                }, function (error) {
                    console.error(error);
                    res.status(500).send(error.toString());
                });
                //_getCollectionData.call(this, req, res);
                break;
            case enums.GetRequestTypeEnum.ENTITY:
                _super.prototype._getEntityData.call(this, req, res).then(function (entityResult) {
                    var result = entityResult.getRequestResult();
                    res.send(result);
                }, function (error) {
                    console.error('An error occured: ', error);
                    res.sendStatus(500);
                });
                break;
            default:
                res.sendStatus(404);
        }
    };
    return ODataGet;
})(ODataGetBase.ODataGetBase);
exports.ODataGet = ODataGet;
/** Just in test state at the moment */
function _getMetadataDocument(req, res) {
    var metaaData = metadata_1.getMetaData(req.app.models());
    res.set('Content-Type', 'application/xml');
    res.send(metaaData);
}
//# sourceMappingURL=odata_get.js.map