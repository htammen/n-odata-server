/// <reference path="../../../typings/index.d.ts" />

import constants = require('../../constants/odata_constants');
import enums = require('../../constants/odata_enums');
import commons = require('../../common/odata_common');
import req_header = require('../../common/odata_req_header');
import BaseRequestHandler = require('../../base/BaseRequestHandler');
import ODataGetBase = require('../../base/get/odata_get')
import fs = require('fs');
import {CollectionResult} from "../../base/get/odata_get";
import {EntityResult} from "../../base/BaseRequestHandler";
import {ServiceDocumentResult} from "../../base/get/odata_get";
import {Metadata} from "../../base/metadata/metadata";
import {GetRequestHandler} from "../../base/BaseRequestHandler";

/**
 * A module for exporting common function that are used by several other
 * modules of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export class ODataGet extends ODataGetBase.ODataGetBase implements GetRequestHandler{
	constructor() {super()};

	/**
	 * handles the GET request to the OData server
	 * e.g. http://0.0.0.0:3000/odata/people
	 * Here `people` is the pluralModelName of the Model to search
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	handleGet(req, res) {
		//_handleGet.call(this, req, res);
		// set OData-Version in response header
		this.setODataVersion(res, constants.ODATA_VERSION_2);

		// is it a service-, collection- or single entity request?
		var reqType = commons.getRequestType(req);
		switch (reqType) {
			case enums.GetRequestTypeEnum.SERVICE:
				super._getServiceDocument(req, res).then((serviceDocumentResult: ServiceDocumentResult) => {
					var result: any = serviceDocumentResult.getRequestResult();
					res.send(result);
				}, (error) => {
					console.error('An error occured: ', error);
					res.status(500).send(error.toString());
				})
				break;

			case enums.GetRequestTypeEnum.METADATA:
				_getMetadataDocument.call(this, req, res);
				break;

			case enums.GetRequestTypeEnum.COLLECTION_COUNT:
				/* retrieve the number of records for a collection */
				super._getCollectionCount(req, res).then( (collectionCount: number) => {
					res.set('Content-Type', 'text/plain');
					res.send(collectionCount.toString());
				}, (error) => {
					console.error(error);
					res.status(500).send(error.toString());
				});
				break;

			case enums.GetRequestTypeEnum.COLLECTION:
				/* get a collection as result set */
				super._getCollectionData(req, res).then( (collectionResult: CollectionResult) => {
					var result: any = collectionResult.getRequestResult();
					res.send(result);
				}, (error) => {
					console.error(error);
					res.status(500).send(error.toString());
				});
				//_getCollectionData.call(this, req, res);
				break;

			case enums.GetRequestTypeEnum.ENTITY:
				super._getEntityData(req, res).then((entityResult: EntityResult) => {
					var result: any = entityResult.getRequestResult();
					res.send(result);
				}, (error) => {
					console.error('An error occured: ', error);
					res.status(500).send(error.toString());
				});
				break;

			default:
				res.sendStatus(404);
		}
	}

}


/** Just in test state at the moment */
function _getMetadataDocument(req, res) {
	new Metadata(req.app).buildMetadata().then(function(metaData) {
		res.set('Content-Type', 'application/xml');
		res.send(metaData);
	});
}


