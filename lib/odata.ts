/**
 * This module implements the odata server functionality
 * At the moment it is implemented as local loopback component
 * See here for more details on creating and registering loopback components
 * https://docs.strongloop.com/display/public/LB/Creating+components
 *
 */

import constants = require('./constants/odata_constants');
import common = require('./common/odata_common');
import ODataGet = require('./get/odata_get');
import ODataPost = require('./post/odata_post');
import ODataPut = require('./put/odata_put');
import ODataDelete = require('./delete/odata_delete');
var oDataServerConfig;


/**
 * Exposes the main function of the n-odata-server
 */
export = function (loopbackApplication, options) {
	this.oDataGet = new ODataGet.ODataGet();
	this.oDataDelete = new ODataDelete.ODataDelete();
	this.oDataPost = new ODataPost.ODataPost();
	this.oDataPut = new ODataPut.ODataPut();

	// save the options defined in a local variable
	oDataServerConfig = options;
	// if not defined set a default value for server-side paging
	if(!oDataServerConfig.maxpagesize) {
		oDataServerConfig.maxpagesize = constants.ODATA_MAXPAGESIZE;
	}

	// retrieve odata prefix from path
	var _pathArr = options.path.split('/');
	oDataServerConfig.odataPrefix = _pathArr[1];

	common.setConfig(oDataServerConfig);
	this.oDataGet.setConfig(oDataServerConfig);

	loopbackApplication.use(options.path, function (req, res, next) {
    switch (req.method) {
      case 'GET':
        _handleGet.call(this, req, res);
        break;
      case 'POST':
        _handlePost.call(this, req, res);
        break;
      // PUT is used to update an entity and to overwrite all property values with its default
      // values if they are not submitted with the request. In other words it resets an entity and
      // only sets the submitted properties
      case 'PUT':
        _handlePut.call(this, req, res);
        break;
      // PATCH should be the preferred method to update an entity
      case 'PATCH':
        _handlePATCH.call(this, req, res);
        break;
      // MERGE is used in OData V2.0 to update an entity. This has been changed in
      // in V4.0 to PATCH
      case 'MERGE':
        _handlePATCH.call(this, req, res);
        break;
      case 'DELETE':
        _handleDelete.call(this, req, res);
        break;
      default:
        res.sendStatus(404);
        break;
    }
  });
};

/**
 * handles the GET request to the OData server
 * e.g. http://0.0.0.0:3000/odata/people
 * Here `people` is the pluralModelName of the Model to search
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _handleGet(req, res) {
	// delegate to get module
	this.oDataGet.handleGet(req, res);
}


/**
 * handles the POST request to the OData server.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _handlePost(req, res) {
	// delegate to post module
	this.oDataPost.handlePost(req, res);
}

/**
 * handles the PUT request to the OData server. The PUT request is used to update an entity where
 * only the submitted properties are set. All other properties are reset to their default values.
 * Be aware that this could lead to data loss. If you only want to change the submitted properties
 * and keep all other properties values use PATCH or MERGE (only OData V2.0).
 * @param req
 * @param res
 * @private
 */
function _handlePut(req, res) {
	// delegate to put module
	this.oDataPut.handlePut(req, res);
}

/**
 * handles the PATCH request to the OData server. The PATCH request is used to update an entity where
 * only the submitted properties are set. The other properties of the entity will not be changed.
 * @param req
 * @param res
 * @private
 */
function _handlePATCH(req, res) {
	// delegate to put module
	this.oDataPut.handlePatch(req, res);
}


/**
 * handles the DELETE request of the OData server
 * @param req
 * @param res
 * @private
 */
function _handleDelete(req, res) {
	// delegate to delete module
	this.oDataDelete.handleDelete(req, res);
}



