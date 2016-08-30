/**
 * A module for exposing enums that are used by several other
 * modules of the odata-server
 *
 */


/**
 * Type of GET-request that was sent by the client
 * @type {Object}
 */
export enum GetRequestTypeEnum {
	SERVICE = 0,
	COLLECTION = 1,
	ENTITY = 2,
	METADATA = 3,
	COLLECTION_COUNT = 4,
	UNDEFINED = 999
};

export enum HttpMethod {
	GET,
	POST,
	PUT,
	PATCH,
	MERGE,
	DELETE,
	OPTIONS,
	HEAD,
	TRACE,
	CONNECT
};

export enum ODataType {
	EDM_STRING,
	EDM_TIME,
	EDM_DATETIME,
	EDM_DATETIMEOFFSET,
	EDM_INT16,
	EDM_INT32,
	EDM_INT64,
	EDM_DECIMAL,
	EDM_BOOLEAN,
	EDM_BINARY,
	EDM_BYTE,
	EDM_DOUBLE,
	EDM_GUID,
	EDM_SBYTE,
	EDM_SINGLE,
}

export namespace ODataType {
	export function getEdmString(type: ODataType): string {
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
}



