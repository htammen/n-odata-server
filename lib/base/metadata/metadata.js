/// <reference path="../../../typescript/declarations/node.d.ts" />
/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var metaAssociation_1 = require("./metaAssociation");
var builder = require('xmlbuilder');
/**
 * This class handles the meatdata of the OData service
 */
var Metadata = (function () {
    function Metadata(app) {
        this._app = app;
        this._associations = [];
    }
    ;
    /**
     * This function builds the metadata output for the current application
     * @param models
     * @returns {any}
     */
    Metadata.prototype.buildMetadata = function () {
        var EntityType = [];
        var EntitySet = [];
        var appModels = this._app.models(); // have to do this because models will not be known in forEach
        this._app.models().forEach((function (model) {
            var entityTypeObj = {
                "@Name": model.definition.name
            };
            // Properties of EntityType
            var arrProps = [];
            model.definition.columnNames().forEach((function (propName) {
                var property = model.definition.properties[propName];
                // exclude deprecated properties
                if (property.deprecated !== true) {
                    var edmType = this._convertType(property);
                    edmType = edmType || property.type.name;
                    arrProps.push({ "@Name": propName, "@Type": edmType });
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
            // NavigationProperties of EntityType
            var arrNavProps = [];
            for (var relation in model.definition.settings.relations) {
                var currentAssoc = metaAssociation_1.MetaAssociation.findOrCreateAssociationForModelRelation(model.definition, model.definition.settings.relations[relation], relation, appModels, this._associations);
                var navProperty = {
                    "@Name": relation,
                    "@Relationship": constants.ODATA_NAMESPACE + "." + currentAssoc.getName()
                };
                navProperty["@FromRole"] = (currentAssoc ? currentAssoc.getRolename1() : "N.A.");
                navProperty["@ToRole"] = (currentAssoc ? currentAssoc.getRolename2() : "N.A.");
                arrNavProps.push(navProperty);
            }
            entityTypeObj.NavigationProperty = arrNavProps;
            EntityType.push(entityTypeObj);
            // Create EntitySet for EntityType
            var entitySetObj = {
                "@Name": commons.getPluralForModel(model),
                "@EntityType": constants.ODATA_NAMESPACE + '.' + model.definition.name
            };
            EntitySet.push(entitySetObj);
        }).bind(this));
        //TODO: create metadata for complexTypes
        //for (var typeKey in model.complexTypes) {
        //	var complexType = {
        //		"ComplexType": {
        //			"@Name": typeKey,
        //			"#list": []
        //		}
        //	};
        //
        //	for (var propKey in model.complexTypes[typeKey]) {
        //		var property = model.complexTypes[typeKey][propKey];
        //
        //		complexType.ComplexType["#list"].push({
        //			"Property": {"@Name": propKey, "@Type": property.type}
        //		});
        //	}
        //
        //	schemas.push(complexType);
        //}
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
                                "@m.DataServiceVersion": "2.0",
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
                    resolve(xmlBuilder);
                });
            });
        });
    };
    ;
    /**
     * converts a loopback datatype into a OData datatype
     * @param property, loopback property
     * @private
     */
    Metadata.prototype._convertType = function (property) {
        var retValue;
        var dbType = property.type.name;
        switch (dbType) {
            case "String":
                retValue = "Edm.String";
                break;
            case "Date":
                retValue = "Edm.DateTime";
                break;
            case "Number":
                if (property.id) {
                    retValue = "Edm.Int32";
                }
                else {
                    retValue = "Edm.Decimal";
                }
                break;
            case "Boolean":
                retValue = "Edm.Boolean";
                break;
            default:
                break;
        }
        return retValue;
    };
    return Metadata;
})();
exports.Metadata = Metadata;
//# sourceMappingURL=metadata.js.map