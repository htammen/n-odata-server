/**
 * This is a base class for all OData request handler classes like odata_get, odata_put, ...
 * It exposes functions that are used by all derived classes
 * @type {BaseRequestHandler}
 */
export class BaseRequestHandler {
	/**
	 * Sets the OData-Version response header. This must be delivered by an OData-Server
	 * @param res
	 * @private
	 */
	setODataVersion(res) {
		res.set('OData-Version', '4.0');

	}
}
