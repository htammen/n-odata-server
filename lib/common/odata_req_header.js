"use strict";
var constants = require('../constants/odata_constants');
function _getPreferHeader(req) {
    var arrRet = [];
    var _preferHeader = req.get(constants.HTTP_HEADER_PREFER);
    if (_preferHeader) {
        var arrPreferHeader = _preferHeader.split(',');
        arrPreferHeader.forEach(function (obj, idx, arr) {
            var arrObj = obj.split('=');
            var arrKey = arrObj[0].split('.');
            if (arrKey[0] === 'odata') {
                arrObj[0] = arrKey[1];
                arrRet.push(arrObj);
            }
        });
    }
    return arrRet;
}
module.exports = {
    getPreferHeader: _getPreferHeader
};
//# sourceMappingURL=odata_req_header.js.map