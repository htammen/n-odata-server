/// <reference path="../../../typescript/declarations/node.d.ts" />
/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var builder = require('xmlbuilder');
function getMetaData(models) {
    return buildMetadata(models);
}
exports.getMetaData = getMetaData;
function buildMetadata(models) {
    var EntityType = [];
    var EntitySet = [];
    models.forEach(function (model) {
        var entityTypeObj = {
            "@Name": model.definition.name
        };
        var arrProps = [];
        model.definition.columnNames().forEach(function (propName) {
            var property = model.definition.properties[propName];
            if (property.deprecated !== true) {
                var edmType = _convertType(property);
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
        });
        entityTypeObj.Property = arrProps;
        EntityType.push(entityTypeObj);
        var entitySetObj = {
            "@Name": commons.getPluralForModel(model),
            "@EntityType": constants.ODATA_NAMESPACE + '.' + model.definition.name
        };
        EntitySet.push(entitySetObj);
    });
    return builder.create({ "edmx:Edmx": {
            "@xmlns:edmx": "http://schemas.microsoft.com/ado/2007/06/edmx",
            "@xmlns:m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
            "@Version": "1.0",
            "edmx:DataServices": {
                "@m.DataServiceVersion": "2.0",
                "Schema": {
                    "@xmlns": "http://schemas.microsoft.com/ado/2008/09/edm",
                    "@Namespace": constants.ODATA_NAMESPACE,
                    EntityType: EntityType,
                    "EntityContainer": {
                        "@Name": constants.ODATA_NAMESPACE,
                        "@m:IsDefaultEntityContainer": "true",
                        EntitySet: EntitySet
                    }
                }
            }
        }
    }, { version: '1.0', encoding: 'UTF-8' }).end({ pretty: true });
}
function _convertType(property) {
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
}
//# sourceMappingURL=metadata.js.map