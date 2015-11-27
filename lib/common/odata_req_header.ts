import constants = require('../constants/odata_constants');

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export = {
	getPreferHeader: _getPreferHeader
};


/**
 * Returns the Prefer header of the request as two-dimensional array. The Prefer header looks like
 * Prefer key1=value1,key2=value2,key3=value3,...
 * e.g.
 * Prefer odata.maxpagesize=3, odata.include-annotations="*"
 *
 * For the example this function will return
 * [
 * 	[maxpagesize, 3],
 * 	[include-annotation, "*"]
 * ]
 *
 * @param req
 * @returns {array} Array with Prefer header values or an empty header
 * @private
 */
function _getPreferHeader(req) {
	var arrRet = [];
	var _preferHeader = req.get(constants.HTTP_HEADER_PREFER);

	if(_preferHeader) {
		var arrPreferHeader = _preferHeader.split(',');

		arrPreferHeader.forEach(function (obj, idx, arr) {
			var arrObj = obj.split('=');
			// strip the string "odata" from the key
			var arrKey = arrObj[0].split('.');
			if (arrKey[0] === 'odata') {
				arrObj[0] = arrKey[1];
				arrRet.push(arrObj);
			}
		});
	}

	return arrRet;
}




