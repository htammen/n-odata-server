/**
 * Created by helmut on 25.01.16.
 */
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var lb_constants = require('../../constants/loopback_constants');
var AssociationMulitplicity;
(function (AssociationMulitplicity) {
    AssociationMulitplicity[AssociationMulitplicity["ZERO_ONE"] = '0..1'] = "ZERO_ONE";
    AssociationMulitplicity[AssociationMulitplicity["ONE_ONE"] = '1..1'] = "ONE_ONE";
    AssociationMulitplicity[AssociationMulitplicity["ONE_MANY"] = '1..*'] = "ONE_MANY";
    AssociationMulitplicity[AssociationMulitplicity["MANY"] = '*'] = "MANY";
})(AssociationMulitplicity || (AssociationMulitplicity = {}));
/**
 * private class for holding association information
 */
var MetaAssociation = (function () {
    function MetaAssociation(model1, model2, rel1, rel2, multi1, multi2) {
        this._model1 = model1;
        this._model2 = model2;
        this._relation1 = rel1;
        this._relation2 = rel2;
        this._multiplicity1 = multi1;
        this._multiplicity2 = multi2;
    }
    Object.defineProperty(MetaAssociation.prototype, "model1", {
        get: function () {
            return this._model1;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MetaAssociation.prototype, "model2", {
        get: function () {
            return this._model2;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MetaAssociation.prototype, "relation1", {
        get: function () {
            return this._relation1;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MetaAssociation.prototype, "relation2", {
        get: function () {
            return this._relation2;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MetaAssociation.prototype, "multiplicity1", {
        get: function () {
            return this._multiplicity1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MetaAssociation.prototype, "multiplicity2", {
        get: function () {
            return this._multiplicity2;
        },
        enumerable: true,
        configurable: true
    });
    ;
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
    MetaAssociation.findOrCreateAssociationForModelRelation = function (model_definition, relation, relationName, models, listOfAssociations) {
        // retrieve the model object of the relation that is under observation
        var relationModels = models.filter(function (obj) {
            return obj.definition.name === relation.model;
        });
        var relationModel = relationModels[0]; // should be only one
        if (relationModel === undefined) {
            return undefined;
        }
        // Check if there is also a relation back from the target model to the source model
        // and then get the multiplicity
        var foundRel, multiplicityOfModelInRelation, multiplicityOfRelationInModel;
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
        if (!foundRel) {
            foundRel = relation.model;
            multiplicityOfModelInRelation = AssociationMulitplicity.ZERO_ONE;
        }
        // Multiplicity of multiplicityOfRelationInModel
        multiplicityOfRelationInModel = MetaAssociation._getMultiplicityForRelation(model_definition.settings.relations[relationName]);
        // Create a new Association and add it to the list of Associations if it not already exists in the list
        var assoc = new MetaAssociation(model_definition.name, relation.model, relationName, foundRel, multiplicityOfRelationInModel, multiplicityOfModelInRelation);
        var existingAssocs = MetaAssociation.findAssociation(assoc, listOfAssociations);
        if (!existingAssocs || existingAssocs.length === 0) {
            listOfAssociations.push(assoc);
        }
        else {
            assoc = existingAssocs[0];
        }
        return assoc;
    };
    /**
     * static method to search for a distinct Association in a list of Associations
     * @param assoc Association to look for
     * @param listOfAssocs Array of Associations to look into
     * @returns {MetaAssociation[]}
     */
    MetaAssociation.findAssociation = function (assoc, listOfAssocs) {
        return listOfAssocs.filter(function (obj) {
            return obj.equals(assoc);
        });
    };
    ;
    /**
     * static mehtod to search for an Association by name of model1 and name of model2
     * @param name1
     * @param name2
     * @param listOfAssocs
     * @returns {MetaAssociation[]}
     */
    MetaAssociation.findAssociationByModelnames = function (name1, name2, listOfAssocs) {
        return listOfAssocs.filter(function (obj) {
            return (obj.model1 === name1 && obj.model2 === name2) || (obj.model1 === name2 && obj.model2 === name1);
        });
    };
    ;
    /**
     * Translates the mulitplicity from loopback value to OData value
     * @param relation
     * @returns {AssociationMulitplicity}
     * @private
     */
    MetaAssociation._getMultiplicityForRelation = function (relation) {
        var retValue;
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
    };
    /**
     * Creates the xml-Builder String for Associations
     * @param listOfAssocs List of Associations for which the xml-Builder object should be created
     * @returns {*[]} returns an array of promises that resolve to an XML representation of the Association
     */
    MetaAssociation.getAssociationsForXML = function (listOfAssocs) {
        return listOfAssocs.map(function (obj) {
            return new Promise(function (resolve, reject) {
                var xmlObj = { "@Name": obj.getName() };
                var ends = [];
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
                resolve(xmlObj);
            });
        });
    };
    ;
    /**
     * Creates the xml-Builder String for AssociationSets
     * @param listOfAssocs List of Associations for which the xml-Builder object should be created
     * @returns {*[]} returns an array of promises that resolve to an XML representation of the Association
     */
    MetaAssociation.getAssociationSetsForXML = function (listOfAssocs, models) {
        return listOfAssocs.map(function (obj) {
            return new Promise(function (resolve, reject) {
                var promiseModel1 = commons.getModelClass(models, obj.model1);
                var promiseModel2 = commons.getModelClass(models, obj.model2);
                Promise.all([promiseModel1, promiseModel2]).then(function (values) {
                    var xmlObj = {
                        "@Name": obj.getRolename1() + "_" + obj.model2,
                        "@Association": constants.ODATA_NAMESPACE + "." + obj.getName()
                    };
                    var ends = [];
                    ends.push({
                        "@Role": obj.getRolename1(),
                        "@EntitySet": commons.getPluralForModel(values[0])
                    });
                    ends.push({
                        "@Role": obj.getRolename2(),
                        "@EntitySet": commons.getPluralForModel(values[1])
                    });
                    xmlObj.End = ends;
                    resolve(xmlObj);
                });
            });
        });
    };
    ;
    /**
     * Compares the current Association with the one give in parameter otherAssoc
     * Two Associations are equal if either of the model names and either of the relation names
     * match.
     * @param otherAssoc the Association to compare with
     */
    MetaAssociation.prototype.equals = function (otherAssoc) {
        return (this._model1 === otherAssoc.model1 || this._model1 === otherAssoc.model2 ||
            this._model2 === otherAssoc.model1 || this._model2 === otherAssoc.model2) && (this._relation1 === otherAssoc.relation1 || this._relation1 === otherAssoc.relation2 ||
            this._relation2 === otherAssoc.relation1 || this._relation2 === otherAssoc.relation2);
    };
    ;
    /**
     * Returns the name of the association. Using this function it is garanteed that the name is always the same for
     * a particular Association
     * @returns {string}
     */
    MetaAssociation.prototype.getName = function () {
        return this.model1 + "_" + this.relation1 + "_" + this.model2 + "_" + this.relation2;
    };
    /**
     * Returns the rolename of the first role in the Association
     * @returns {string}
     */
    MetaAssociation.prototype.getRolename1 = function () {
        return this.model1 + "_" + this.relation1;
    };
    /**
     * Returns the rolename of the second role in the Association
     * @returns {string}
     */
    MetaAssociation.prototype.getRolename2 = function () {
        return this.model2 + "_" + this.relation2;
    };
    return MetaAssociation;
})();
exports.MetaAssociation = MetaAssociation;
//# sourceMappingURL=metaAssociation.js.map