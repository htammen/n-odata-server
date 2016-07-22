"use strict";
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var lb_constants = require('../../constants/loopback_constants');
var AssociationMulitplicity;
(function (AssociationMulitplicity) {
    AssociationMulitplicity[AssociationMulitplicity["ZERO_ONE"] = '0..1'] = "ZERO_ONE";
    AssociationMulitplicity[AssociationMulitplicity["ONE_ONE"] = '1'] = "ONE_ONE";
    AssociationMulitplicity[AssociationMulitplicity["ONE_MANY"] = '*'] = "ONE_MANY";
    AssociationMulitplicity[AssociationMulitplicity["MANY"] = '*'] = "MANY";
})(AssociationMulitplicity || (AssociationMulitplicity = {}));
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
    MetaAssociation.findOrCreateAssociationForModelRelation = function (model_definition, relation, relationName, models, listOfAssociations) {
        var relationModels = models.filter(function (obj) {
            return obj.definition.name === relation.model;
        });
        var relationModel = relationModels[0];
        if (relationModel === undefined) {
            return undefined;
        }
        var foundRel, multiplicityOfModelInRelation, multiplicityOfRelationInModel;
        for (var rel in relationModel.definition.settings.relations) {
            if (relationModel.definition.settings.relations[rel].model === model_definition.name) {
                foundRel = rel;
                multiplicityOfModelInRelation = MetaAssociation._getMultiplicityForRelation(relationModel.definition.settings.relations[rel]);
                break;
            }
        }
        if (!foundRel) {
            foundRel = relation.model;
            multiplicityOfModelInRelation = AssociationMulitplicity.ZERO_ONE;
        }
        multiplicityOfRelationInModel = MetaAssociation._getMultiplicityForRelation(model_definition.settings.relations[relationName]);
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
    MetaAssociation.findAssociation = function (assoc, listOfAssocs) {
        return listOfAssocs.filter(function (obj) {
            return obj.equals(assoc);
        });
    };
    ;
    MetaAssociation.findAssociationByModelnames = function (name1, name2, listOfAssocs) {
        return listOfAssocs.filter(function (obj) {
            return (obj.model1 === name1 && obj.model2 === name2) || (obj.model1 === name2 && obj.model2 === name1);
        });
    };
    ;
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
    MetaAssociation.getAssociationsForXML = function (listOfAssocs) {
        return listOfAssocs.map(function (obj) {
            return new Promise(function (resolve, reject) {
                var xmlObj = { "@Name": obj.getName() };
                var ends = [];
                ends.push({
                    "@Type": constants.ODATA_NAMESPACE + "." + obj._model1,
                    "@Role": obj.getRolename1(),
                    "@Multiplicity": obj.multiplicity2
                });
                ends.push({
                    "@Type": constants.ODATA_NAMESPACE + "." + obj._model2,
                    "@Role": obj.getRolename2(),
                    "@Multiplicity": obj.multiplicity1
                });
                xmlObj.End = ends;
                resolve(xmlObj);
            });
        });
    };
    ;
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
    MetaAssociation.prototype.equals = function (otherAssoc) {
        return (this._model1 === otherAssoc.model1 || this._model1 === otherAssoc.model2 ||
            this._model2 === otherAssoc.model1 || this._model2 === otherAssoc.model2) && (this._relation1 === otherAssoc.relation1 || this._relation1 === otherAssoc.relation2 ||
            this._relation2 === otherAssoc.relation1 || this._relation2 === otherAssoc.relation2);
    };
    ;
    MetaAssociation.prototype.getName = function () {
        return this.model1 + "_" + this.relation1 + "_" + this.model2 + "_" + this.relation2;
    };
    MetaAssociation.prototype.getRolename1 = function () {
        return this.model1 + "_" + this.relation1;
    };
    MetaAssociation.prototype.getRolename2 = function () {
        return this.model2 + "_" + this.relation2;
    };
    MetaAssociation.prototype.getRolenameFor = function (parentModel) {
        if (this.model1 === parentModel) {
            return this.model1 + "_" + this.relation1;
        }
        else {
            return this.model2 + "_" + this.relation2;
        }
    };
    return MetaAssociation;
}());
exports.MetaAssociation = MetaAssociation;
//# sourceMappingURL=metaAssociation.js.map