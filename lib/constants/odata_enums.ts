

/**
 * Type of GET-request that was sent by the client
 * @type {Object}
 */
var _GetRequestTypeEnum = {
	SERVICE: 0,
	COLLECTION: 1,
	ENTITY: 2,
	METADATA: 3,
	COLLECTION_COUNT: 4,
	UNDEFINED: 999
};

/**
 * A module for exposing enums that are used by several other
 * modules of the odata-server
 *
 */
export = {
	GetRequestTypeEnum: _GetRequestTypeEnum
};


