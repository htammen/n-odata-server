/**
 * Created by helmut on 25.01.16.
 */
import commons = require('../../common/odata_common');
import constants = require('../../constants/odata_constants');
import lb_constants = require('../../constants/loopback_constants');

enum AssociationMulitplicity {
	ZERO_ONE = <any>'0..1',
	ONE_ONE = <any>'1',
	ONE_MANY = <any>'*',
	MANY = <any>'*'
}

/**
 * private class for holding association information
 */
export class MetaAssociation {
	private _model1:string;
	private _model2:string;
	private _relation1:string;
	private _relation2:string;
	private _multiplicity1: AssociationMulitplicity;
	private _multiplicity2: AssociationMulitplicity;

	get model1():string {
		return this._model1
	};

	get model2():string {
		return this._model2
	};

	get relation1():string {
		return this._relation1
	};

	get relation2():string {
		return this._relation2
	};

	get multiplicity1():AssociationMulitplicity {
		return this._multiplicity1;
	}

	get multiplicity2():AssociationMulitplicity {
		return this._multiplicity2;
	}

	constructor(model1:string, model2:string, rel1:string, rel2:string, multi1: AssociationMulitplicity, multi2: AssociationMulitplicity) {
		this._model1 = model1;
		this._model2 = model2;
		this._relation1 = rel1;
		this._relation2 = rel2;
		this._multiplicity1 = multi1;
		this._multiplicity2 = multi2;
	};

	/**
	 * Static method that creates an Association and adds it to the list of associations if necessary. In each case it
	 * returns the association.
	 * @param model_definition loopback definition of the model that defines the relation
	 * @param relation object that describes the relation of the model_definition to create a name for
	 * @param relationName name of the relation under observation
	 * @param models array of all app models
	 * @param listOfAssociations, the list of Associations the new Association is added to if necessary.
	 * @returns {MetaAssociation} either the existing Association from the listOfAssociations or the newly created Association
	 */
	static findOrCreateAssociationForModelRelation(model_definition:any, relation:any, relationName:string, models:Array<Object>, listOfAssociations:Array<MetaAssociation>): MetaAssociation {
		// retrieve the model object of the relation that is under observation
		var relationModels: Array<any> = models.filter((obj:any) => {
			return obj.definition.name === relation.model
		})
		var relationModel:any = relationModels[0]; // should be only one
		if(relationModel === undefined) { // just in case we don't find anything
			return undefined;
		}

		// Check if there is also a relation back from the target model to the source model
		// and then get the multiplicity
		var foundRel: string,
			multiplicityOfModelInRelation: AssociationMulitplicity,
			multiplicityOfRelationInModel: AssociationMulitplicity;
		for (var rel in relationModel.definition.settings.relations) {
			if (relationModel.definition.settings.relations[rel].model === model_definition.name) {
				foundRel = rel;
				// Multiplicity of multiplicityOfModelInRelation
				multiplicityOfModelInRelation = MetaAssociation._getMultiplicityForRelation(relationModel.definition.settings.relations[rel]);
				break;
			}
		}
		// If no back relation was found we set it to 0..1 to the relation model class. We do this because OData seems to
		// need a two-way relation.
		if(!foundRel) {
			foundRel = relation.model;
			multiplicityOfModelInRelation = AssociationMulitplicity.ZERO_ONE;
		}

		// Multiplicity of multiplicityOfRelationInModel
		multiplicityOfRelationInModel = MetaAssociation._getMultiplicityForRelation(model_definition.settings.relations[relationName]);

		// Create a new Association and add it to the list of Associations if it not already exists in the list
		var assoc:MetaAssociation = new MetaAssociation(model_definition.name, relation.model, relationName, foundRel, multiplicityOfRelationInModel, multiplicityOfModelInRelation);
		var existingAssocs:Array<MetaAssociation> = MetaAssociation.findAssociation(assoc, listOfAssociations);
		if(!existingAssocs || existingAssocs.length === 0) {
			listOfAssociations.push(assoc);
		} else {
			assoc = existingAssocs[0];
		}

		return assoc;
	}

	/**
	 * static method to search for a distinct Association in a list of Associations
	 * @param assoc Association to look for
	 * @param listOfAssocs Array of Associations to look into
	 * @returns {MetaAssociation[]}
	 */
	static findAssociation(assoc: MetaAssociation, listOfAssocs: Array<MetaAssociation>): Array<MetaAssociation> {
		return listOfAssocs.filter( (obj: MetaAssociation) => {
			return obj.equals(assoc);
		})
	};

	/**
	 * static mehtod to search for an Association by name of model1 and name of model2
	 * @param name1
	 * @param name2
	 * @param listOfAssocs
	 * @returns {MetaAssociation[]}
	 */
	static findAssociationByModelnames(name1: string, name2: string, listOfAssocs: Array<MetaAssociation>): Array<MetaAssociation> {
		return listOfAssocs.filter( (obj: MetaAssociation) => {
			return (obj.model1 === name1 && obj.model2 === name2) || (obj.model1 === name2 && obj.model2 === name1);
		})
	};


	/**
	 * Translates the mulitplicity from loopback value to OData value
	 * @param relation
	 * @returns {AssociationMulitplicity}
	 * @private
	 */
	static _getMultiplicityForRelation(relation:any): AssociationMulitplicity {
		var retValue: AssociationMulitplicity;
		switch (relation.type) {
			case lb_constants.LB_REL_BELONGSTO:
				retValue = AssociationMulitplicity.ONE_ONE;
				break;

			case lb_constants.LB_REL_HASMANY:
				retValue = AssociationMulitplicity.MANY;
				break;

			case lb_constants.LB_REL_HASONE:
				retValue = AssociationMulitplicity.ZERO_ONE;
				break;

			default:
				retValue = AssociationMulitplicity.MANY;
				break;
		}
		return retValue;
	}



	/**
	 * Creates the xml-Builder String for Associations
	 * @param listOfAssocs List of Associations for which the xml-Builder object should be created
	 * @returns {*[]} returns an array of promises that resolve to an XML representation of the Association
	 */
	static getAssociationsForXML(listOfAssocs:Array<MetaAssociation>):Array<any> {
		return listOfAssocs.map((obj:MetaAssociation) => {
			return new Promise((resolve, reject) => {
				var xmlObj:any = {"@Name": obj.getName()};
				var ends:Array<any> = [];
				ends.push({
					"@Type": constants.ODATA_NAMESPACE + "." + obj._model1,
					"@Role": obj.getRolename1(),
					"@Multiplicity": obj.multiplicity2 // we exchange the multiplicity here !!
				});
				ends.push({
					"@Type": constants.ODATA_NAMESPACE + "." + obj._model2,
					"@Role": obj.getRolename2(),
					"@Multiplicity": obj.multiplicity1 // we exchange the multiplicity here !!
				});
				xmlObj.End = ends;
				resolve( xmlObj );
			});
		})
	};

	/**
	 * Creates the xml-Builder String for AssociationSets
	 * @param listOfAssocs List of Associations for which the xml-Builder object should be created
	 * @returns {*[]} returns an array of promises that resolve to an XML representation of the Association
	 */
	static getAssociationSetsForXML(listOfAssocs: Array<MetaAssociation>, models: any): Array<any> {
		return listOfAssocs.map( (obj: MetaAssociation) => {
			return new Promise((resolve, reject) => {
				var promiseModel1 = commons.getModelClass(models, obj.model1);
				var promiseModel2 = commons.getModelClass(models, obj.model2);
				Promise.all([promiseModel1, promiseModel2]).then((values:Array<any>) => {
					var xmlObj:any = {
						"@Name": obj.getRolename1() + "_" + obj.model2,
						"@Association": constants.ODATA_NAMESPACE + "." + obj.getName()
					};
					var ends:Array<any> = [];
					ends.push({
						"@Role": obj.getRolename1(),
						"@EntitySet": commons.getPluralForModel(values[0])
					});
					ends.push({
						"@Role": obj.getRolename2(),
						"@EntitySet": commons.getPluralForModel(values[1])
					});
					xmlObj.End = ends;
					resolve( xmlObj );
				})
			});
		});
	};

	/**
	 * Compares the current Association with the one give in parameter otherAssoc
	 * Two Associations are equal if either of the model names and either of the relation names
	 * match.
	 * @param otherAssoc the Association to compare with
	 */
	equals(otherAssoc:MetaAssociation):boolean {
		return (
				this._model1 === otherAssoc.model1 || this._model1 === otherAssoc.model2 ||
				this._model2 === otherAssoc.model1 || this._model2 === otherAssoc.model2
			) && (
				this._relation1 === otherAssoc.relation1 || this._relation1 === otherAssoc.relation2 ||
				this._relation2 === otherAssoc.relation1 || this._relation2 === otherAssoc.relation2
			);
	};

	/**
	 * Returns the name of the association. Using this function it is garanteed that the name is always the same for
	 * a particular Association
	 * @returns {string}
	 */
	getName(): string {
		return this.model1 + "_" + this.relation1 + "_" + this.model2 + "_" + this.relation2;
	}

	/**
	 * Returns the rolename of the first role in the Association
	 * @returns {string}
	 */
	getRolename1(): string {
		return this.model1 + "_" + this.relation1;
	}

	/**
	 * Returns the rolename of the second role in the Association
	 * @returns {string}
	 */
	getRolename2(): string {
		return this.model2 + "_" + this.relation2;
	}

	/**
	 * Returns a rolename for a parent entity type / model
	 * @param parentModel
	 * @returns {string}
     */
	getRolenameFor(parentModel): string {
		if(this.model1 === parentModel) {
			return this.model1 + "_" + this.relation1;
		} else {
			return this.model2 + "_" + this.relation2;
		}
	}
}

