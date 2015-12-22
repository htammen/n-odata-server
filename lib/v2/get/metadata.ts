/// <reference path="../../../typescript/declarations/node.d.ts" />
/// <reference path="../../../typescript/declarations/es6-promise.d.ts" />
import commons = require('../../common/odata_common');
import constants = require('../../constants/odata_constants');

var builder = require('xmlbuilder');

export function getMetaData(models) {
	return buildMetadata(models);
}

function buildMetadata(models) {
	var EntityType = [];
	var EntitySet = [];

	models.forEach(function (model) {

			var entityTypeObj: any = {
					"@Name": model.definition.name
			};

			var arrProps: Array<Object> = [];
			model.definition.columnNames().forEach(function(propName) {
				var property:any = model.definition.properties[propName];

				// exclude deprecated properties
				if (property.deprecated !== true) {
					var edmType:String = _convertType(property.type.name);
					edmType = edmType || property.type.name;
					arrProps.push({"@Name": propName, "@Type": edmType});
				}

				if (property.id) {
					entityTypeObj.Key = {
						PropertyRef: {
							"@Name": propName
						}
					}
				}
			});
			entityTypeObj.Property = arrProps;

			EntityType.push(entityTypeObj)


			// Create EntitySet for EntityType
			var entitySetObj: any = {
				"@Name": commons.getPluralForModel(model),
				"@EntityType": constants.ODATA_NAMESPACE + '.' + model.definition.name
			};
			EntitySet.push(entitySetObj);
		}
	);

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


	return builder.create(
		{"edmx:Edmx": {
			"@xmlns:edmx": "http://schemas.microsoft.com/ado/2007/06/edmx",
			"@xmlns:m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
			"@Version": "1.0",
			"edmx:DataServices": {
				"@m.DataServiceVersion": "2.0",
				"Schema": {
					"@xmlns": "http://schemas.microsoft.com/ado/2008/09/edm",
					"@Namespace": constants.ODATA_NAMESPACE,
					EntityType,
					"EntityContainer": {
						"@Name": constants.ODATA_NAMESPACE,
						"@m:IsDefaultEntityContainer": "true",
						EntitySet
					}
				}
			}
		}
	}, {version: '1.0', encoding: 'UTF-8'}
	).end({pretty: true});
}

/**
 * converts a loopback datatype into a OData datatype
 * @param dbType, loopback datatype
 * @private
 */
function _convertType(dbType): String {
	var retValue: String;
	switch (dbType) {
		case "String":
			retValue = "Edm.String";
			break;

		case "Date":
			retValue = "Edm.DateTime"
			break;

		case "Number":
			retValue = "Edm.Decimal"
			break;

		case "Boolean":
			retValue = "Edm.Boolean"
			break;

		default:
			break;
	}
	return retValue;
}
