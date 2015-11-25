/**
 * This is a base class for all OData request handler classes like odata_get, odata_put, ...
 * It exposes functions that are used by all derived classes
 * @type {BaseRequestHandler}
 */
module.exports = BaseRequestHandler;


function BaseRequestHandler() {

	return {
		setODataVersion: _setODataVersion
	}
}


/**
 * Sets the OData-Version response header. This must be delivered by an OData-Server
 * @param res
 * @private
 */
function _setODataVersion(res) {
	res.set('OData-Version', '4.0');
}
