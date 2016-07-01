var enums = require('../constants/odata_enums');
var lbConstants = require('../constants/loopback_constants');
var metadata_1 = require("../base/metadata/metadata");
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
    var reqParts = /^([^/(]+)(?:[(](.*)[)])?(?:[/]([A-Za-z]+))?/g.exec(req.params[0]);
    var models = req.app.models();
    models.forEach(function (model) {
        var plural = _getPluralForModel(model);
        if (plural === reqParts[1]) {
            if (reqParts[2] && reqParts[3]) {
                var modelRel = model.definition.settings.relations;
                if (modelRel && modelRel[reqParts[3]] && modelRel[reqParts[3]].type === lbConstants.LB_REL_HASMANY) {
                    retValue = true;
                }
                else {
                }
            }
            else if (!reqParts[2]) {
                retValue = true;
            }
            else {
            }
        }
    });
    return retValue;
}
function _isRequestEntity(req) {
    var retValue = false;
    var reqParts = /^([^/(]+)(?:[(](.*)[)])?(?:[/]([A-Za-z]+))?/g.exec(req.params[0]);
    var models = req.app.models();
    models.forEach(function (model) {
        var plural = _getPluralForModel(model);
        if (plural === reqParts[1]) {
            if (reqParts[2] && reqParts[3]) {
                var modelRel = model.definition.settings.relations;
                if (modelRel && modelRel[reqParts[3]] && (modelRel[reqParts[3]].type === lbConstants.LB_REL_BELONGSTO || modelRel[reqParts[3]].type === lbConstants.LB_REL_HASONE)) {
                    retValue = true;
                }
                else {
                }
            }
            else if (reqParts[2]) {
                retValue = true;
            }
            else {
            }
        }
    });
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
    console.log("'_getIdFromUrlParameter' is DEPRECATED! Please use '_getIdByPropertyType' instead.");
    var retValue = param0.substring(param0.indexOf('(') + 1, param0.indexOf(')'));
    if (retValue.startsWith("'") || retValue.startsWith("\"")) {
        retValue = retValue.substring(1, retValue.length - 1);
    }
    if (retValue.endsWith('M')) {
        retValue = retValue.substr(0, retValue.length - 1);
    }
    return retValue;
}
function _getIdByPropertyType(sRawId, property) {
    var id;
    switch (metadata_1.Metadata.prototype._convertType(property)) {
        case "Edm.String":
            id = (/^['](.*)[']$/g.exec(sRawId) || [undefined, undefined])[1];
            break;
        case "Edm.Decimal":
            id = /^[0-9]+.[0-9]+/g.exec(sRawId)[0];
            break;
        default:
            if (property.generated === true) {
                if (sRawId.charAt(0) === "'") {
                    id = (/^['](.*)[']$/g.exec(sRawId) || [undefined, undefined])[1];
                }
            }
            else {
                id = sRawId;
            }
            break;
    }
    return id;
}
function _getRequestModelClass(models, requestUri) {
    var reqParts = /^([^/(]+)(?:[(](.*)[)])?(?:[/]([A-Za-z]+))?/g.exec(requestUri);
    if (!reqParts[3]) {
        return new Promise(function (resolve, reject) {
            _getModelClass(models, reqParts[1]).then(function (ModelClass) {
                var sRequestId = _getIdByPropertyType(reqParts[2], ModelClass.definition._ids[0].property);
                resolve({ modelClass: ModelClass, foreignKeyFilter: undefined, requestId: sRequestId });
            });
        });
    }
    else {
        return new Promise(function (resolve, reject) {
            _getModelClass(models, reqParts[1]).then(function (BaseModelClass) {
                var modelProps = BaseModelClass.definition.properties;
                var modelRel = BaseModelClass.settings.relations;
                if (modelRel && modelRel[reqParts[3]]) {
                    var oFilter = {}, sForeignKey = modelRel[reqParts[3]].foreignKey;
                    if (sForeignKey == "") {
                        sForeignKey = reqParts[3] + "Id";
                    }
                    var sRequestId = _getIdByPropertyType(reqParts[2], BaseModelClass.definition._ids[0].property);
                    switch (modelRel[reqParts[3]].type) {
                        case lbConstants.LB_REL_HASMANY:
                            oFilter[sForeignKey] = sRequestId;
                            if (!oFilter[sForeignKey]) {
                                reject("Invalid id");
                            }
                            else {
                                _getModelClass(models, modelRel[reqParts[3]].model).then(function (ModelClass) {
                                    resolve({ modelClass: ModelClass, foreignKeyFilter: oFilter, requestId: sRequestId });
                                });
                            }
                            break;
                        case lbConstants.LB_REL_BELONGSTO:
                            BaseModelClass.findById(sRequestId, function (error, instance) {
                                if (instance) {
                                    oFilter["_id"] = instance[sForeignKey];
                                    _getModelClass(models, modelRel[reqParts[3]].model).then(function (ModelClass) {
                                        resolve({ modelClass: ModelClass, foreignKeyFilter: oFilter, requestId: sRequestId });
                                    });
                                }
                                else {
                                    reject("Entity not found!");
                                }
                            });
                            break;
                    }
                }
                else {
                    resolve(BaseModelClass);
                }
            });
        });
    }
}
function _getModelClass(models, className) {
    return new Promise(function (resolve, reject) {
        var ModelClass;
        if (className.indexOf('(') !== -1) {
            className = className.substr(0, className.indexOf('('));
        }
        else {
            ModelClass = models[className];
        }
        if (!ModelClass) {
            for (var modelStr in models) {
                var model = models[modelStr];
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
    getModelClass: _getModelClass,
    getRequestModelClass: _getRequestModelClass,
    getIdByPropertyType: _getIdByPropertyType
};
//# sourceMappingURL=odata_common.js.map
