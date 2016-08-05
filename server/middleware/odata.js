"use strict";
var odata_1 = require("../../lib/odata");
module.exports = function (options) {
    return function odata(req, res, next) {
        options = options || {};
        var oData = new odata_1.OData();
        var oDataVersion = oData.getODataServerConfig().odataversion;
        if (!oDataVersion || oDataVersion === "4") {
            oData.handleRequestV4(req, res, next);
        }
        else {
            oData.handleRequestV2(req, res, next);
        }
    };
};
//# sourceMappingURL=odata.js.map