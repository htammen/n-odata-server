"use strict";
var chai = require("chai");
var metadata_1 = require("../../../lib/base/metadata/metadata");
var chaiAsPromised = require("chai-as-promised");
var proxyquire = require("proxyquire");
describe("Metadata", function () {
    before(function () {
        chai.use(chaiAsPromised);
        chai.should();
    });
    describe("buildMetadata", function () {
        var sut;
        beforeEach(function () {
        });
        it("should build and return an empty metadata stream", function () {
            var models = function () {
                return [];
            };
            var app = { models: models };
            sut = new metadata_1.Metadata(app);
            var expectedString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<edmx:Edmx xmlns:edmx=\"http://schemas.microsoft.com/ado/2007/06/edmx\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\" Version=\"1.0\">\n  <edmx:DataServices m:DataServiceVersion=\"2.0\">\n    <Schema xmlns=\"http://schemas.microsoft.com/ado/2008/09/edm\" Namespace=\"NODATASERVER\">\n      <EntityType/>\n      <Association/>\n      <EntityContainer Name=\"NODATASERVER\" m:IsDefaultEntityContainer=\"true\">\n        <EntitySet/>\n        <AssociationSet/>\n      </EntityContainer>\n    </Schema>\n  </edmx:DataServices>\n</edmx:Edmx>";
            var promise = sut.buildMetadata();
            return promise.should.eventually.equal(expectedString);
        });
        it("should build and return a simple metadata stream", function () {
            var simpleModel;
            simpleModel = {
                definition: {
                    name: "MyModel",
                    columnNames: function () {
                        return ["MyProp1", "MyProp2"];
                    },
                    properties: {
                        MyProp1: {
                            id: "MyProp1"
                        },
                        MyProp2: {
                            id: "MyProp2"
                        }
                    },
                    settings: {
                        relations: []
                    }
                }
            };
            var commonsStub = {};
            commonsStub.convertType = function (property) {
                return "Edm.String";
            };
            commonsStub.getPluralForModel = function (model) {
                return "MyModels";
            };
            var sutProxy = proxyquire("../../../lib/base/metadata/metadata", { '../../common/odata_common': commonsStub });
            var models = function () {
                return [simpleModel];
            };
            var app = { models: models };
            var sut = new sutProxy.Metadata(app);
            var expectedString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<edmx:Edmx xmlns:edmx=\"http://schemas.microsoft.com/ado/2007/06/edmx\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\" Version=\"1.0\">\n  <edmx:DataServices m:DataServiceVersion=\"2.0\">\n    <Schema xmlns=\"http://schemas.microsoft.com/ado/2008/09/edm\" Namespace=\"NODATASERVER\">\n      <EntityType Name=\"MyModel\">\n        <Key>\n          <PropertyRef Name=\"MyProp2\"/>\n        </Key>\n        <Property Name=\"MyProp1\" Type=\"Edm.String\"/>\n        <Property Name=\"MyProp2\" Type=\"Edm.String\"/>\n      </EntityType>\n      <Association/>\n      <EntityContainer Name=\"NODATASERVER\" m:IsDefaultEntityContainer=\"true\">\n        <EntitySet Name=\"MyModels\" EntityType=\"NODATASERVER.MyModel\"/>\n        <AssociationSet/>\n      </EntityContainer>\n    </Schema>\n  </edmx:DataServices>\n</edmx:Edmx>";
            var promise = sut.buildMetadata();
            return promise.should.eventually.equal(expectedString);
        });
    });
});
//# sourceMappingURL=metadata.test.js.map