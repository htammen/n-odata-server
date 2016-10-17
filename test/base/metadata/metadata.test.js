"use strict";
var chai = require("chai");
var metadata_1 = require("../../../lib/base/metadata/metadata");
var chaiAsPromised = require("chai-as-promised");
var loopback = require("loopback");
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
            var app = loopback();
            var testModel = loopback.createModel({
                name: 'TestModel',
                idInjection: true,
                properties: {
                    MyProp1: "string",
                    MyProp2: "string"
                }
            });
            var ds = loopback.memory();
            testModel.attachTo(ds);
            app.model(testModel);
            var sut = new metadata_1.Metadata(app);
            var expectedString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<edmx:Edmx xmlns:edmx=\"http://schemas.microsoft.com/ado/2007/06/edmx\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\" Version=\"1.0\">\n  <edmx:DataServices m:DataServiceVersion=\"2.0\">\n    <Schema xmlns=\"http://schemas.microsoft.com/ado/2008/09/edm\" Namespace=\"NODATASERVER\">\n      <EntityType Name=\"TestModel\">\n        <Key>\n          <PropertyRef Name=\"id\"/>\n        </Key>\n        <Property Name=\"MyProp1\" Type=\"Edm.String\"/>\n        <Property Name=\"MyProp2\" Type=\"Edm.String\"/>\n        <Property Name=\"id\" Type=\"Edm.Int32\"/>\n      </EntityType>\n      <Association/>\n      <EntityContainer Name=\"NODATASERVER\" m:IsDefaultEntityContainer=\"true\">\n        <EntitySet Name=\"TestModels\" EntityType=\"NODATASERVER.TestModel\"/>\n        <AssociationSet/>\n      </EntityContainer>\n    </Schema>\n  </edmx:DataServices>\n</edmx:Edmx>";
            var promise = sut.buildMetadata();
            return promise.should.eventually.equal(expectedString);
        });
    });
});
//# sourceMappingURL=metadata.test.js.map