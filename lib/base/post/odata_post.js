"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var log4js = require('log4js');
var commons = require('../../common/odata_common');
var constants = require('../../constants/odata_constants');
var BaseUpdateRequestHandler_1 = require("../BaseUpdateRequestHandler");
var BaseRequestHandler_1 = require("../BaseRequestHandler");
var logger = log4js.getLogger("post");
var ODataPostBase = (function (_super) {
    __extends(ODataPostBase, _super);
    function ODataPostBase() {
        _super.call(this);
    }
    ;
    ODataPostBase.prototype._handlePost = function (req, res) {
        var _this = this;
        logger.trace("handle post");
        return new Promise(function (resolve, reject) {
            _this.setODataVersion(res, constants.ODATA_VERSION_2);
            commons.getModelClass(req.app.models, req.params[0]).then(function (ModelClass) {
                if (ModelClass) {
                    var location = commons.getBaseURL(req) + '/' + ModelClass.definition.settings.plural;
                    var createObj = {};
                    ModelClass.forEachProperty(function (propName, property) {
                        var reqObj = req.body;
                        if (reqObj[propName]) {
                            if (property.type.name === "Date") {
                                if (reqObj[propName].indexOf("/Date(") > -1) {
                                    createObj[propName] = new Date(parseInt(reqObj[propName].substr(6)));
                                }
                                else {
                                    createObj[propName] = reqObj[propName];
                                }
                            }
                            else {
                                createObj[propName] = reqObj[propName];
                            }
                        }
                        else {
                            createObj[propName] = property.default;
                        }
                    });
                    ModelClass.create(createObj).then(function (instance) {
                        res.location(location + '(\'' + instance.id + '\')');
                        logger.trace("created %s with id %s.", ModelClass.modelName, instance.id);
                        return instance;
                    }).then(function (instance) {
                        _this._upsertInlineRelations(instance, ModelClass, req.body).then(function () {
                            var result = new BaseRequestHandler_1.EntityResult();
                            result.data = instance.toJSON();
                            resolve(result);
                        }).catch(function (err) {
                            reject(err);
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                }
                else {
                    reject(404);
                }
            }).catch(function (err) {
                logger.error(err);
                reject(err);
            });
        });
    };
    return ODataPostBase;
}(BaseUpdateRequestHandler_1.BaseUpdateRequestHandler));
exports.ODataPostBase = ODataPostBase;
//# sourceMappingURL=odata_post.js.map