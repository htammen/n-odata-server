/**
 * This module implements the odata server functionality
 * At the moment it is implemented as local loopback component
 * See here for more details on creating and registering loopback components
 * https://docs.strongloop.com/display/public/LB/Creating+components
 *
 */

/**
 * Type of GET-request that was sent by the client
 * @type {Object}
 */
var GetRequestTypeEnum = {
  SERVICE: 0,
  COLLECTION: 1,
  ENTITY: 2,
  UNDEFINED: 999
};


module.exports = function (loopbackApplication, options) {
  loopbackApplication.use(options.path, function (req, res, next) {
    switch (req.method) {
      case 'GET':
        _handleGet(req, res);
        break;
      case 'POST':
        _handlePost(req, res);
        break;
      // PUT is used to update an entity and to overwrite all property values with its default
      // values if they are not submitted with the request. In other words it resets an entity and
      // only sets the submitted properties
      case 'PUT':
        _handlePut(req, res);
        break;
      // PATCH should be the preferred method to update an entity
      case 'PATCH':
        _handlePATCH(req, res);
        break;
      // MERGE is used in OData V2.0 to update an entity. This has been changed in
      // in V4.0 to PATCH
      case 'MERGE':
        _handlePATCH(req, res);
        break;
      case 'DELETE':
        _handleDelete(req, res);
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
    var reqType = _getRequestType(req);
    switch (reqType) {
      case GetRequestTypeEnum.SERVICE:
        _getServiceDocument(req, res);
        break;
      case GetRequestTypeEnum.COLLECTION:
        _getCollectionData(req, res);
        break;
      case GetRequestTypeEnum.ENTITY:
        _getEntityData(req, res);
        break;
      default:
        res.sendStatus(404);
    }
  }

  /**
   * Returns the base URL for the service that consists of
   * <protocol>://<host>:<port>
   * E.g.: http://127.0.0.1:3000
   * @param req
   * @returns {string} URL
   * @private
   */
  function _getBaseURL(req) {
    return req.protocol + '://' + req.hostname +
      ':' + req.app.get('port');
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
    models.forEach(function(model) {
      var modelObj = {};
      var plural = _getPluralForModel(model);
      modelObj.name = plural;
      modelObj.url = plural;
      json.push(modelObj);
    });

    var result = {};
    //TODO: The port is not available via the request. How can we get it?
    result['@odata.context'] = _getBaseURL(req) + '/odata/$metadata';
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
    var ModelClass = _getModelClass(req.app, req.params[0]);
    if(ModelClass) {
      ModelClass.find(function(err, data) {
        var result = {};
        result.value = data;
        res.send(result);
      });
    } else {
      res.sendStatus(404);
    }
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
    var id = param0.substring(param0.indexOf('(') +2, param0.indexOf(')')-1);
    var collection = param0.substr(0, param0.indexOf('('));
    var ModelClass = _getModelClass(req.app, param0);
    if(ModelClass) {
      ModelClass.findById(id, function(err, instance) {
        var result = instance.toJSON();
        result['@odata.context'] = _getBaseURL(req) + '/odata/$metadata#' + collection + '/$entity';
        res.send(result);
      });
    } else {
      res.sendStatus(404);
    }
  }

  /**
   * Retrieve the odata-type of the request. That means for a GET-request
   * if it's a
   * Service Document
   * Collection of Entities
   * Entity
   * Singleton
   * Collection of Derived Entities
   * Derived Entity
   * Collection of Entity References
   * Entity Reference
   * Property Value                 | http://host/service/Customers(1)/Addresses
   * Collection of Complex or Primitive Types
   * 																| http://host/service/TopFiveHobbies()
   * Complex or Primitive Typ       | http://host/service/MostPopularName()
   * Operation Result               | http://host/service/TopFiveCustomers{}
   *
   * @param  {[type]} req [description]
   * @return {[type]}     [description]
   */
  function _getRequestType(req) {
    var retValue = GetRequestTypeEnum.UNDEFINED;
    if(req.params[0] === '')
      retValue = GetRequestTypeEnum.SERVICE;
    else {
      if(_isRequestCollection(req)) {
        retValue = GetRequestTypeEnum.COLLECTION;
      } else if(_isRequestEntity(req)) {
        retValue = GetRequestTypeEnum.ENTITY;
      } else {

      }
    }
    return retValue;
  }


  /**
   * Determines if the given request is a request for a collection.
   * At the moment this function traverses all models and checks it the
   * request reflects the plural property of the model. If so, the request is
   * considered a ColleectionRequest
   * @param req
   * @private
   */
  function _isRequestCollection(req) {
    var retValue = false;
    var reqParam = req.params[0];

    var models = req.app.models();
    models.forEach(function(model) {
      var plural = _getPluralForModel(model);
      if(plural === reqParam) {
        retValue = true;
      }
    });
    return retValue;
  }

  /**
   * Determines if the given request is a request for a single entity object
   * @param req
   * @private
   */
  function _isRequestEntity(req) {
    var retValue = false;
    var param0 = req.params[0];
    if( param0.indexOf('(') !== -1) {
      retValue = true;
    }
    return retValue;
  }

  /**
   * Retrieves the plural for the given model. This is either retrieved
   * from the settings.plural of the model or if not defined an 's' is appended
   * to the model name
   * @param model
   * @returns {string}
   * @private
   */
  function _getPluralForModel(model) {
    var plural = model.definition.settings.plural;
    if (!plural) {
      plural = model.definition.name + 's';
    }
    return plural;
  }

  /**
   * handles the POST request to the OData server.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  function _handlePost(req, res) {
    var ModelClass = _getModelClass(req.app, req.params[0]);

    if(ModelClass) {
      var readLocation = _getBaseURL(req) + '/odata/' + ModelClass.definition.settings.plural;
      ModelClass.create(req.body, function(err, obj) {
        if(err || obj === null) {
          res.sendStatus(500);
        } else {
          // set location header to update or read URL
          res.location(readLocation + '(\'' + obj.id + '\')');
          // status must be 201
          res.sendStatus(201);
        }
      });
    } else {
      res.sendStatus(404);
    }
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
    var ModelClass = _getModelClass(req.app, req.params[0]);

    if(ModelClass) {
      var id = _getIdFromUrlParameter(req.params[0]);
      var reqObj = req.body;
      // create an object that is saved to the db and set all properties from request body
      // If not defined there set default value or undefined if no default has been defined
      var updateObj = {};
      ModelClass.forEachProperty(function(propName, property) {
        if(reqObj[propName]) {
          updateObj[propName] = reqObj[propName];
        } else {
          updateObj[propName] = property.default;
        }
      });

      var idName = ModelClass.getIdName();
      var whereObj = {};
      whereObj[idName] = id;
      // Here we use the static method updataAll. We could also have been read the entity
      // and updated it with update
      ModelClass.updateAll(whereObj, updateObj, function(err, results) {
        if(err || results.count === 0) {
          res.sendStatus(500);
        } else {
          res.sendStatus(204);
        }
      });
    } else {
      res.sendStatus(404);
    }
  }

/**
 * handles the PATCH request to the OData server. The PATCH request is used to update an entity where
 * only the submitted properties are set. The other properties of the entity will not be changed.
 * @param req
 * @param res
 * @private
 */
function _handlePATCH(req, res) {
  var ModelClass = _getModelClass(req.app, req.params[0]);

  if(ModelClass) {
    var id = _getIdFromUrlParameter(req.params[0]);
    var reqObj = req.body;
    // create an object that is saved to the db and set all properties from request body
    // If not defined there set default value or undefined if no default has been defined
    var updateObj = {};
    ModelClass.forEachProperty(function(propName, property) {
      if(reqObj[propName]) {
        updateObj[propName] = reqObj[propName];
      }
    });

    var idName = ModelClass.getIdName();
    var whereObj = {};
    whereObj[idName] = id;
    // Here we use the static method updataAll. We could also have been read the entity
    // and updated it with update
    ModelClass.updateAll(whereObj, updateObj, function(err, results) {
      if(err || results.count === 0) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  } else {
    res.sendStatus(404);
  }
}

  /**
   * Returns the id that was transmitted via the URL, e.g. People('1').
   * In this case it extracts 1 as id.
   * @param param0
   * @returns {string}
   * @private
   */
  function _getIdFromUrlParameter(param0) {
    return param0.substring(param0.indexOf('(') + 2, param0.indexOf(')') - 1);
  }

  /**
   * handles the DELETE request of the OData server
   * @param req
   * @param res
   * @private
   */
  function _handleDelete(req, res) {
    var param0 = req.params[0];
    // extract the id from the request
    var id = _getIdFromUrlParameter(param0);
    var ModelClass = _getModelClass(req.app, param0);
    if(ModelClass) {
      ModelClass.destroyById(id, function(err) {
        if(!err) {
          res.sendStatus(204);
        } else {
          res.sendStatus(500);
        }
      });
    } else {
      res.sendStatus(404);
    }
  }

  /**
   * get the Model for a className. The className must be equal to
   * the pluralModelName of the Model itself.
   * @param  {[type]} app            [description]
   * @param  {[type]} className      The name of the class
   * @return {[type]}                [description]
   */
  function _getModelClass(app, className) {
    var ModelClass;

    if(className.indexOf('(') !== -1) {
      // its a request for a single entity object
      className = className.substr(0, className.indexOf('('));
    } else {
      // Try to get the singular class first
      ModelClass = app.models[className];
    }

    // Now try to get the class by it's plural definition
    // In this case its a collection
    if(!ModelClass) {
      var models = app.models();
      models.forEach(function(model) {
        if(model.definition.settings.plural === className) {
          ModelClass = model;
          return;
        } else {
          var plural = model.definition.name + 's';
          if(plural === className) {
            ModelClass = model;
            return;
          }
        }
      });
    }

    return ModelClass;
  }


