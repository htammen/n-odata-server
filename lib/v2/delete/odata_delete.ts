import commons = require('../../common/odata_common');
import BaseRequestHandler = require('../../base/BaseRequestHandler');
import {ODataDeleteBase} from "../../base/delete/odata_delete";
import {DeleteRequestHandler} from "../../base/BaseRequestHandler";

/**
 * A module for exporting DELETE functions of the odata-server
 *
 * @param loopbackApplication
 * @param options
 */
export class ODataDelete extends ODataDeleteBase implements DeleteRequestHandler {
	constructor() {
		super()
	};

	handleDelete(req, res) {
		super._handleDelete(req, res).then(result => {
			res.sendStatus(204)
		}).catch(err => {
			super.handleError(err, res);
		});

	}

}


