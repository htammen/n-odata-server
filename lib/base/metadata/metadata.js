"use strict";
var log4js = require('log4js');
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var metaAssociation_1 = require("./metaAssociation");
var builder = require("xmlbuilder");
var odata_enums_1 = require("../../constants/odata_enums");
var logger = log4js.getLogger('metadata');
var Metadata = (function () {
    function Metadata(app) {
        this._app = app;
        this._associations = [];
    }
    ;
    Metadata.prototype.buildMetadata = function () {
        logger.trace("entering buildMetadata");
        var EntityType = [];
        var EntitySet = [];
        var appModels = this._app.models();
        this._app.models().forEach((function (model) {
            var entityTypeObj = {
                "@Name": model.definition.name
            };
            var arrProps = [];
            model.definition.columnNames().forEach((function (propName) {
                var property = model.definition.properties[propName];
                if (property.deprecated !== true) {
                    var edmType = commons.convertType(property);
                    var edmTypeStr = odata_enums_1.ODataType.getEdmString(edmType);
                    edmTypeStr = edmTypeStr || property.type.name;
                    arrProps.push({ "@Name": propName, "@Type": edmTypeStr });
                }
                if (property.id) {
                    entityTypeObj.Key = {
                        PropertyRef: {
                            "@Name": propName
                        }
                    };
                }
            }).bind(this));
            entityTypeObj.Property = arrProps;
            var arrNavProps = [];
            for (var relation in model.definition.settings.relations) {
                var currentAssoc = metaAssociation_1.MetaAssociation.findOrCreateAssociationForModelRelation(model.definition, model.definition.settings.relations[relation], relation, appModels, this._associations);
                var navProperty = {
                    "@Name": relation,
                    "@Relationship": constants.ODATA_NAMESPACE + "." + currentAssoc.getName()
                };
                navProperty["@FromRole"] = (currentAssoc ? currentAssoc.getRolenameFor(model.definition.name) : "N.A.");
                navProperty["@ToRole"] = (currentAssoc ? currentAssoc.getRolenameFor(model.definition.settings.relations[relation].model) : "N.A.");
                arrNavProps.push(navProperty);
            }
            if (arrNavProps.length > 0) {
                entityTypeObj.NavigationProperty = arrNavProps;
            }
            EntityType.push(entityTypeObj);
            var entitySetObj = {
                "@Name": commons.getPluralForModel(model),
                "@EntityType": constants.ODATA_NAMESPACE + '.' + model.definition.name
            };
            EntitySet.push(entitySetObj);
        }).bind(this));
        var associationPromises = metaAssociation_1.MetaAssociation.getAssociationsForXML(this._associations);
        var associationSetPromises = metaAssociation_1.MetaAssociation.getAssociationSetsForXML(this._associations, this._app.models);
        return new Promise(function (resolve, reject) {
            Promise.all(associationPromises)
                .then(function (associationPromises) {
                var Association = [];
                for (var i = 0; i < associationPromises.length; i++) {
                    Association.push(associationPromises[i]);
                }
                return Association;
            }).then(function (Associations) {
                Promise.all(associationSetPromises).then(function (associationSetPromises) {
                    var AssociationSet = [];
                    for (var i = 0; i < associationSetPromises.length; i++) {
                        AssociationSet.push(associationSetPromises[i]);
                    }
                    return { Assoc: Associations, AssocSet: AssociationSet };
                }).then(function (obj) {
                    var Association = obj.Assoc;
                    var AssociationSet = obj.AssocSet;
                    var xmlBuilder = builder.create({
                        "edmx:Edmx": {
                            "@xmlns:edmx": "http://schemas.microsoft.com/ado/2007/06/edmx",
                            "@xmlns:m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
                            "@Version": "1.0",
                            "edmx:DataServices": {
                                "@m:DataServiceVersion": "2.0",
                                "Schema": {
                                    "@xmlns": "http://schemas.microsoft.com/ado/2008/09/edm",
                                    "@Namespace": constants.ODATA_NAMESPACE,
                                    EntityType: EntityType,
                                    Association: Association,
                                    "EntityContainer": {
                                        "@Name": constants.ODATA_NAMESPACE,
                                        "@m:IsDefaultEntityContainer": "true",
                                        EntitySet: EntitySet,
                                        AssociationSet: AssociationSet
                                    }
                                }
                            }
                        }
                    }, { version: '1.0', encoding: 'UTF-8' }).end({ pretty: true });
                    logger.trace('metadata xml build');
                    resolve(xmlBuilder);
                });
            });
        });
    };
    ;
    return Metadata;
}());
exports.Metadata = Metadata;
//# sourceMappingURL=metadata.js.map