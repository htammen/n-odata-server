import commons = require('../../common/odata_common');
import BaseRequestHandler = require('../../base/BaseRequestHandler');
import {ODataPutBase} from "../../base/put/odata_put";

/**
 * A module for exporting PUT functions of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export class ODataPut extends ODataPutBase {
	constructor() {
		super()
	};

	handlePut(req, res) {
		super._handlePut(req, res).then(result => {
			res.sendStatus(204)
		}).catch(err => {
			super.handleError(err, res);
		});

	}

	handleMerge(req, res) {
		super._handlePut(req, res).then(result => {
			res.sendStatus(204)
		}).catch(err => {
			super.handleError(err, res);
		});

	}
}


