/// <reference path="../../../typings/index.d.ts" />

import constants = require('../../constants/odata_constants');
import enums = require('../../constants/odata_enums');
import commons = require('../../common/odata_common');
import req_header = require('../../common/odata_req_header');
import BaseRequestHandler = require('../../base/BaseRequestHandler');
import fs = require('fs');
import {GetRequestHandler} from "../../base/BaseRequestHandler";

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export class ODataGet extends BaseRequestHandler.BaseRequestHandler implements GetRequestHandler{
	constructor() {super()};

	handleGet(req, res) {
		_handleGet.call(this, req, res);
	}

}

/**
 * handles the GET request to the OData server
 * e.g. http://0.0.0.0:3000/odata/people
 * Here `people` is the pluralModelName of the Model to search
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _handleGet(req, res) {
	// set OData-Version in response header
	this.setODataVersion(res);

	// is it a service-, collection- or single entity request?
	var reqType = commons.getRequestType(req);
	switch (reqType) {
		case enums.GetRequestTypeEnum.SERVICE:
			_getServiceDocument(req, res);
			break;
		case enums.GetRequestTypeEnum.METADATA:
			_getMetadataDocument(req, res);
			break;
		case enums.GetRequestTypeEnum.COLLECTION:
			_getCollectionData(req, res);
			break;
		case enums.GetRequestTypeEnum.ENTITY:
			_getEntityData(req, res);
			break;
		default:
			res.sendStatus(404);
	}
}


function _getMetadataDocument(req, res) {
	//var meta: string;
	//fs.readFile('../metadata.xml', 'utf8', function (err,data) {
	//	if (err) {
	//		return console.log(err);
	//	}
	//	meta = data;
	//});

	var meta : string = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx"
					 xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"
					 xmlns:sap="http://www.sap.com/Protocols/SAPData">
	<edmx:DataServices m:DataServiceVersion="2.0">
		<Schema Namespace="SAMPLEXX" xml:lang="de"
						xmlns="http://schemas.microsoft.com/ado/2008/09/edm">
			<EntityType Name="person" sap:content-version="1">
				<Key>
					<PropertyRef Name="id"/>
				</Key>
				<Property Name="id" Type="Edm.Int32" Nullable="false" sap:label="Person id"/>
				<Property Name="firstname" Type="Edm.String" MaxLength="60" sap:label="Firstname"/>
				<Property Name="lastname" Type="Edm.String" MaxLength="60" sap:label="Lastname"/>
				<Property Name="gender" Type="Edm.String" sap:label="Gender (m/f)"/>
				<Property Name="age" Type="Edm.Int32" sap:label="Age in years"/>
			</EntityType>
			<EntityContainer Name="SAMPLEXX" m:IsDefaultEntityContainer="true">
				<EntitySet Name="people" EntityType="SAMPLEXX.person" sap:content-version="1"/>
			</EntityContainer>
			<!--
			<atom:link rel="self" href="https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/$metadata"
								 xmlns:atom="http://www.w3.org/2005/Atom"/>
			<atom:link rel="latest-version"
								 href="https://sapes1.sapdevcenter.com:443/sap/opu/odata/sap/SALESORDERXX/$metadata"
								 xmlns:atom="http://www.w3.org/2005/Atom"/>
			-->
		</Schema>
	</edmx:DataServices>
</edmx:Edmx>
`
	res.set('Content-Type', 'application/xml');
	res.send(meta);

}

/**
 * Returns the service document of this service
 * The service document displays all entitysets, functions, Singletons, ... that the service
 * exposes
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _getServiceDocument(req, res) {
	var json = [];

	var models = req.app.models();
	models.forEach(function (model) {
		var modelObj: any = {};
		var plural = commons.getPluralForModel(model);
		modelObj.name = plural;
		modelObj.url = plural;
		json.push(modelObj);
	});

	var result: any = {};
	//TODO: The port is not available via the request. How can we get it?
	result['@odata.context'] = commons.getBaseURL(req) + '/$metadata';
	result.value = json;
	res.send(result);
}

/**
 * Get all records for a collection. The name of the collection
 * is given in the 1st request parameter
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _getCollectionData(req, res) {
	//DONE: The odata.nextLink annotation MUST be included in a response that represents a partial result. "@odata.nextLink": "...?$skiptoken=342r89"
	commons.getModelClass(req.app.models, req.params[0]).then((ModelClass: any) => {
		if (ModelClass) {
			// Retrieve odata.maxpagesize from Prefer header of the request
			var _maxpagesize;
			var reqHeaderArr = req_header.getPreferHeader(req);
			reqHeaderArr.forEach(function (obj, idx, arr) {
				if (obj[0] === 'maxpagesize') {
					_maxpagesize = obj[1];
				}
			});

			var filter:any = {};
			//TODO: apply $filter parameter
			//TODO: apply $search parameter

			// if user appended the $count parameter she just wants the number of records
			// after filter and search has been applied
			if (req.query.$count !== undefined) {
				if (req.accepts("text/plain")) {
					ModelClass.count(function (err, count) {
						res.set('Content-Type', 'text/plain');
						res.send(count.toString());
					})
				} else {
					res.sendStatus(415)
				}
			} else {
				// here we do the main work if the user wants data from a collection
				var nextLink;

				// retrieve only top=xx records
				if (req.query.$top) {
					filter.limit = req.query.$top;
				}
				// the implementation of $skiptoken is service specific. We define that $skiptoken behaves like $skip
				if (req.query.$skip || req.query.$skiptoken) {
					filter.skip = req.query.$skip || req.query.$skiptoken;
				}
				// adjust the number of records that are returned according to the maxpagesize setting, either by client
				// or by the server application
				if (!filter.limit || filter.limit > this.oDataServerConfig.maxpagesize || (_maxpagesize && filter.limit > _maxpagesize)) {
					var tmpMaxSize = this.oDataServerConfig.maxpagesize;
					if (_maxpagesize && tmpMaxSize && parseInt(_maxpagesize) < parseInt(tmpMaxSize)) {
						tmpMaxSize = _maxpagesize;
					}
					// if limit has not been set yet we have to add a nextLink property to the response to enable the user to automatically
					// page to the next chunk of data
					if (!filter.limit) {
						var _skiptoken:number = req.query.$skiptoken;
						_skiptoken = (!isNaN(_skiptoken) ? _skiptoken + parseInt(tmpMaxSize) : parseInt(tmpMaxSize));
						nextLink = commons.getBaseURL(req) + '/' + commons.getPluralForModel(ModelClass) + '?$skiptoken=' + _skiptoken;
						// if nextLink is set, means we deliver partially response, we need to know if there would be more data
						// if the nextLink is processed. If the current data chunk is the last one we MUST NOT set the nextLink into
						// the response
						if (nextLink) {
							var nlFilter:any = {};
							nlFilter.skip = _skiptoken;
							nlFilter.limit = 1;	// just need to test if there is at least one more record
							ModelClass.find(nlFilter, function (err, data) {
								if (data.length === 0) {
									nextLink = undefined;
								}
							});
						}

						// set the filter limit to the calculated maxSize
						filter.limit = tmpMaxSize;
						res.set('Preference-Applied', 'odata.maxpagesize=' + tmpMaxSize);
					}
				}

				// apply $select URL parameter
				filter = _applySelect(req, filter);

				// Now we call the find method of the ModelClass with filter definition
				ModelClass.find(filter, function (err, data) {
					var result:any = {};
					if (nextLink) {
						result['@odata.netxtLink'] = nextLink;
					}
					result.value = data;
					res.send(result);
				});
			}
		} else {
			res.sendStatus(404);
		}
	});
}

/**
 * Get the data for exactly one object of an entity type
 * @param req
 * @param res
 * @private
 */
function _getEntityData(req, res) {
	var param0 = req.params[0];
	// extract the id from the request
	var id = commons.getIdFromUrlParameter(param0);
	var collection = param0.substr(0, param0.indexOf('('));
	commons.getModelClass(req.app.models, param0).then((ModelClass: any) => {
		if (ModelClass) {
			// apply $select URL parameter
			var filter = _applySelect(req);

			ModelClass.findById(id, filter, function (err, instance) {
				if (err) {
					console.error(err.toString());
					res.sendStatus(500);
				} else {
					if (instance) {
						var result = instance.toJSON();
						result['@odata.context'] = commons.getBaseURL(req) + '/$metadata#' + collection + '/$entity';
						res.send(result);
					} else {
						console.error('entity data for request ' + req.originalUrl + ' was not found');
						res.sendStatus(404);
					}
				}
			});
		} else {
			res.sendStatus(404);
		}
	});
}


/**
 * Applies the $select URL parameter that may be defined on the URL to the filter object of loopback find.
 * @param req
 * @param filter
 * @returns {filter}
 * @private
 */
function _applySelect(req, filter?: any) {
	var selectList = req.query.$select;
	filter = filter || {};
	if (selectList) {
		// * means: give me all field which is loopback default
		if (selectList !== '*') {
			var arr = selectList.split(',');
			var fields = filter.fields || {};
			arr.forEach(function (obj, idx, array) {
				fields[obj] = true;
			});
			filter.fields = fields;
		}
	}
	return filter;
}


