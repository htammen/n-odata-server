/// <reference path="../../typings/index.d.ts"/>

import {OData} from "../../lib/odata";
import {Request} from "express";
import {Response} from "express";

/**
 * Factory function for usage via loopback middleware which should be the preferred option compared to use it only via
 * component-config.
 * @param options The parameters defined in middleware.json for this route
 * @returns {(req:Request, res:Response, next:any)=>undefined}
 */
module.exports = function(options) {
	return function odata(req:Request, res:Response, next) {
		options = options || {};
		let oData = new OData();  // get the singleton OData instance
		let oDataVersion = oData.getODataServerConfig().odataversion;
		if (!oDataVersion || oDataVersion === "4") {
			oData.handleRequestV4(req, res, next);
		} else {
			oData.handleRequestV2(req, res, next);
		}
	}
}
