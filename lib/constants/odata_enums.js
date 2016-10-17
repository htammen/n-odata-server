"use strict";
(function (GetRequestTypeEnum) {
    GetRequestTypeEnum[GetRequestTypeEnum["SERVICE"] = 0] = "SERVICE";
    GetRequestTypeEnum[GetRequestTypeEnum["COLLECTION"] = 1] = "COLLECTION";
    GetRequestTypeEnum[GetRequestTypeEnum["ENTITY"] = 2] = "ENTITY";
    GetRequestTypeEnum[GetRequestTypeEnum["METADATA"] = 3] = "METADATA";
    GetRequestTypeEnum[GetRequestTypeEnum["COLLECTION_COUNT"] = 4] = "COLLECTION_COUNT";
    GetRequestTypeEnum[GetRequestTypeEnum["UNDEFINED"] = 999] = "UNDEFINED";
})(exports.GetRequestTypeEnum || (exports.GetRequestTypeEnum = {}));
var GetRequestTypeEnum = exports.GetRequestTypeEnum;
;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["PATCH"] = 3] = "PATCH";
    HttpMethod[HttpMethod["MERGE"] = 4] = "MERGE";
    HttpMethod[HttpMethod["DELETE"] = 5] = "DELETE";
    HttpMethod[HttpMethod["OPTIONS"] = 6] = "OPTIONS";
    HttpMethod[HttpMethod["HEAD"] = 7] = "HEAD";
    HttpMethod[HttpMethod["TRACE"] = 8] = "TRACE";
    HttpMethod[HttpMethod["CONNECT"] = 9] = "CONNECT";
})(exports.HttpMethod || (exports.HttpMethod = {}));
var HttpMethod = exports.HttpMethod;
;
(function (ODataType) {
    ODataType[ODataType["EDM_STRING"] = 0] = "EDM_STRING";
    ODataType[ODataType["EDM_TIME"] = 1] = "EDM_TIME";
    ODataType[ODataType["EDM_DATETIME"] = 2] = "EDM_DATETIME";
    ODataType[ODataType["EDM_DATETIMEOFFSET"] = 3] = "EDM_DATETIMEOFFSET";
    ODataType[ODataType["EDM_INT16"] = 4] = "EDM_INT16";
    ODataType[ODataType["EDM_INT32"] = 5] = "EDM_INT32";
    ODataType[ODataType["EDM_INT64"] = 6] = "EDM_INT64";
    ODataType[ODataType["EDM_DECIMAL"] = 7] = "EDM_DECIMAL";
    ODataType[ODataType["EDM_BOOLEAN"] = 8] = "EDM_BOOLEAN";
    ODataType[ODataType["EDM_BINARY"] = 9] = "EDM_BINARY";
    ODataType[ODataType["EDM_BYTE"] = 10] = "EDM_BYTE";
    ODataType[ODataType["EDM_DOUBLE"] = 11] = "EDM_DOUBLE";
    ODataType[ODataType["EDM_GUID"] = 12] = "EDM_GUID";
    ODataType[ODataType["EDM_SBYTE"] = 13] = "EDM_SBYTE";
    ODataType[ODataType["EDM_SINGLE"] = 14] = "EDM_SINGLE";
})(exports.ODataType || (exports.ODataType = {}));
var ODataType = exports.ODataType;
var ODataType;
(function (ODataType) {
    function getEdmString(type) {
        switch (type) {
            case ODataType.EDM_DECIMAL:
                return "Edm.Decimal";
            case ODataType.EDM_STRING:
                return "Edm.String";
            case ODataType.EDM_BINARY:
                return "Edm.Binary";
            case ODataType.EDM_BOOLEAN:
                return "Edm.Boolean";
            case ODataType.EDM_BYTE:
                return "Edm.Byte";
            case ODataType.EDM_DATETIME:
                return "Edm.DateTime";
            case ODataType.EDM_DATETIMEOFFSET:
                return "Edm.DateTimeOffset";
            case ODataType.EDM_DOUBLE:
                return "Edm.Double";
            case ODataType.EDM_GUID:
                return "Edm.Guid";
            case ODataType.EDM_INT16:
                return "Edm.Int16";
            case ODataType.EDM_INT32:
                return "Edm.Int32";
            case ODataType.EDM_INT64:
                return "Edm.Int64";
            case ODataType.EDM_SBYTE:
                return "Edm.SByte";
            case ODataType.EDM_SINGLE:
                return "Edm.Single";
            case ODataType.EDM_TIME:
                return "Edm.Time";
            default:
                return undefined;
        }
    }
    ODataType.getEdmString = getEdmString;
})(ODataType = exports.ODataType || (exports.ODataType = {}));
//# sourceMappingURL=odata_enums.js.map