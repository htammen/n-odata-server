/// <reference path="../../../typescript/declarations/node.d.ts" />
/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var enums = require('../../constants/odata_enums');
var commons = require('../../common/odata_common');
var ODataGetBase = require('../../base/get/odata_get');
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
        this.setODataVersion(res, "2.0");
        // is it a service-, collection- or single entity request?
        var reqType = commons.getRequestType(req);
        switch (reqType) {
            case enums.GetRequestTypeEnum.SERVICE:
                _super.prototype._getServiceDocument.call(this, req, res).then(function (serviceDocumentResult) {
                    var result = serviceDocumentResult.getRequestResult();
                    res.send(result);
                });
                break;
            case enums.GetRequestTypeEnum.METADATA:
                _getMetadataDocument.call(this, req, res);
                break;
            case enums.GetRequestTypeEnum.COLLECTION:
                /* get a collection as result set */
                _super.prototype._getCollectionData.call(this, req, res).then(function (collectionResult) {
                    var result = collectionResult.getRequestResult();
                    res.send(result);
                });
                //_getCollectionData.call(this, req, res);
                break;
            case enums.GetRequestTypeEnum.ENTITY:
                _super.prototype._getEntityData.call(this, req, res).then(function (entityResult) {
                    var result = entityResult.getRequestResult();
                    res.send(result);
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
    //var meta: string;
    //fs.readFile('../metadata.xml', 'utf8', function (err,data) {
    //	if (err) {
    //		return console.log(err);
    //	}
    //	meta = data;
    //});
    var meta = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<edmx:Edmx Version=\"1.0\" xmlns:edmx=\"http://schemas.microsoft.com/ado/2007/06/edmx\"\n\t\t\t\t\t xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\"\n\t\t\t\t\t xmlns:sap=\"http://www.sap.com/Protocols/SAPData\">\n\t<edmx:DataServices m:DataServiceVersion=\"2.0\">\n\t\t<Schema Namespace=\"SAMPLEXX\" xml:lang=\"de\"\n\t\t\t\t\t\txmlns=\"http://schemas.microsoft.com/ado/2008/09/edm\">\n\t\t\t<EntityType Name=\"person\" sap:content-version=\"1\">\n\t\t\t\t<Key>\n\t\t\t\t\t<PropertyRef Name=\"id\"/>\n\t\t\t\t</Key>\n\t\t\t\t<Property Name=\"id\" Type=\"Edm.Int32\" Nullable=\"false\" sap:label=\"Person id\"/>\n\t\t\t\t<Property Name=\"firstname\" Type=\"Edm.String\" MaxLength=\"60\" sap:label=\"Firstname\"/>\n\t\t\t\t<Property Name=\"lastname\" Type=\"Edm.String\" MaxLength=\"60\" sap:label=\"Lastname\"/>\n\t\t\t\t<Property Name=\"gender\" Type=\"Edm.String\" sap:label=\"Gender (m/f)\"/>\n\t\t\t\t<Property Name=\"age\" Type=\"Edm.Int32\" sap:label=\"Age in years\"/>\n\t\t\t</EntityType>\n\t\t\t<EntityContainer Name=\"SAMPLEXX\" m:IsDefaultEntityContainer=\"true\">\n\t\t\t\t<EntitySet Name=\"people\" EntityType=\"SAMPLEXX.person\" sap:content-version=\"1\"/>\n\t\t\t</EntityContainer>\n\t\t\t<!--\n\t\t\t<atom:link rel=\"self\" href=\"https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/$metadata\"\n\t\t\t\t\t\t\t\t xmlns:atom=\"http://www.w3.org/2005/Atom\"/>\n\t\t\t<atom:link rel=\"latest-version\"\n\t\t\t\t\t\t\t\t href=\"https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/$metadata\"\n\t\t\t\t\t\t\t\t xmlns:atom=\"http://www.w3.org/2005/Atom\"/>\n\t\t\t-->\n\t\t</Schema>\n\t</edmx:DataServices>\n</edmx:Edmx>\n";
    res.set('Content-Type', 'application/xml');
    res.send(meta);
}
//# sourceMappingURL=odata_get.js.map