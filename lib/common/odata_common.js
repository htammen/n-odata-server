var enums = require('../constants/odata_enums');
var oDataServerConfig;
function _setConfig(config) {
    oDataServerConfig = config;
}
function _getBaseURL(req) {
    return req.protocol + '://' + req.hostname +
        ':' + req.app.get('port') + '/' + oDataServerConfig.odataPrefix;
}
function _getRequestType(req) {
    var retValue = enums.GetRequestTypeEnum.UNDEFINED;
    var param0 = req.params[0];
    if (req.params[0] === '')
        retValue = enums.GetRequestTypeEnum.SERVICE;
    else {
        var arrParams = param0.split('/');
        if (param0.toUpperCase() === "$METADATA") {
            retValue = enums.GetRequestTypeEnum.METADATA;
        }
        else if (arrParams[arrParams.length - 1] === '$count') {
            retValue = enums.GetRequestTypeEnum.COLLECTION_COUNT;
        }
        else if (_isRequestCollection(req)) {
            retValue = enums.GetRequestTypeEnum.COLLECTION;
        }
        else if (_isRequestEntity(req)) {
            retValue = enums.GetRequestTypeEnum.ENTITY;
        }
        else {
        }
    }
    return retValue;
}
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
function _isRequestEntity(req) {
    var retValue = false;
    var param0 = req.params[0];
    if (param0.indexOf('(') !== -1) {
        retValue = true;
    }
    return retValue;
}
function _getPluralForModel(model) {
    var plural = model.definition.settings.plural;
    if (!plural) {
        plural = model.definition.name + 's';
    }
    return plural;
}
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
function _getModelClass(app, className) {
    return new Promise(function (resolve, reject) {
        var ModelClass;
        if (className.indexOf('(') !== -1) {
            className = className.substr(0, className.indexOf('('));
        }
        else {
            ModelClass = app.models[className];
        }
        if (!ModelClass) {
            var models = app.models();
            for (var i = 0; i < models.length; i++) {
                var model = models[i];
                if (model.definition.settings.plural === className) {
                    ModelClass = model;
                    break;
                }
                else {
                    var plural = model.definition.name + 's';
                    if (plural === className) {
                        ModelClass = model;
                        break;
                    }
                }
            }
            ;
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