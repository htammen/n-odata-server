var enums = require('../constants/odata_enums');
var oDataServerConfig;
function _setConfig(config) {
    oDataServerConfig = config;
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
        ':' + req.app.get('port') + '/' + oDataServerConfig.odataPrefix;
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
    var retValue = enums.GetRequestTypeEnum.UNDEFINED;
    var param0 = new String(req.params[0]);
    if (req.params[0] === '')
        retValue = enums.GetRequestTypeEnum.SERVICE;
    else {
        if (_isRequestCollection(req)) {
            retValue = enums.GetRequestTypeEnum.COLLECTION;
        }
        else if (_isRequestEntity(req)) {
            retValue = enums.GetRequestTypeEnum.ENTITY;
        }
        else if (param0.toUpperCase() === "$METADATA") {
            retValue = enums.GetRequestTypeEnum.METADATA;
        }
        else {
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
    models.forEach(function (model) {
        var plural = _getPluralForModel(model);
        if (plural === reqParam) {
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
    if (param0.indexOf('(') !== -1) {
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
 * Returns the id that was transmitted via the URL, e.g. People('1').
 * In this case it extracts 1 as id. Cause a numeric id is translated into EDM.DECIMAL OData clients
 * often format the value according to the OData formatting rules. In that case the client submits
 * People('1M'). So we have to cut the M to find the record in the database.
 * @param param0
 * @returns {string}
 * @private
 */
function _getIdFromUrlParameter(param0) {
    var retValue = param0.substring(param0.indexOf('(') + 1, param0.indexOf(')'));
    if (retValue.startsWith("'") || retValue.startsWith("\"")) {
        retValue = retValue.substring(1, retValue.length - 1);
    }
    if (retValue.endsWith('M')) {
        retValue = retValue.substr(0, retValue.length - 1);
    }
    return retValue;
}
/**
 * get the Model for a className. The className must be equal to
 * the pluralModelName of the Model itself.
 * @param  {[type]} app            [description]
 * @param  {[type]} className      The name of the class
 * @return {[type]}                [description]
 */
function _getModelClass(app, className) {
    return new Promise(function (resolve, reject) {
        var ModelClass;
        if (className.indexOf('(') !== -1) {
            // its a request for a single entity object
            className = className.substr(0, className.indexOf('('));
        }
        else {
            // Try to get the singular class first
            ModelClass = app.models[className];
        }
        // Now try to get the class by it's plural definition
        // In this case its a collection
        if (!ModelClass) {
            var models = app.models();
            models.forEach(function (model) {
                if (model.definition.settings.plural === className) {
                    ModelClass = model;
                    return; // return from forEach
                }
                else {
                    var plural = model.definition.name + 's';
                    if (plural === className) {
                        ModelClass = model;
                        return; // return from forEach
                    }
                }
            });
        }
        resolve(ModelClass);
    });
}
module.exports = {
    setConfig: _setConfig,
    getBaseURL: _getBaseURL,
    getRequestType: _getRequestType,
    getIdFromUrlParameter: _getIdFromUrlParameter,
    getPluralForModel: _getPluralForModel,
    getModelClass: _getModelClass
};
//# sourceMappingURL=odata_common.js.map