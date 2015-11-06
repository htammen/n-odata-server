module.exports = function(){
"use strict";

    // SUMMARY
    //      rules = 398
    //       udts = 0
    //    opcodes = 2787
    //        ALT = 167
    //        CAT = 454
    //        RNM = 1363
    //        UDT = 0
    //        REP = 257
    //        AND = 0
    //        NOT = 0
    //        TLS = 381
    //        TBS = 157
    //        TRG = 8
    // characters = [9 - 255]

    // CALLBACK LIST PROTOTYPE (true, false or function reference)
    this.callbacks = [];
    this.callbacks['a-to-f'] = false;
    this.callbacks['abstractspatialtypename'] = false;
    this.callbacks['action'] = false;
    this.callbacks['actionimport'] = false;
    this.callbacks['actionimportcall'] = false;
    this.callbacks['addexpr'] = false;
    this.callbacks['aliasandvalue'] = false;
    this.callbacks['allexpr'] = false;
    this.callbacks['alloperationsinschema'] = false;
    this.callbacks['allowentityreferencespreference'] = false;
    this.callbacks['alpha'] = false;
    this.callbacks['andexpr'] = false;
    this.callbacks['annotationidentifier'] = false;
    this.callbacks['annotationinuri'] = false;
    this.callbacks['annotationslist'] = false;
    this.callbacks['anyexpr'] = false;
    this.callbacks['arrayorobject'] = false;
    this.callbacks['at'] = false;
    this.callbacks['authority'] = false;
    this.callbacks['base64b16'] = false;
    this.callbacks['base64b8'] = false;
    this.callbacks['base64char'] = false;
    this.callbacks['begin-array'] = false;
    this.callbacks['begin-object'] = false;
    this.callbacks['binary'] = false;
    this.callbacks['binaryvalue'] = false;
    this.callbacks['boolcommonexpr'] = false;
    this.callbacks['booleanvalue'] = false;
    this.callbacks['boolmethodcallexpr'] = false;
    this.callbacks['boolparenexpr'] = false;
    this.callbacks['boundactioncall'] = false;
    this.callbacks['boundcomplexcolfunccall'] = false;
    this.callbacks['boundcomplexfunccall'] = false;
    this.callbacks['boundentitycolfunccall'] = false;
    this.callbacks['boundentityfunccall'] = false;
    this.callbacks['boundfunctionexpr'] = false;
    this.callbacks['boundoperation'] = false;
    this.callbacks['boundprimitivecolfunccall'] = false;
    this.callbacks['boundprimitivefunccall'] = false;
    this.callbacks['bws'] = false;
    this.callbacks['bws-h'] = false;
    this.callbacks['bytevalue'] = false;
    this.callbacks['callbackpreference'] = false;
    this.callbacks['castexpr'] = false;
    this.callbacks['ceilingmethodcallexpr'] = false;
    this.callbacks['charinjson'] = false;
    this.callbacks['close'] = false;
    this.callbacks['collectionliteral'] = false;
    this.callbacks['collectionnavigation'] = false;
    this.callbacks['collectionnavigationexpr'] = false;
    this.callbacks['collectionnavpath'] = false;
    this.callbacks['collectionnavpropinjson'] = false;
    this.callbacks['collectionpath'] = false;
    this.callbacks['collectionpathexpr'] = false;
    this.callbacks['collectionpropertyinuri'] = false;
    this.callbacks['colon'] = false;
    this.callbacks['comma'] = false;
    this.callbacks['commonexpr'] = false;
    this.callbacks['complexcolfunction'] = false;
    this.callbacks['complexcolfunctionimport'] = false;
    this.callbacks['complexcolfunctionimportcall'] = false;
    this.callbacks['complexcolinuri'] = false;
    this.callbacks['complexcolproperty'] = false;
    this.callbacks['complexfunction'] = false;
    this.callbacks['complexfunctionimport'] = false;
    this.callbacks['complexfunctionimportcall'] = false;
    this.callbacks['complexinuri'] = false;
    this.callbacks['complexpath'] = false;
    this.callbacks['complexpathexpr'] = false;
    this.callbacks['complexproperty'] = false;
    this.callbacks['complexpropertyinuri'] = false;
    this.callbacks['complextypename'] = false;
    this.callbacks['compoundkey'] = false;
    this.callbacks['concatmethodcallexpr'] = false;
    this.callbacks['concretespatialtypename'] = false;
    this.callbacks['containmentnavigation'] = false;
    this.callbacks['containsmethodcallexpr'] = false;
    this.callbacks['content-id'] = false;
    this.callbacks['context'] = false;
    this.callbacks['contextfragment'] = false;
    this.callbacks['contextpropertypath'] = false;
    this.callbacks['continueonerrorpreference'] = false;
    this.callbacks['count'] = false;
    this.callbacks['crossjoin'] = false;
    this.callbacks['customname'] = false;
    this.callbacks['customqueryoption'] = false;
    this.callbacks['customvalue'] = false;
    this.callbacks['datemethodcallexpr'] = false;
    this.callbacks['datetimeoffsetvalue'] = false;
    this.callbacks['datevalue'] = false;
    this.callbacks['day'] = false;
    this.callbacks['daymethodcallexpr'] = false;
    this.callbacks['dec-octet'] = false;
    this.callbacks['decimalvalue'] = false;
    this.callbacks['digit'] = false;
    this.callbacks['distancemethodcallexpr'] = false;
    this.callbacks['divexpr'] = false;
    this.callbacks['doublevalue'] = false;
    this.callbacks['dquote'] = false;
    this.callbacks['dummystartrule'] = false;
    this.callbacks['duration'] = false;
    this.callbacks['durationvalue'] = false;
    this.callbacks['end-array'] = false;
    this.callbacks['end-object'] = false;
    this.callbacks['endswithmethodcallexpr'] = false;
    this.callbacks['entitycastoption'] = false;
    this.callbacks['entitycastoptions'] = false;
    this.callbacks['entitycolfunction'] = false;
    this.callbacks['entitycolfunctionimport'] = false;
    this.callbacks['entitycolfunctionimportcall'] = false;
    this.callbacks['entitycolnavigationproperty'] = false;
    this.callbacks['entityfunction'] = false;
    this.callbacks['entityfunctionimport'] = false;
    this.callbacks['entityfunctionimportcall'] = false;
    this.callbacks['entityidoption'] = false;
    this.callbacks['entitynavigationproperty'] = false;
    this.callbacks['entityoptions'] = false;
    this.callbacks['entityset'] = false;
    this.callbacks['entitysetname'] = false;
    this.callbacks['entitytypename'] = false;
    this.callbacks['enum'] = false;
    this.callbacks['enumerationmember'] = false;
    this.callbacks['enumerationtypename'] = false;
    this.callbacks['enummembervalue'] = false;
    this.callbacks['enumvalue'] = false;
    this.callbacks['eq'] = false;
    this.callbacks['eq-h'] = false;
    this.callbacks['eqexpr'] = false;
    this.callbacks['escape'] = false;
    this.callbacks['excludeoperator'] = false;
    this.callbacks['exp'] = false;
    this.callbacks['expand'] = false;
    this.callbacks['expandcountoption'] = false;
    this.callbacks['expanditem'] = false;
    this.callbacks['expandoption'] = false;
    this.callbacks['expandpath'] = false;
    this.callbacks['expandrefoption'] = false;
    this.callbacks['filter'] = false;
    this.callbacks['firstmemberexpr'] = false;
    this.callbacks['floormethodcallexpr'] = false;
    this.callbacks['format'] = false;
    this.callbacks['frac'] = false;
    this.callbacks['fractionalseconds'] = false;
    this.callbacks['fractionalsecondsmethodcallexpr'] = false;
    this.callbacks['fragment'] = false;
    this.callbacks['fullcollectionliteral'] = false;
    this.callbacks['fulllinestringliteral'] = false;
    this.callbacks['fullmultilinestringliteral'] = false;
    this.callbacks['fullmultipointliteral'] = false;
    this.callbacks['fullmultipolygonliteral'] = false;
    this.callbacks['fullpointliteral'] = false;
    this.callbacks['fullpolygonliteral'] = false;
    this.callbacks['function'] = false;
    this.callbacks['functionexpr'] = false;
    this.callbacks['functionexprparameter'] = false;
    this.callbacks['functionexprparameters'] = false;
    this.callbacks['functionparameter'] = false;
    this.callbacks['functionparameters'] = false;
    this.callbacks['geexpr'] = false;
    this.callbacks['geographycollection'] = false;
    this.callbacks['geographylinestring'] = false;
    this.callbacks['geographymultilinestring'] = false;
    this.callbacks['geographymultipoint'] = false;
    this.callbacks['geographymultipolygon'] = false;
    this.callbacks['geographypoint'] = false;
    this.callbacks['geographypolygon'] = false;
    this.callbacks['geographyprefix'] = false;
    this.callbacks['geolengthmethodcallexpr'] = false;
    this.callbacks['geoliteral'] = false;
    this.callbacks['geometrycollection'] = false;
    this.callbacks['geometrylinestring'] = false;
    this.callbacks['geometrymultilinestring'] = false;
    this.callbacks['geometrymultipoint'] = false;
    this.callbacks['geometrymultipolygon'] = false;
    this.callbacks['geometrypoint'] = false;
    this.callbacks['geometrypolygon'] = false;
    this.callbacks['geometryprefix'] = false;
    this.callbacks['gtexpr'] = false;
    this.callbacks['guidvalue'] = false;
    this.callbacks['h16'] = false;
    this.callbacks['hasexpr'] = false;
    this.callbacks['header'] = false;
    this.callbacks['hexdig'] = false;
    this.callbacks['hier-part'] = false;
    this.callbacks['host'] = false;
    this.callbacks['hour'] = false;
    this.callbacks['hourmethodcallexpr'] = false;
    this.callbacks['htab'] = false;
    this.callbacks['id'] = false;
    this.callbacks['identifiercharacter'] = false;
    this.callbacks['identifierleadingcharacter'] = false;
    this.callbacks['implicitvariableexpr'] = false;
    this.callbacks['includeannotationspreference'] = false;
    this.callbacks['indexofmethodcallexpr'] = false;
    this.callbacks['inlinecount'] = false;
    this.callbacks['inscopevariableexpr'] = false;
    this.callbacks['int'] = false;
    this.callbacks['int16value'] = false;
    this.callbacks['int32value'] = false;
    this.callbacks['int64value'] = false;
    this.callbacks['intersectsmethodcallexpr'] = false;
    this.callbacks['ip-literal'] = false;
    this.callbacks['ipv4address'] = false;
    this.callbacks['ipv6address'] = false;
    this.callbacks['ipvfuture'] = false;
    this.callbacks['iri-in-header'] = false;
    this.callbacks['iri-in-query'] = false;
    this.callbacks['isofexpr'] = false;
    this.callbacks['keypredicate'] = false;
    this.callbacks['keypropertyalias'] = false;
    this.callbacks['keypropertyvalue'] = false;
    this.callbacks['keyvaluepair'] = false;
    this.callbacks['lambdapredicateexpr'] = false;
    this.callbacks['lambdavariableexpr'] = false;
    this.callbacks['leexpr'] = false;
    this.callbacks['lengthmethodcallexpr'] = false;
    this.callbacks['levels'] = false;
    this.callbacks['linestringdata'] = false;
    this.callbacks['linestringliteral'] = false;
    this.callbacks['ls32'] = false;
    this.callbacks['ltexpr'] = false;
    this.callbacks['maxdatetimemethodcallexpr'] = false;
    this.callbacks['maxpagesizepreference'] = false;
    this.callbacks['memberexpr'] = false;
    this.callbacks['methodcallexpr'] = false;
    this.callbacks['mindatetimemethodcallexpr'] = false;
    this.callbacks['minute'] = false;
    this.callbacks['minutemethodcallexpr'] = false;
    this.callbacks['modexpr'] = false;
    this.callbacks['month'] = false;
    this.callbacks['monthmethodcallexpr'] = false;
    this.callbacks['mulexpr'] = false;
    this.callbacks['multilinestringliteral'] = false;
    this.callbacks['multipointliteral'] = false;
    this.callbacks['multipolygonliteral'] = false;
    this.callbacks['name-separator'] = false;
    this.callbacks['namespace'] = false;
    this.callbacks['namespacepart'] = false;
    this.callbacks['naninfinity'] = false;
    this.callbacks['navigation'] = false;
    this.callbacks['navigationproperty'] = false;
    this.callbacks['navigationpropertyinuri'] = false;
    this.callbacks['neexpr'] = false;
    this.callbacks['negateexpr'] = false;
    this.callbacks['notexpr'] = false;
    this.callbacks['nowmethodcallexpr'] = false;
    this.callbacks['nullvalue'] = false;
    this.callbacks['numberinjson'] = false;
    this.callbacks['obs-text'] = false;
    this.callbacks['odata-entityid'] = false;
    this.callbacks['odata-isolation'] = false;
    this.callbacks['odata-maxversion'] = false;
    this.callbacks['odata-version'] = false;
    this.callbacks['odataidentifier'] = false;
    this.callbacks['odatarelativeuri'] = false;
    this.callbacks['odatauri'] = false;
    this.callbacks['onetonine'] = false;
    this.callbacks['open'] = false;
    this.callbacks['orderby'] = false;
    this.callbacks['orderbyitem'] = false;
    this.callbacks['orexpr'] = false;
    this.callbacks['other-delims'] = false;
    this.callbacks['ows'] = false;
    this.callbacks['parameteralias'] = false;
    this.callbacks['parametername'] = false;
    this.callbacks['parameternames'] = false;
    this.callbacks['parametervalue'] = false;
    this.callbacks['parenexpr'] = false;
    this.callbacks['path-abempty'] = false;
    this.callbacks['path-absolute'] = false;
    this.callbacks['path-rootless'] = false;
    this.callbacks['pchar'] = false;
    this.callbacks['pchar-no-squote'] = false;
    this.callbacks['pct-encoded'] = false;
    this.callbacks['pct-encoded-no-squote'] = false;
    this.callbacks['pct-encoded-unescaped'] = false;
    this.callbacks['pointdata'] = false;
    this.callbacks['pointliteral'] = false;
    this.callbacks['polygondata'] = false;
    this.callbacks['polygonliteral'] = false;
    this.callbacks['port'] = false;
    this.callbacks['positionliteral'] = false;
    this.callbacks['prefer'] = false;
    this.callbacks['preference'] = false;
    this.callbacks['primitivecolfunction'] = false;
    this.callbacks['primitivecolfunctionimport'] = false;
    this.callbacks['primitivecolfunctionimportcall'] = false;
    this.callbacks['primitivecolinuri'] = false;
    this.callbacks['primitivecolproperty'] = false;
    this.callbacks['primitivefunction'] = false;
    this.callbacks['primitivefunctionimport'] = false;
    this.callbacks['primitivefunctionimportcall'] = false;
    this.callbacks['primitivekeyproperty'] = false;
    this.callbacks['primitiveliteral'] = false;
    this.callbacks['primitiveliteralinjson'] = false;
    this.callbacks['primitivenonkeyproperty'] = false;
    this.callbacks['primitiveproperty'] = false;
    this.callbacks['primitivepropertyinuri'] = false;
    this.callbacks['primitivetypename'] = false;
    this.callbacks['primitivevalue'] = false;
    this.callbacks['propertypath'] = false;
    this.callbacks['propertypathexpr'] = false;
    this.callbacks['qchar-json-special'] = false;
    this.callbacks['qchar-no-amp'] = false;
    this.callbacks['qchar-no-amp-dquote'] = false;
    this.callbacks['qchar-no-amp-eq'] = false;
    this.callbacks['qchar-no-amp-eq-at-dollar'] = false;
    this.callbacks['qchar-unescaped'] = false;
    this.callbacks['qualifiedactionname'] = false;
    this.callbacks['qualifiedcomplextypename'] = false;
    this.callbacks['qualifiedentitytypename'] = false;
    this.callbacks['qualifiedenumtypename'] = false;
    this.callbacks['qualifiedfunctionname'] = false;
    this.callbacks['qualifiedtypedefinitionname'] = false;
    this.callbacks['qualifiedtypename'] = false;
    this.callbacks['query'] = false;
    this.callbacks['queryoption'] = false;
    this.callbacks['queryoptions'] = false;
    this.callbacks['quotation-mark'] = false;
    this.callbacks['ref'] = false;
    this.callbacks['reg-name'] = false;
    this.callbacks['resourcepath'] = false;
    this.callbacks['respondasyncpreference'] = false;
    this.callbacks['returnpreference'] = false;
    this.callbacks['ringliteral'] = false;
    this.callbacks['rootexpr'] = false;
    this.callbacks['rootexprcol'] = false;
    this.callbacks['roundmethodcallexpr'] = false;
    this.callbacks['rws'] = false;
    this.callbacks['sbytevalue'] = false;
    this.callbacks['scheme'] = false;
    this.callbacks['search'] = false;
    this.callbacks['searchandexpr'] = false;
    this.callbacks['searchexpr'] = false;
    this.callbacks['searchorexpr'] = false;
    this.callbacks['searchphrase'] = false;
    this.callbacks['searchterm'] = false;
    this.callbacks['searchword'] = false;
    this.callbacks['second'] = false;
    this.callbacks['secondmethodcallexpr'] = false;
    this.callbacks['segment'] = false;
    this.callbacks['segment-nz'] = false;
    this.callbacks['select'] = false;
    this.callbacks['selectitem'] = false;
    this.callbacks['selectlist'] = false;
    this.callbacks['selectlistitem'] = false;
    this.callbacks['selectlistproperty'] = false;
    this.callbacks['selectpath'] = false;
    this.callbacks['selectproperty'] = false;
    this.callbacks['semi'] = false;
    this.callbacks['serviceroot'] = false;
    this.callbacks['sign'] = false;
    this.callbacks['simplekey'] = false;
    this.callbacks['singleenumvalue'] = false;
    this.callbacks['singlenavigation'] = false;
    this.callbacks['singlenavigationexpr'] = false;
    this.callbacks['singlenavpropinjson'] = false;
    this.callbacks['singlepath'] = false;
    this.callbacks['singlepathexpr'] = false;
    this.callbacks['singlequalifiedtypename'] = false;
    this.callbacks['singletonentity'] = false;
    this.callbacks['singlevalue'] = false;
    this.callbacks['skip'] = false;
    this.callbacks['skiptoken'] = false;
    this.callbacks['sp'] = false;
    this.callbacks['squote'] = false;
    this.callbacks['squote-in-string'] = false;
    this.callbacks['sridliteral'] = false;
    this.callbacks['star'] = false;
    this.callbacks['startswithmethodcallexpr'] = false;
    this.callbacks['streamproperty'] = false;
    this.callbacks['string'] = false;
    this.callbacks['stringinjson'] = false;
    this.callbacks['sub-delims'] = false;
    this.callbacks['subexpr'] = false;
    this.callbacks['substringmethodcallexpr'] = false;
    this.callbacks['systemqueryoption'] = false;
    this.callbacks['termname'] = false;
    this.callbacks['timemethodcallexpr'] = false;
    this.callbacks['timeofdayvalue'] = false;
    this.callbacks['tolowermethodcallexpr'] = false;
    this.callbacks['top'] = false;
    this.callbacks['totaloffsetminutesmethodcallexpr'] = false;
    this.callbacks['totalsecondsmethodcallexpr'] = false;
    this.callbacks['touppermethodcallexpr'] = false;
    this.callbacks['trackchangespreference'] = false;
    this.callbacks['trimmethodcallexpr'] = false;
    this.callbacks['typedefinitionname'] = false;
    this.callbacks['unreserved'] = false;
    this.callbacks['uri'] = false;
    this.callbacks['userinfo'] = false;
    this.callbacks['value'] = false;
    this.callbacks['value-separator'] = false;
    this.callbacks['vchar'] = false;
    this.callbacks['waitpreference'] = false;
    this.callbacks['year'] = false;
    this.callbacks['yearmethodcallexpr'] = false;
    this.callbacks['zerotofiftynine'] = false;

    // OBJECT IDENTIFIER (for internal parser use)
    this.grammarObject = 'grammarObject';

    // RULES
    this.rules = [];
    this.rules[0] = {name: 'dummyStartRule', lower: 'dummystartrule', index: 0};
    this.rules[1] = {name: 'odataUri', lower: 'odatauri', index: 1};
    this.rules[2] = {name: 'serviceRoot', lower: 'serviceroot', index: 2};
    this.rules[3] = {name: 'odataRelativeUri', lower: 'odatarelativeuri', index: 3};
    this.rules[4] = {name: 'resourcePath', lower: 'resourcepath', index: 4};
    this.rules[5] = {name: 'collectionNavigation', lower: 'collectionnavigation', index: 5};
    this.rules[6] = {name: 'collectionNavPath', lower: 'collectionnavpath', index: 6};
    this.rules[7] = {name: 'keyPredicate', lower: 'keypredicate', index: 7};
    this.rules[8] = {name: 'simpleKey', lower: 'simplekey', index: 8};
    this.rules[9] = {name: 'compoundKey', lower: 'compoundkey', index: 9};
    this.rules[10] = {name: 'keyValuePair', lower: 'keyvaluepair', index: 10};
    this.rules[11] = {name: 'keyPropertyValue', lower: 'keypropertyvalue', index: 11};
    this.rules[12] = {name: 'keyPropertyAlias', lower: 'keypropertyalias', index: 12};
    this.rules[13] = {name: 'singleNavigation', lower: 'singlenavigation', index: 13};
    this.rules[14] = {name: 'propertyPath', lower: 'propertypath', index: 14};
    this.rules[15] = {name: 'collectionPath', lower: 'collectionpath', index: 15};
    this.rules[16] = {name: 'singlePath', lower: 'singlepath', index: 16};
    this.rules[17] = {name: 'complexPath', lower: 'complexpath', index: 17};
    this.rules[18] = {name: 'count', lower: 'count', index: 18};
    this.rules[19] = {name: 'ref', lower: 'ref', index: 19};
    this.rules[20] = {name: 'value', lower: 'value', index: 20};
    this.rules[21] = {name: 'boundOperation', lower: 'boundoperation', index: 21};
    this.rules[22] = {name: 'actionImportCall', lower: 'actionimportcall', index: 22};
    this.rules[23] = {name: 'boundActionCall', lower: 'boundactioncall', index: 23};
    this.rules[24] = {name: 'boundEntityFuncCall', lower: 'boundentityfunccall', index: 24};
    this.rules[25] = {name: 'boundEntityColFuncCall', lower: 'boundentitycolfunccall', index: 25};
    this.rules[26] = {name: 'boundComplexFuncCall', lower: 'boundcomplexfunccall', index: 26};
    this.rules[27] = {name: 'boundComplexColFuncCall', lower: 'boundcomplexcolfunccall', index: 27};
    this.rules[28] = {name: 'boundPrimitiveFuncCall', lower: 'boundprimitivefunccall', index: 28};
    this.rules[29] = {name: 'boundPrimitiveColFuncCall', lower: 'boundprimitivecolfunccall', index: 29};
    this.rules[30] = {name: 'entityFunctionImportCall', lower: 'entityfunctionimportcall', index: 30};
    this.rules[31] = {name: 'entityColFunctionImportCall', lower: 'entitycolfunctionimportcall', index: 31};
    this.rules[32] = {name: 'complexFunctionImportCall', lower: 'complexfunctionimportcall', index: 32};
    this.rules[33] = {name: 'complexColFunctionImportCall', lower: 'complexcolfunctionimportcall', index: 33};
    this.rules[34] = {name: 'primitiveFunctionImportCall', lower: 'primitivefunctionimportcall', index: 34};
    this.rules[35] = {name: 'primitiveColFunctionImportCall', lower: 'primitivecolfunctionimportcall', index: 35};
    this.rules[36] = {name: 'functionParameters', lower: 'functionparameters', index: 36};
    this.rules[37] = {name: 'functionParameter', lower: 'functionparameter', index: 37};
    this.rules[38] = {name: 'parameterName', lower: 'parametername', index: 38};
    this.rules[39] = {name: 'parameterAlias', lower: 'parameteralias', index: 39};
    this.rules[40] = {name: 'crossjoin', lower: 'crossjoin', index: 40};
    this.rules[41] = {name: 'queryOptions', lower: 'queryoptions', index: 41};
    this.rules[42] = {name: 'queryOption', lower: 'queryoption', index: 42};
    this.rules[43] = {name: 'entityOptions', lower: 'entityoptions', index: 43};
    this.rules[44] = {name: 'entityIdOption', lower: 'entityidoption', index: 44};
    this.rules[45] = {name: 'entityCastOptions', lower: 'entitycastoptions', index: 45};
    this.rules[46] = {name: 'entityCastOption', lower: 'entitycastoption', index: 46};
    this.rules[47] = {name: 'id', lower: 'id', index: 47};
    this.rules[48] = {name: 'systemQueryOption', lower: 'systemqueryoption', index: 48};
    this.rules[49] = {name: 'expand', lower: 'expand', index: 49};
    this.rules[50] = {name: 'expandItem', lower: 'expanditem', index: 50};
    this.rules[51] = {name: 'expandPath', lower: 'expandpath', index: 51};
    this.rules[52] = {name: 'expandCountOption', lower: 'expandcountoption', index: 52};
    this.rules[53] = {name: 'expandRefOption', lower: 'expandrefoption', index: 53};
    this.rules[54] = {name: 'expandOption', lower: 'expandoption', index: 54};
    this.rules[55] = {name: 'levels', lower: 'levels', index: 55};
    this.rules[56] = {name: 'filter', lower: 'filter', index: 56};
    this.rules[57] = {name: 'orderby', lower: 'orderby', index: 57};
    this.rules[58] = {name: 'orderbyItem', lower: 'orderbyitem', index: 58};
    this.rules[59] = {name: 'skip', lower: 'skip', index: 59};
    this.rules[60] = {name: 'top', lower: 'top', index: 60};
    this.rules[61] = {name: 'format', lower: 'format', index: 61};
    this.rules[62] = {name: 'inlinecount', lower: 'inlinecount', index: 62};
    this.rules[63] = {name: 'search', lower: 'search', index: 63};
    this.rules[64] = {name: 'searchExpr', lower: 'searchexpr', index: 64};
    this.rules[65] = {name: 'searchOrExpr', lower: 'searchorexpr', index: 65};
    this.rules[66] = {name: 'searchAndExpr', lower: 'searchandexpr', index: 66};
    this.rules[67] = {name: 'searchTerm', lower: 'searchterm', index: 67};
    this.rules[68] = {name: 'searchPhrase', lower: 'searchphrase', index: 68};
    this.rules[69] = {name: 'searchWord', lower: 'searchword', index: 69};
    this.rules[70] = {name: 'select', lower: 'select', index: 70};
    this.rules[71] = {name: 'selectItem', lower: 'selectitem', index: 71};
    this.rules[72] = {name: 'selectProperty', lower: 'selectproperty', index: 72};
    this.rules[73] = {name: 'selectPath', lower: 'selectpath', index: 73};
    this.rules[74] = {name: 'allOperationsInSchema', lower: 'alloperationsinschema', index: 74};
    this.rules[75] = {name: 'qualifiedActionName', lower: 'qualifiedactionname', index: 75};
    this.rules[76] = {name: 'qualifiedFunctionName', lower: 'qualifiedfunctionname', index: 76};
    this.rules[77] = {name: 'parameterNames', lower: 'parameternames', index: 77};
    this.rules[78] = {name: 'skiptoken', lower: 'skiptoken', index: 78};
    this.rules[79] = {name: 'aliasAndValue', lower: 'aliasandvalue', index: 79};
    this.rules[80] = {name: 'parameterValue', lower: 'parametervalue', index: 80};
    this.rules[81] = {name: 'customQueryOption', lower: 'customqueryoption', index: 81};
    this.rules[82] = {name: 'customName', lower: 'customname', index: 82};
    this.rules[83] = {name: 'customValue', lower: 'customvalue', index: 83};
    this.rules[84] = {name: 'context', lower: 'context', index: 84};
    this.rules[85] = {name: 'contextFragment', lower: 'contextfragment', index: 85};
    this.rules[86] = {name: 'entitySet', lower: 'entityset', index: 86};
    this.rules[87] = {name: 'containmentNavigation', lower: 'containmentnavigation', index: 87};
    this.rules[88] = {name: 'navigation', lower: 'navigation', index: 88};
    this.rules[89] = {name: 'selectList', lower: 'selectlist', index: 89};
    this.rules[90] = {name: 'selectListItem', lower: 'selectlistitem', index: 90};
    this.rules[91] = {name: 'selectListProperty', lower: 'selectlistproperty', index: 91};
    this.rules[92] = {name: 'contextPropertyPath', lower: 'contextpropertypath', index: 92};
    this.rules[93] = {name: 'commonExpr', lower: 'commonexpr', index: 93};
    this.rules[94] = {name: 'boolCommonExpr', lower: 'boolcommonexpr', index: 94};
    this.rules[95] = {name: 'rootExpr', lower: 'rootexpr', index: 95};
    this.rules[96] = {name: 'firstMemberExpr', lower: 'firstmemberexpr', index: 96};
    this.rules[97] = {name: 'memberExpr', lower: 'memberexpr', index: 97};
    this.rules[98] = {name: 'propertyPathExpr', lower: 'propertypathexpr', index: 98};
    this.rules[99] = {name: 'inscopeVariableExpr', lower: 'inscopevariableexpr', index: 99};
    this.rules[100] = {name: 'implicitVariableExpr', lower: 'implicitvariableexpr', index: 100};
    this.rules[101] = {name: 'lambdaVariableExpr', lower: 'lambdavariableexpr', index: 101};
    this.rules[102] = {name: 'collectionNavigationExpr', lower: 'collectionnavigationexpr', index: 102};
    this.rules[103] = {name: 'singleNavigationExpr', lower: 'singlenavigationexpr', index: 103};
    this.rules[104] = {name: 'collectionPathExpr', lower: 'collectionpathexpr', index: 104};
    this.rules[105] = {name: 'complexPathExpr', lower: 'complexpathexpr', index: 105};
    this.rules[106] = {name: 'singlePathExpr', lower: 'singlepathexpr', index: 106};
    this.rules[107] = {name: 'boundFunctionExpr', lower: 'boundfunctionexpr', index: 107};
    this.rules[108] = {name: 'functionExpr', lower: 'functionexpr', index: 108};
    this.rules[109] = {name: 'functionExprParameters', lower: 'functionexprparameters', index: 109};
    this.rules[110] = {name: 'functionExprParameter', lower: 'functionexprparameter', index: 110};
    this.rules[111] = {name: 'anyExpr', lower: 'anyexpr', index: 111};
    this.rules[112] = {name: 'allExpr', lower: 'allexpr', index: 112};
    this.rules[113] = {name: 'lambdaPredicateExpr', lower: 'lambdapredicateexpr', index: 113};
    this.rules[114] = {name: 'methodCallExpr', lower: 'methodcallexpr', index: 114};
    this.rules[115] = {name: 'boolMethodCallExpr', lower: 'boolmethodcallexpr', index: 115};
    this.rules[116] = {name: 'containsMethodCallExpr', lower: 'containsmethodcallexpr', index: 116};
    this.rules[117] = {name: 'startsWithMethodCallExpr', lower: 'startswithmethodcallexpr', index: 117};
    this.rules[118] = {name: 'endsWithMethodCallExpr', lower: 'endswithmethodcallexpr', index: 118};
    this.rules[119] = {name: 'lengthMethodCallExpr', lower: 'lengthmethodcallexpr', index: 119};
    this.rules[120] = {name: 'indexOfMethodCallExpr', lower: 'indexofmethodcallexpr', index: 120};
    this.rules[121] = {name: 'substringMethodCallExpr', lower: 'substringmethodcallexpr', index: 121};
    this.rules[122] = {name: 'toLowerMethodCallExpr', lower: 'tolowermethodcallexpr', index: 122};
    this.rules[123] = {name: 'toUpperMethodCallExpr', lower: 'touppermethodcallexpr', index: 123};
    this.rules[124] = {name: 'trimMethodCallExpr', lower: 'trimmethodcallexpr', index: 124};
    this.rules[125] = {name: 'concatMethodCallExpr', lower: 'concatmethodcallexpr', index: 125};
    this.rules[126] = {name: 'yearMethodCallExpr', lower: 'yearmethodcallexpr', index: 126};
    this.rules[127] = {name: 'monthMethodCallExpr', lower: 'monthmethodcallexpr', index: 127};
    this.rules[128] = {name: 'dayMethodCallExpr', lower: 'daymethodcallexpr', index: 128};
    this.rules[129] = {name: 'hourMethodCallExpr', lower: 'hourmethodcallexpr', index: 129};
    this.rules[130] = {name: 'minuteMethodCallExpr', lower: 'minutemethodcallexpr', index: 130};
    this.rules[131] = {name: 'secondMethodCallExpr', lower: 'secondmethodcallexpr', index: 131};
    this.rules[132] = {name: 'fractionalsecondsMethodCallExpr', lower: 'fractionalsecondsmethodcallexpr', index: 132};
    this.rules[133] = {name: 'totalsecondsMethodCallExpr', lower: 'totalsecondsmethodcallexpr', index: 133};
    this.rules[134] = {name: 'dateMethodCallExpr', lower: 'datemethodcallexpr', index: 134};
    this.rules[135] = {name: 'timeMethodCallExpr', lower: 'timemethodcallexpr', index: 135};
    this.rules[136] = {name: 'totalOffsetMinutesMethodCallExpr', lower: 'totaloffsetminutesmethodcallexpr', index: 136};
    this.rules[137] = {name: 'minDateTimeMethodCallExpr', lower: 'mindatetimemethodcallexpr', index: 137};
    this.rules[138] = {name: 'maxDateTimeMethodCallExpr', lower: 'maxdatetimemethodcallexpr', index: 138};
    this.rules[139] = {name: 'nowMethodCallExpr', lower: 'nowmethodcallexpr', index: 139};
    this.rules[140] = {name: 'roundMethodCallExpr', lower: 'roundmethodcallexpr', index: 140};
    this.rules[141] = {name: 'floorMethodCallExpr', lower: 'floormethodcallexpr', index: 141};
    this.rules[142] = {name: 'ceilingMethodCallExpr', lower: 'ceilingmethodcallexpr', index: 142};
    this.rules[143] = {name: 'distanceMethodCallExpr', lower: 'distancemethodcallexpr', index: 143};
    this.rules[144] = {name: 'geoLengthMethodCallExpr', lower: 'geolengthmethodcallexpr', index: 144};
    this.rules[145] = {name: 'intersectsMethodCallExpr', lower: 'intersectsmethodcallexpr', index: 145};
    this.rules[146] = {name: 'boolParenExpr', lower: 'boolparenexpr', index: 146};
    this.rules[147] = {name: 'parenExpr', lower: 'parenexpr', index: 147};
    this.rules[148] = {name: 'andExpr', lower: 'andexpr', index: 148};
    this.rules[149] = {name: 'orExpr', lower: 'orexpr', index: 149};
    this.rules[150] = {name: 'eqExpr', lower: 'eqexpr', index: 150};
    this.rules[151] = {name: 'neExpr', lower: 'neexpr', index: 151};
    this.rules[152] = {name: 'ltExpr', lower: 'ltexpr', index: 152};
    this.rules[153] = {name: 'leExpr', lower: 'leexpr', index: 153};
    this.rules[154] = {name: 'gtExpr', lower: 'gtexpr', index: 154};
    this.rules[155] = {name: 'geExpr', lower: 'geexpr', index: 155};
    this.rules[156] = {name: 'hasExpr', lower: 'hasexpr', index: 156};
    this.rules[157] = {name: 'addExpr', lower: 'addexpr', index: 157};
    this.rules[158] = {name: 'subExpr', lower: 'subexpr', index: 158};
    this.rules[159] = {name: 'mulExpr', lower: 'mulexpr', index: 159};
    this.rules[160] = {name: 'divExpr', lower: 'divexpr', index: 160};
    this.rules[161] = {name: 'modExpr', lower: 'modexpr', index: 161};
    this.rules[162] = {name: 'negateExpr', lower: 'negateexpr', index: 162};
    this.rules[163] = {name: 'notExpr', lower: 'notexpr', index: 163};
    this.rules[164] = {name: 'isofExpr', lower: 'isofexpr', index: 164};
    this.rules[165] = {name: 'castExpr', lower: 'castexpr', index: 165};
    this.rules[166] = {name: 'arrayOrObject', lower: 'arrayorobject', index: 166};
    this.rules[167] = {name: 'complexColInUri', lower: 'complexcolinuri', index: 167};
    this.rules[168] = {name: 'complexInUri', lower: 'complexinuri', index: 168};
    this.rules[169] = {name: 'collectionPropertyInUri', lower: 'collectionpropertyinuri', index: 169};
    this.rules[170] = {name: 'primitiveColInUri', lower: 'primitivecolinuri', index: 170};
    this.rules[171] = {name: 'complexPropertyInUri', lower: 'complexpropertyinuri', index: 171};
    this.rules[172] = {name: 'annotationInUri', lower: 'annotationinuri', index: 172};
    this.rules[173] = {name: 'primitivePropertyInUri', lower: 'primitivepropertyinuri', index: 173};
    this.rules[174] = {name: 'navigationPropertyInUri', lower: 'navigationpropertyinuri', index: 174};
    this.rules[175] = {name: 'singleNavPropInJSON', lower: 'singlenavpropinjson', index: 175};
    this.rules[176] = {name: 'collectionNavPropInJSON', lower: 'collectionnavpropinjson', index: 176};
    this.rules[177] = {name: 'rootExprCol', lower: 'rootexprcol', index: 177};
    this.rules[178] = {name: 'begin-object', lower: 'begin-object', index: 178};
    this.rules[179] = {name: 'end-object', lower: 'end-object', index: 179};
    this.rules[180] = {name: 'begin-array', lower: 'begin-array', index: 180};
    this.rules[181] = {name: 'end-array', lower: 'end-array', index: 181};
    this.rules[182] = {name: 'quotation-mark', lower: 'quotation-mark', index: 182};
    this.rules[183] = {name: 'name-separator', lower: 'name-separator', index: 183};
    this.rules[184] = {name: 'value-separator', lower: 'value-separator', index: 184};
    this.rules[185] = {name: 'primitiveLiteralInJSON', lower: 'primitiveliteralinjson', index: 185};
    this.rules[186] = {name: 'stringInJSON', lower: 'stringinjson', index: 186};
    this.rules[187] = {name: 'charInJSON', lower: 'charinjson', index: 187};
    this.rules[188] = {name: 'qchar-JSON-special', lower: 'qchar-json-special', index: 188};
    this.rules[189] = {name: 'escape', lower: 'escape', index: 189};
    this.rules[190] = {name: 'numberInJSON', lower: 'numberinjson', index: 190};
    this.rules[191] = {name: 'int', lower: 'int', index: 191};
    this.rules[192] = {name: 'frac', lower: 'frac', index: 192};
    this.rules[193] = {name: 'exp', lower: 'exp', index: 193};
    this.rules[194] = {name: 'singleQualifiedTypeName', lower: 'singlequalifiedtypename', index: 194};
    this.rules[195] = {name: 'qualifiedTypeName', lower: 'qualifiedtypename', index: 195};
    this.rules[196] = {name: 'qualifiedEntityTypeName', lower: 'qualifiedentitytypename', index: 196};
    this.rules[197] = {name: 'qualifiedComplexTypeName', lower: 'qualifiedcomplextypename', index: 197};
    this.rules[198] = {name: 'qualifiedTypeDefinitionName', lower: 'qualifiedtypedefinitionname', index: 198};
    this.rules[199] = {name: 'qualifiedEnumTypeName', lower: 'qualifiedenumtypename', index: 199};
    this.rules[200] = {name: 'namespace', lower: 'namespace', index: 200};
    this.rules[201] = {name: 'namespacePart', lower: 'namespacepart', index: 201};
    this.rules[202] = {name: 'entitySetName', lower: 'entitysetname', index: 202};
    this.rules[203] = {name: 'singletonEntity', lower: 'singletonentity', index: 203};
    this.rules[204] = {name: 'entityTypeName', lower: 'entitytypename', index: 204};
    this.rules[205] = {name: 'complexTypeName', lower: 'complextypename', index: 205};
    this.rules[206] = {name: 'typeDefinitionName', lower: 'typedefinitionname', index: 206};
    this.rules[207] = {name: 'enumerationTypeName', lower: 'enumerationtypename', index: 207};
    this.rules[208] = {name: 'enumerationMember', lower: 'enumerationmember', index: 208};
    this.rules[209] = {name: 'termName', lower: 'termname', index: 209};
    this.rules[210] = {name: 'odataIdentifier', lower: 'odataidentifier', index: 210};
    this.rules[211] = {name: 'identifierLeadingCharacter', lower: 'identifierleadingcharacter', index: 211};
    this.rules[212] = {name: 'identifierCharacter', lower: 'identifiercharacter', index: 212};
    this.rules[213] = {name: 'primitiveTypeName', lower: 'primitivetypename', index: 213};
    this.rules[214] = {name: 'abstractSpatialTypeName', lower: 'abstractspatialtypename', index: 214};
    this.rules[215] = {name: 'concreteSpatialTypeName', lower: 'concretespatialtypename', index: 215};
    this.rules[216] = {name: 'primitiveProperty', lower: 'primitiveproperty', index: 216};
    this.rules[217] = {name: 'primitiveKeyProperty', lower: 'primitivekeyproperty', index: 217};
    this.rules[218] = {name: 'primitiveNonKeyProperty', lower: 'primitivenonkeyproperty', index: 218};
    this.rules[219] = {name: 'primitiveColProperty', lower: 'primitivecolproperty', index: 219};
    this.rules[220] = {name: 'complexProperty', lower: 'complexproperty', index: 220};
    this.rules[221] = {name: 'complexColProperty', lower: 'complexcolproperty', index: 221};
    this.rules[222] = {name: 'streamProperty', lower: 'streamproperty', index: 222};
    this.rules[223] = {name: 'navigationProperty', lower: 'navigationproperty', index: 223};
    this.rules[224] = {name: 'entityNavigationProperty', lower: 'entitynavigationproperty', index: 224};
    this.rules[225] = {name: 'entityColNavigationProperty', lower: 'entitycolnavigationproperty', index: 225};
    this.rules[226] = {name: 'action', lower: 'action', index: 226};
    this.rules[227] = {name: 'actionImport', lower: 'actionimport', index: 227};
    this.rules[228] = {name: 'function', lower: 'function', index: 228};
    this.rules[229] = {name: 'entityFunction', lower: 'entityfunction', index: 229};
    this.rules[230] = {name: 'entityColFunction', lower: 'entitycolfunction', index: 230};
    this.rules[231] = {name: 'complexFunction', lower: 'complexfunction', index: 231};
    this.rules[232] = {name: 'complexColFunction', lower: 'complexcolfunction', index: 232};
    this.rules[233] = {name: 'primitiveFunction', lower: 'primitivefunction', index: 233};
    this.rules[234] = {name: 'primitiveColFunction', lower: 'primitivecolfunction', index: 234};
    this.rules[235] = {name: 'entityFunctionImport', lower: 'entityfunctionimport', index: 235};
    this.rules[236] = {name: 'entityColFunctionImport', lower: 'entitycolfunctionimport', index: 236};
    this.rules[237] = {name: 'complexFunctionImport', lower: 'complexfunctionimport', index: 237};
    this.rules[238] = {name: 'complexColFunctionImport', lower: 'complexcolfunctionimport', index: 238};
    this.rules[239] = {name: 'primitiveFunctionImport', lower: 'primitivefunctionimport', index: 239};
    this.rules[240] = {name: 'primitiveColFunctionImport', lower: 'primitivecolfunctionimport', index: 240};
    this.rules[241] = {name: 'primitiveLiteral', lower: 'primitiveliteral', index: 241};
    this.rules[242] = {name: 'primitiveValue', lower: 'primitivevalue', index: 242};
    this.rules[243] = {name: 'nullValue', lower: 'nullvalue', index: 243};
    this.rules[244] = {name: 'binary', lower: 'binary', index: 244};
    this.rules[245] = {name: 'binaryValue', lower: 'binaryvalue', index: 245};
    this.rules[246] = {name: 'base64b16', lower: 'base64b16', index: 246};
    this.rules[247] = {name: 'base64b8', lower: 'base64b8', index: 247};
    this.rules[248] = {name: 'base64char', lower: 'base64char', index: 248};
    this.rules[249] = {name: 'booleanValue', lower: 'booleanvalue', index: 249};
    this.rules[250] = {name: 'decimalValue', lower: 'decimalvalue', index: 250};
    this.rules[251] = {name: 'doubleValue', lower: 'doublevalue', index: 251};
    this.rules[252] = {name: 'singleValue', lower: 'singlevalue', index: 252};
    this.rules[253] = {name: 'nanInfinity', lower: 'naninfinity', index: 253};
    this.rules[254] = {name: 'guidValue', lower: 'guidvalue', index: 254};
    this.rules[255] = {name: 'byteValue', lower: 'bytevalue', index: 255};
    this.rules[256] = {name: 'sbyteValue', lower: 'sbytevalue', index: 256};
    this.rules[257] = {name: 'int16Value', lower: 'int16value', index: 257};
    this.rules[258] = {name: 'int32Value', lower: 'int32value', index: 258};
    this.rules[259] = {name: 'int64Value', lower: 'int64value', index: 259};
    this.rules[260] = {name: 'string', lower: 'string', index: 260};
    this.rules[261] = {name: 'SQUOTE-in-string', lower: 'squote-in-string', index: 261};
    this.rules[262] = {name: 'dateValue', lower: 'datevalue', index: 262};
    this.rules[263] = {name: 'dateTimeOffsetValue', lower: 'datetimeoffsetvalue', index: 263};
    this.rules[264] = {name: 'duration', lower: 'duration', index: 264};
    this.rules[265] = {name: 'durationValue', lower: 'durationvalue', index: 265};
    this.rules[266] = {name: 'timeOfDayValue', lower: 'timeofdayvalue', index: 266};
    this.rules[267] = {name: 'oneToNine', lower: 'onetonine', index: 267};
    this.rules[268] = {name: 'zeroToFiftyNine', lower: 'zerotofiftynine', index: 268};
    this.rules[269] = {name: 'year', lower: 'year', index: 269};
    this.rules[270] = {name: 'month', lower: 'month', index: 270};
    this.rules[271] = {name: 'day', lower: 'day', index: 271};
    this.rules[272] = {name: 'hour', lower: 'hour', index: 272};
    this.rules[273] = {name: 'minute', lower: 'minute', index: 273};
    this.rules[274] = {name: 'second', lower: 'second', index: 274};
    this.rules[275] = {name: 'fractionalSeconds', lower: 'fractionalseconds', index: 275};
    this.rules[276] = {name: 'enum', lower: 'enum', index: 276};
    this.rules[277] = {name: 'enumValue', lower: 'enumvalue', index: 277};
    this.rules[278] = {name: 'singleEnumValue', lower: 'singleenumvalue', index: 278};
    this.rules[279] = {name: 'enumMemberValue', lower: 'enummembervalue', index: 279};
    this.rules[280] = {name: 'geographyCollection', lower: 'geographycollection', index: 280};
    this.rules[281] = {name: 'fullCollectionLiteral', lower: 'fullcollectionliteral', index: 281};
    this.rules[282] = {name: 'collectionLiteral', lower: 'collectionliteral', index: 282};
    this.rules[283] = {name: 'geoLiteral', lower: 'geoliteral', index: 283};
    this.rules[284] = {name: 'geographyLineString', lower: 'geographylinestring', index: 284};
    this.rules[285] = {name: 'fullLineStringLiteral', lower: 'fulllinestringliteral', index: 285};
    this.rules[286] = {name: 'lineStringLiteral', lower: 'linestringliteral', index: 286};
    this.rules[287] = {name: 'lineStringData', lower: 'linestringdata', index: 287};
    this.rules[288] = {name: 'geographyMultiLineString', lower: 'geographymultilinestring', index: 288};
    this.rules[289] = {name: 'fullMultiLineStringLiteral', lower: 'fullmultilinestringliteral', index: 289};
    this.rules[290] = {name: 'multiLineStringLiteral', lower: 'multilinestringliteral', index: 290};
    this.rules[291] = {name: 'geographyMultiPoint', lower: 'geographymultipoint', index: 291};
    this.rules[292] = {name: 'fullMultiPointLiteral', lower: 'fullmultipointliteral', index: 292};
    this.rules[293] = {name: 'multiPointLiteral', lower: 'multipointliteral', index: 293};
    this.rules[294] = {name: 'geographyMultiPolygon', lower: 'geographymultipolygon', index: 294};
    this.rules[295] = {name: 'fullMultiPolygonLiteral', lower: 'fullmultipolygonliteral', index: 295};
    this.rules[296] = {name: 'multiPolygonLiteral', lower: 'multipolygonliteral', index: 296};
    this.rules[297] = {name: 'geographyPoint', lower: 'geographypoint', index: 297};
    this.rules[298] = {name: 'fullPointLiteral', lower: 'fullpointliteral', index: 298};
    this.rules[299] = {name: 'sridLiteral', lower: 'sridliteral', index: 299};
    this.rules[300] = {name: 'pointLiteral', lower: 'pointliteral', index: 300};
    this.rules[301] = {name: 'pointData', lower: 'pointdata', index: 301};
    this.rules[302] = {name: 'positionLiteral', lower: 'positionliteral', index: 302};
    this.rules[303] = {name: 'geographyPolygon', lower: 'geographypolygon', index: 303};
    this.rules[304] = {name: 'fullPolygonLiteral', lower: 'fullpolygonliteral', index: 304};
    this.rules[305] = {name: 'polygonLiteral', lower: 'polygonliteral', index: 305};
    this.rules[306] = {name: 'polygonData', lower: 'polygondata', index: 306};
    this.rules[307] = {name: 'ringLiteral', lower: 'ringliteral', index: 307};
    this.rules[308] = {name: 'geometryCollection', lower: 'geometrycollection', index: 308};
    this.rules[309] = {name: 'geometryLineString', lower: 'geometrylinestring', index: 309};
    this.rules[310] = {name: 'geometryMultiLineString', lower: 'geometrymultilinestring', index: 310};
    this.rules[311] = {name: 'geometryMultiPoint', lower: 'geometrymultipoint', index: 311};
    this.rules[312] = {name: 'geometryMultiPolygon', lower: 'geometrymultipolygon', index: 312};
    this.rules[313] = {name: 'geometryPoint', lower: 'geometrypoint', index: 313};
    this.rules[314] = {name: 'geometryPolygon', lower: 'geometrypolygon', index: 314};
    this.rules[315] = {name: 'geographyPrefix', lower: 'geographyprefix', index: 315};
    this.rules[316] = {name: 'geometryPrefix', lower: 'geometryprefix', index: 316};
    this.rules[317] = {name: 'header', lower: 'header', index: 317};
    this.rules[318] = {name: 'content-id', lower: 'content-id', index: 318};
    this.rules[319] = {name: 'odata-entityid', lower: 'odata-entityid', index: 319};
    this.rules[320] = {name: 'odata-isolation', lower: 'odata-isolation', index: 320};
    this.rules[321] = {name: 'odata-maxversion', lower: 'odata-maxversion', index: 321};
    this.rules[322] = {name: 'odata-version', lower: 'odata-version', index: 322};
    this.rules[323] = {name: 'prefer', lower: 'prefer', index: 323};
    this.rules[324] = {name: 'preference', lower: 'preference', index: 324};
    this.rules[325] = {name: 'allowEntityReferencesPreference', lower: 'allowentityreferencespreference', index: 325};
    this.rules[326] = {name: 'callbackPreference', lower: 'callbackpreference', index: 326};
    this.rules[327] = {name: 'continueOnErrorPreference', lower: 'continueonerrorpreference', index: 327};
    this.rules[328] = {name: 'includeAnnotationsPreference', lower: 'includeannotationspreference', index: 328};
    this.rules[329] = {name: 'annotationsList', lower: 'annotationslist', index: 329};
    this.rules[330] = {name: 'annotationIdentifier', lower: 'annotationidentifier', index: 330};
    this.rules[331] = {name: 'excludeOperator', lower: 'excludeoperator', index: 331};
    this.rules[332] = {name: 'maxpagesizePreference', lower: 'maxpagesizepreference', index: 332};
    this.rules[333] = {name: 'respondAsyncPreference', lower: 'respondasyncpreference', index: 333};
    this.rules[334] = {name: 'returnPreference', lower: 'returnpreference', index: 334};
    this.rules[335] = {name: 'trackChangesPreference', lower: 'trackchangespreference', index: 335};
    this.rules[336] = {name: 'waitPreference', lower: 'waitpreference', index: 336};
    this.rules[337] = {name: 'obs-text', lower: 'obs-text', index: 337};
    this.rules[338] = {name: 'OWS', lower: 'ows', index: 338};
    this.rules[339] = {name: 'BWS-h', lower: 'bws-h', index: 339};
    this.rules[340] = {name: 'EQ-h', lower: 'eq-h', index: 340};
    this.rules[341] = {name: 'RWS', lower: 'rws', index: 341};
    this.rules[342] = {name: 'BWS', lower: 'bws', index: 342};
    this.rules[343] = {name: 'AT', lower: 'at', index: 343};
    this.rules[344] = {name: 'COLON', lower: 'colon', index: 344};
    this.rules[345] = {name: 'COMMA', lower: 'comma', index: 345};
    this.rules[346] = {name: 'EQ', lower: 'eq', index: 346};
    this.rules[347] = {name: 'SIGN', lower: 'sign', index: 347};
    this.rules[348] = {name: 'SEMI', lower: 'semi', index: 348};
    this.rules[349] = {name: 'STAR', lower: 'star', index: 349};
    this.rules[350] = {name: 'SQUOTE', lower: 'squote', index: 350};
    this.rules[351] = {name: 'OPEN', lower: 'open', index: 351};
    this.rules[352] = {name: 'CLOSE', lower: 'close', index: 352};
    this.rules[353] = {name: 'URI', lower: 'uri', index: 353};
    this.rules[354] = {name: 'hier-part', lower: 'hier-part', index: 354};
    this.rules[355] = {name: 'scheme', lower: 'scheme', index: 355};
    this.rules[356] = {name: 'authority', lower: 'authority', index: 356};
    this.rules[357] = {name: 'userinfo', lower: 'userinfo', index: 357};
    this.rules[358] = {name: 'host', lower: 'host', index: 358};
    this.rules[359] = {name: 'port', lower: 'port', index: 359};
    this.rules[360] = {name: 'IP-literal', lower: 'ip-literal', index: 360};
    this.rules[361] = {name: 'IPvFuture', lower: 'ipvfuture', index: 361};
    this.rules[362] = {name: 'IPv6address', lower: 'ipv6address', index: 362};
    this.rules[363] = {name: 'h16', lower: 'h16', index: 363};
    this.rules[364] = {name: 'ls32', lower: 'ls32', index: 364};
    this.rules[365] = {name: 'IPv4address', lower: 'ipv4address', index: 365};
    this.rules[366] = {name: 'dec-octet', lower: 'dec-octet', index: 366};
    this.rules[367] = {name: 'reg-name', lower: 'reg-name', index: 367};
    this.rules[368] = {name: 'path-abempty', lower: 'path-abempty', index: 368};
    this.rules[369] = {name: 'path-absolute', lower: 'path-absolute', index: 369};
    this.rules[370] = {name: 'path-rootless', lower: 'path-rootless', index: 370};
    this.rules[371] = {name: 'segment', lower: 'segment', index: 371};
    this.rules[372] = {name: 'segment-nz', lower: 'segment-nz', index: 372};
    this.rules[373] = {name: 'pchar', lower: 'pchar', index: 373};
    this.rules[374] = {name: 'query', lower: 'query', index: 374};
    this.rules[375] = {name: 'fragment', lower: 'fragment', index: 375};
    this.rules[376] = {name: 'pct-encoded', lower: 'pct-encoded', index: 376};
    this.rules[377] = {name: 'unreserved', lower: 'unreserved', index: 377};
    this.rules[378] = {name: 'sub-delims', lower: 'sub-delims', index: 378};
    this.rules[379] = {name: 'other-delims', lower: 'other-delims', index: 379};
    this.rules[380] = {name: 'pchar-no-SQUOTE', lower: 'pchar-no-squote', index: 380};
    this.rules[381] = {name: 'pct-encoded-no-SQUOTE', lower: 'pct-encoded-no-squote', index: 381};
    this.rules[382] = {name: 'qchar-no-AMP', lower: 'qchar-no-amp', index: 382};
    this.rules[383] = {name: 'qchar-no-AMP-EQ', lower: 'qchar-no-amp-eq', index: 383};
    this.rules[384] = {name: 'qchar-no-AMP-EQ-AT-DOLLAR', lower: 'qchar-no-amp-eq-at-dollar', index: 384};
    this.rules[385] = {name: 'qchar-unescaped', lower: 'qchar-unescaped', index: 385};
    this.rules[386] = {name: 'pct-encoded-unescaped', lower: 'pct-encoded-unescaped', index: 386};
    this.rules[387] = {name: 'qchar-no-AMP-DQUOTE', lower: 'qchar-no-amp-dquote', index: 387};
    this.rules[388] = {name: 'IRI-in-header', lower: 'iri-in-header', index: 388};
    this.rules[389] = {name: 'IRI-in-query', lower: 'iri-in-query', index: 389};
    this.rules[390] = {name: 'ALPHA', lower: 'alpha', index: 390};
    this.rules[391] = {name: 'DIGIT', lower: 'digit', index: 391};
    this.rules[392] = {name: 'HEXDIG', lower: 'hexdig', index: 392};
    this.rules[393] = {name: 'A-to-F', lower: 'a-to-f', index: 393};
    this.rules[394] = {name: 'DQUOTE', lower: 'dquote', index: 394};
    this.rules[395] = {name: 'SP', lower: 'sp', index: 395};
    this.rules[396] = {name: 'HTAB', lower: 'htab', index: 396};
    this.rules[397] = {name: 'VCHAR', lower: 'vchar', index: 397};

    // UDTS
    this.udts = [];

    // OPCODES
    // dummyStartRule
    this.rules[0].opcodes = [];
    this.rules[0].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(odataUri)
    this.rules[0].opcodes[2] = {type: 4, index: 317};// RNM(header)
    this.rules[0].opcodes[3] = {type: 4, index: 242};// RNM(primitiveValue)

    // odataUri
    this.rules[1].opcodes = [];
    this.rules[1].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[1].opcodes[1] = {type: 4, index: 2};// RNM(serviceRoot)
    this.rules[1].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[1].opcodes[3] = {type: 4, index: 3};// RNM(odataRelativeUri)

    // serviceRoot
    this.rules[2].opcodes = [];
    this.rules[2].opcodes[0] = {type: 2, children: [1,4,5,6,10,11]};// CAT
    this.rules[2].opcodes[1] = {type: 1, children: [2,3]};// ALT
    this.rules[2].opcodes[2] = {type: 9, string: [104,116,116,112,115]};// TLS
    this.rules[2].opcodes[3] = {type: 9, string: [104,116,116,112]};// TLS
    this.rules[2].opcodes[4] = {type: 9, string: [58,47,47]};// TLS
    this.rules[2].opcodes[5] = {type: 4, index: 358};// RNM(host)
    this.rules[2].opcodes[6] = {type: 3, min: 0, max: 1};// REP
    this.rules[2].opcodes[7] = {type: 2, children: [8,9]};// CAT
    this.rules[2].opcodes[8] = {type: 9, string: [58]};// TLS
    this.rules[2].opcodes[9] = {type: 4, index: 359};// RNM(port)
    this.rules[2].opcodes[10] = {type: 9, string: [47]};// TLS
    this.rules[2].opcodes[11] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[2].opcodes[12] = {type: 2, children: [13,14]};// CAT
    this.rules[2].opcodes[13] = {type: 4, index: 372};// RNM(segment-nz)
    this.rules[2].opcodes[14] = {type: 9, string: [47]};// TLS

    // odataRelativeUri
    this.rules[3].opcodes = [];
    this.rules[3].opcodes[0] = {type: 1, children: [1,2,6,12,20]};// ALT
    this.rules[3].opcodes[1] = {type: 10, string: [36,98,97,116,99,104]};// TBS
    this.rules[3].opcodes[2] = {type: 2, children: [3,4,5]};// CAT
    this.rules[3].opcodes[3] = {type: 10, string: [36,101,110,116,105,116,121]};// TBS
    this.rules[3].opcodes[4] = {type: 9, string: [63]};// TLS
    this.rules[3].opcodes[5] = {type: 4, index: 43};// RNM(entityOptions)
    this.rules[3].opcodes[6] = {type: 2, children: [7,8,9,10,11]};// CAT
    this.rules[3].opcodes[7] = {type: 10, string: [36,101,110,116,105,116,121]};// TBS
    this.rules[3].opcodes[8] = {type: 9, string: [47]};// TLS
    this.rules[3].opcodes[9] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[3].opcodes[10] = {type: 9, string: [63]};// TLS
    this.rules[3].opcodes[11] = {type: 4, index: 45};// RNM(entityCastOptions)
    this.rules[3].opcodes[12] = {type: 2, children: [13,14,18]};// CAT
    this.rules[3].opcodes[13] = {type: 10, string: [36,109,101,116,97,100,97,116,97]};// TBS
    this.rules[3].opcodes[14] = {type: 3, min: 0, max: 1};// REP
    this.rules[3].opcodes[15] = {type: 2, children: [16,17]};// CAT
    this.rules[3].opcodes[16] = {type: 9, string: [63]};// TLS
    this.rules[3].opcodes[17] = {type: 4, index: 61};// RNM(format)
    this.rules[3].opcodes[18] = {type: 3, min: 0, max: 1};// REP
    this.rules[3].opcodes[19] = {type: 4, index: 84};// RNM(context)
    this.rules[3].opcodes[20] = {type: 2, children: [21,22]};// CAT
    this.rules[3].opcodes[21] = {type: 4, index: 4};// RNM(resourcePath)
    this.rules[3].opcodes[22] = {type: 3, min: 0, max: 1};// REP
    this.rules[3].opcodes[23] = {type: 2, children: [24,25]};// CAT
    this.rules[3].opcodes[24] = {type: 9, string: [63]};// TLS
    this.rules[3].opcodes[25] = {type: 4, index: 41};// RNM(queryOptions)

    // resourcePath
    this.rules[4].opcodes = [];
    this.rules[4].opcodes[0] = {type: 1, children: [1,5,9,10,14,18,22,26,30,34,35]};// ALT
    this.rules[4].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[4].opcodes[2] = {type: 4, index: 202};// RNM(entitySetName)
    this.rules[4].opcodes[3] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[4] = {type: 4, index: 5};// RNM(collectionNavigation)
    this.rules[4].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[4].opcodes[6] = {type: 4, index: 203};// RNM(singletonEntity)
    this.rules[4].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[8] = {type: 4, index: 13};// RNM(singleNavigation)
    this.rules[4].opcodes[9] = {type: 4, index: 22};// RNM(actionImportCall)
    this.rules[4].opcodes[10] = {type: 2, children: [11,12]};// CAT
    this.rules[4].opcodes[11] = {type: 4, index: 31};// RNM(entityColFunctionImportCall)
    this.rules[4].opcodes[12] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[13] = {type: 4, index: 5};// RNM(collectionNavigation)
    this.rules[4].opcodes[14] = {type: 2, children: [15,16]};// CAT
    this.rules[4].opcodes[15] = {type: 4, index: 30};// RNM(entityFunctionImportCall)
    this.rules[4].opcodes[16] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[17] = {type: 4, index: 13};// RNM(singleNavigation)
    this.rules[4].opcodes[18] = {type: 2, children: [19,20]};// CAT
    this.rules[4].opcodes[19] = {type: 4, index: 33};// RNM(complexColFunctionImportCall)
    this.rules[4].opcodes[20] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[21] = {type: 4, index: 15};// RNM(collectionPath)
    this.rules[4].opcodes[22] = {type: 2, children: [23,24]};// CAT
    this.rules[4].opcodes[23] = {type: 4, index: 32};// RNM(complexFunctionImportCall)
    this.rules[4].opcodes[24] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[25] = {type: 4, index: 17};// RNM(complexPath)
    this.rules[4].opcodes[26] = {type: 2, children: [27,28]};// CAT
    this.rules[4].opcodes[27] = {type: 4, index: 35};// RNM(primitiveColFunctionImportCall)
    this.rules[4].opcodes[28] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[29] = {type: 4, index: 15};// RNM(collectionPath)
    this.rules[4].opcodes[30] = {type: 2, children: [31,32]};// CAT
    this.rules[4].opcodes[31] = {type: 4, index: 34};// RNM(primitiveFunctionImportCall)
    this.rules[4].opcodes[32] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[33] = {type: 4, index: 16};// RNM(singlePath)
    this.rules[4].opcodes[34] = {type: 4, index: 40};// RNM(crossjoin)
    this.rules[4].opcodes[35] = {type: 10, string: [36,97,108,108]};// TBS

    // collectionNavigation
    this.rules[5].opcodes = [];
    this.rules[5].opcodes[0] = {type: 2, children: [1,5]};// CAT
    this.rules[5].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[5].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[5].opcodes[3] = {type: 9, string: [47]};// TLS
    this.rules[5].opcodes[4] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[5].opcodes[5] = {type: 3, min: 0, max: 1};// REP
    this.rules[5].opcodes[6] = {type: 4, index: 6};// RNM(collectionNavPath)

    // collectionNavPath
    this.rules[6].opcodes = [];
    this.rules[6].opcodes[0] = {type: 1, children: [1,5,6]};// ALT
    this.rules[6].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[6].opcodes[2] = {type: 4, index: 7};// RNM(keyPredicate)
    this.rules[6].opcodes[3] = {type: 3, min: 0, max: 1};// REP
    this.rules[6].opcodes[4] = {type: 4, index: 13};// RNM(singleNavigation)
    this.rules[6].opcodes[5] = {type: 4, index: 15};// RNM(collectionPath)
    this.rules[6].opcodes[6] = {type: 4, index: 19};// RNM(ref)

    // keyPredicate
    this.rules[7].opcodes = [];
    this.rules[7].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[7].opcodes[1] = {type: 4, index: 8};// RNM(simpleKey)
    this.rules[7].opcodes[2] = {type: 4, index: 9};// RNM(compoundKey)

    // simpleKey
    this.rules[8].opcodes = [];
    this.rules[8].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[8].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[8].opcodes[2] = {type: 4, index: 11};// RNM(keyPropertyValue)
    this.rules[8].opcodes[3] = {type: 4, index: 352};// RNM(CLOSE)

    // compoundKey
    this.rules[9].opcodes = [];
    this.rules[9].opcodes[0] = {type: 2, children: [1,2,3,7]};// CAT
    this.rules[9].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[9].opcodes[2] = {type: 4, index: 10};// RNM(keyValuePair)
    this.rules[9].opcodes[3] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[9].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[9].opcodes[5] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[9].opcodes[6] = {type: 4, index: 10};// RNM(keyValuePair)
    this.rules[9].opcodes[7] = {type: 4, index: 352};// RNM(CLOSE)

    // keyValuePair
    this.rules[10].opcodes = [];
    this.rules[10].opcodes[0] = {type: 2, children: [1,4,5]};// CAT
    this.rules[10].opcodes[1] = {type: 1, children: [2,3]};// ALT
    this.rules[10].opcodes[2] = {type: 4, index: 217};// RNM(primitiveKeyProperty)
    this.rules[10].opcodes[3] = {type: 4, index: 12};// RNM(keyPropertyAlias)
    this.rules[10].opcodes[4] = {type: 4, index: 346};// RNM(EQ)
    this.rules[10].opcodes[5] = {type: 4, index: 11};// RNM(keyPropertyValue)

    // keyPropertyValue
    this.rules[11].opcodes = [];
    this.rules[11].opcodes[0] = {type: 4, index: 241};// RNM(primitiveLiteral)

    // keyPropertyAlias
    this.rules[12].opcodes = [];
    this.rules[12].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // singleNavigation
    this.rules[13].opcodes = [];
    this.rules[13].opcodes[0] = {type: 2, children: [1,5]};// CAT
    this.rules[13].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[13].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[13].opcodes[3] = {type: 9, string: [47]};// TLS
    this.rules[13].opcodes[4] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[13].opcodes[5] = {type: 3, min: 0, max: 1};// REP
    this.rules[13].opcodes[6] = {type: 1, children: [7,10,11,12]};// ALT
    this.rules[13].opcodes[7] = {type: 2, children: [8,9]};// CAT
    this.rules[13].opcodes[8] = {type: 9, string: [47]};// TLS
    this.rules[13].opcodes[9] = {type: 4, index: 14};// RNM(propertyPath)
    this.rules[13].opcodes[10] = {type: 4, index: 21};// RNM(boundOperation)
    this.rules[13].opcodes[11] = {type: 4, index: 19};// RNM(ref)
    this.rules[13].opcodes[12] = {type: 4, index: 20};// RNM(value)

    // propertyPath
    this.rules[14].opcodes = [];
    this.rules[14].opcodes[0] = {type: 1, children: [1,5,9,13,17,21,25]};// ALT
    this.rules[14].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[14].opcodes[2] = {type: 4, index: 225};// RNM(entityColNavigationProperty)
    this.rules[14].opcodes[3] = {type: 3, min: 0, max: 1};// REP
    this.rules[14].opcodes[4] = {type: 4, index: 5};// RNM(collectionNavigation)
    this.rules[14].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[14].opcodes[6] = {type: 4, index: 224};// RNM(entityNavigationProperty)
    this.rules[14].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[14].opcodes[8] = {type: 4, index: 13};// RNM(singleNavigation)
    this.rules[14].opcodes[9] = {type: 2, children: [10,11]};// CAT
    this.rules[14].opcodes[10] = {type: 4, index: 221};// RNM(complexColProperty)
    this.rules[14].opcodes[11] = {type: 3, min: 0, max: 1};// REP
    this.rules[14].opcodes[12] = {type: 4, index: 15};// RNM(collectionPath)
    this.rules[14].opcodes[13] = {type: 2, children: [14,15]};// CAT
    this.rules[14].opcodes[14] = {type: 4, index: 220};// RNM(complexProperty)
    this.rules[14].opcodes[15] = {type: 3, min: 0, max: 1};// REP
    this.rules[14].opcodes[16] = {type: 4, index: 17};// RNM(complexPath)
    this.rules[14].opcodes[17] = {type: 2, children: [18,19]};// CAT
    this.rules[14].opcodes[18] = {type: 4, index: 219};// RNM(primitiveColProperty)
    this.rules[14].opcodes[19] = {type: 3, min: 0, max: 1};// REP
    this.rules[14].opcodes[20] = {type: 4, index: 15};// RNM(collectionPath)
    this.rules[14].opcodes[21] = {type: 2, children: [22,23]};// CAT
    this.rules[14].opcodes[22] = {type: 4, index: 216};// RNM(primitiveProperty)
    this.rules[14].opcodes[23] = {type: 3, min: 0, max: 1};// REP
    this.rules[14].opcodes[24] = {type: 4, index: 16};// RNM(singlePath)
    this.rules[14].opcodes[25] = {type: 2, children: [26,27]};// CAT
    this.rules[14].opcodes[26] = {type: 4, index: 222};// RNM(streamProperty)
    this.rules[14].opcodes[27] = {type: 3, min: 0, max: 1};// REP
    this.rules[14].opcodes[28] = {type: 4, index: 21};// RNM(boundOperation)

    // collectionPath
    this.rules[15].opcodes = [];
    this.rules[15].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[15].opcodes[1] = {type: 4, index: 18};// RNM(count)
    this.rules[15].opcodes[2] = {type: 4, index: 21};// RNM(boundOperation)

    // singlePath
    this.rules[16].opcodes = [];
    this.rules[16].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[16].opcodes[1] = {type: 4, index: 20};// RNM(value)
    this.rules[16].opcodes[2] = {type: 4, index: 21};// RNM(boundOperation)

    // complexPath
    this.rules[17].opcodes = [];
    this.rules[17].opcodes[0] = {type: 2, children: [1,5]};// CAT
    this.rules[17].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[17].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[17].opcodes[3] = {type: 9, string: [47]};// TLS
    this.rules[17].opcodes[4] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[17].opcodes[5] = {type: 1, children: [6,9]};// ALT
    this.rules[17].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[17].opcodes[7] = {type: 9, string: [47]};// TLS
    this.rules[17].opcodes[8] = {type: 4, index: 14};// RNM(propertyPath)
    this.rules[17].opcodes[9] = {type: 4, index: 21};// RNM(boundOperation)

    // count
    this.rules[18].opcodes = [];
    this.rules[18].opcodes[0] = {type: 10, string: [47,36,99,111,117,110,116]};// TBS

    // ref
    this.rules[19].opcodes = [];
    this.rules[19].opcodes[0] = {type: 10, string: [47,36,114,101,102]};// TBS

    // value
    this.rules[20].opcodes = [];
    this.rules[20].opcodes[0] = {type: 10, string: [47,36,118,97,108,117,101]};// TBS

    // boundOperation
    this.rules[21].opcodes = [];
    this.rules[21].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[21].opcodes[1] = {type: 9, string: [47]};// TLS
    this.rules[21].opcodes[2] = {type: 1, children: [3,4,8,12,20,24,28]};// ALT
    this.rules[21].opcodes[3] = {type: 4, index: 23};// RNM(boundActionCall)
    this.rules[21].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[21].opcodes[5] = {type: 4, index: 25};// RNM(boundEntityColFuncCall)
    this.rules[21].opcodes[6] = {type: 3, min: 0, max: 1};// REP
    this.rules[21].opcodes[7] = {type: 4, index: 5};// RNM(collectionNavigation)
    this.rules[21].opcodes[8] = {type: 2, children: [9,10]};// CAT
    this.rules[21].opcodes[9] = {type: 4, index: 24};// RNM(boundEntityFuncCall)
    this.rules[21].opcodes[10] = {type: 3, min: 0, max: 1};// REP
    this.rules[21].opcodes[11] = {type: 4, index: 13};// RNM(singleNavigation)
    this.rules[21].opcodes[12] = {type: 2, children: [13,14,18]};// CAT
    this.rules[21].opcodes[13] = {type: 4, index: 27};// RNM(boundComplexColFuncCall)
    this.rules[21].opcodes[14] = {type: 3, min: 0, max: 1};// REP
    this.rules[21].opcodes[15] = {type: 2, children: [16,17]};// CAT
    this.rules[21].opcodes[16] = {type: 9, string: [47]};// TLS
    this.rules[21].opcodes[17] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[21].opcodes[18] = {type: 3, min: 0, max: 1};// REP
    this.rules[21].opcodes[19] = {type: 4, index: 15};// RNM(collectionPath)
    this.rules[21].opcodes[20] = {type: 2, children: [21,22]};// CAT
    this.rules[21].opcodes[21] = {type: 4, index: 26};// RNM(boundComplexFuncCall)
    this.rules[21].opcodes[22] = {type: 3, min: 0, max: 1};// REP
    this.rules[21].opcodes[23] = {type: 4, index: 17};// RNM(complexPath)
    this.rules[21].opcodes[24] = {type: 2, children: [25,26]};// CAT
    this.rules[21].opcodes[25] = {type: 4, index: 29};// RNM(boundPrimitiveColFuncCall)
    this.rules[21].opcodes[26] = {type: 3, min: 0, max: 1};// REP
    this.rules[21].opcodes[27] = {type: 4, index: 15};// RNM(collectionPath)
    this.rules[21].opcodes[28] = {type: 2, children: [29,30]};// CAT
    this.rules[21].opcodes[29] = {type: 4, index: 28};// RNM(boundPrimitiveFuncCall)
    this.rules[21].opcodes[30] = {type: 3, min: 0, max: 1};// REP
    this.rules[21].opcodes[31] = {type: 4, index: 16};// RNM(singlePath)

    // actionImportCall
    this.rules[22].opcodes = [];
    this.rules[22].opcodes[0] = {type: 4, index: 227};// RNM(actionImport)

    // boundActionCall
    this.rules[23].opcodes = [];
    this.rules[23].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[23].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[23].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[23].opcodes[3] = {type: 4, index: 226};// RNM(action)

    // boundEntityFuncCall
    this.rules[24].opcodes = [];
    this.rules[24].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[24].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[24].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[24].opcodes[3] = {type: 4, index: 229};// RNM(entityFunction)
    this.rules[24].opcodes[4] = {type: 4, index: 36};// RNM(functionParameters)

    // boundEntityColFuncCall
    this.rules[25].opcodes = [];
    this.rules[25].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[25].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[25].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[25].opcodes[3] = {type: 4, index: 230};// RNM(entityColFunction)
    this.rules[25].opcodes[4] = {type: 4, index: 36};// RNM(functionParameters)

    // boundComplexFuncCall
    this.rules[26].opcodes = [];
    this.rules[26].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[26].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[26].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[26].opcodes[3] = {type: 4, index: 231};// RNM(complexFunction)
    this.rules[26].opcodes[4] = {type: 4, index: 36};// RNM(functionParameters)

    // boundComplexColFuncCall
    this.rules[27].opcodes = [];
    this.rules[27].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[27].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[27].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[27].opcodes[3] = {type: 4, index: 232};// RNM(complexColFunction)
    this.rules[27].opcodes[4] = {type: 4, index: 36};// RNM(functionParameters)

    // boundPrimitiveFuncCall
    this.rules[28].opcodes = [];
    this.rules[28].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[28].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[28].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[28].opcodes[3] = {type: 4, index: 233};// RNM(primitiveFunction)
    this.rules[28].opcodes[4] = {type: 4, index: 36};// RNM(functionParameters)

    // boundPrimitiveColFuncCall
    this.rules[29].opcodes = [];
    this.rules[29].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[29].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[29].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[29].opcodes[3] = {type: 4, index: 234};// RNM(primitiveColFunction)
    this.rules[29].opcodes[4] = {type: 4, index: 36};// RNM(functionParameters)

    // entityFunctionImportCall
    this.rules[30].opcodes = [];
    this.rules[30].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[30].opcodes[1] = {type: 4, index: 235};// RNM(entityFunctionImport)
    this.rules[30].opcodes[2] = {type: 4, index: 36};// RNM(functionParameters)

    // entityColFunctionImportCall
    this.rules[31].opcodes = [];
    this.rules[31].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[31].opcodes[1] = {type: 4, index: 236};// RNM(entityColFunctionImport)
    this.rules[31].opcodes[2] = {type: 4, index: 36};// RNM(functionParameters)

    // complexFunctionImportCall
    this.rules[32].opcodes = [];
    this.rules[32].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[32].opcodes[1] = {type: 4, index: 237};// RNM(complexFunctionImport)
    this.rules[32].opcodes[2] = {type: 4, index: 36};// RNM(functionParameters)

    // complexColFunctionImportCall
    this.rules[33].opcodes = [];
    this.rules[33].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[33].opcodes[1] = {type: 4, index: 238};// RNM(complexColFunctionImport)
    this.rules[33].opcodes[2] = {type: 4, index: 36};// RNM(functionParameters)

    // primitiveFunctionImportCall
    this.rules[34].opcodes = [];
    this.rules[34].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[34].opcodes[1] = {type: 4, index: 239};// RNM(primitiveFunctionImport)
    this.rules[34].opcodes[2] = {type: 4, index: 36};// RNM(functionParameters)

    // primitiveColFunctionImportCall
    this.rules[35].opcodes = [];
    this.rules[35].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[35].opcodes[1] = {type: 4, index: 240};// RNM(primitiveColFunctionImport)
    this.rules[35].opcodes[2] = {type: 4, index: 36};// RNM(functionParameters)

    // functionParameters
    this.rules[36].opcodes = [];
    this.rules[36].opcodes[0] = {type: 2, children: [1,2,9]};// CAT
    this.rules[36].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[36].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[36].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[36].opcodes[4] = {type: 4, index: 37};// RNM(functionParameter)
    this.rules[36].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[36].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[36].opcodes[7] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[36].opcodes[8] = {type: 4, index: 37};// RNM(functionParameter)
    this.rules[36].opcodes[9] = {type: 4, index: 352};// RNM(CLOSE)

    // functionParameter
    this.rules[37].opcodes = [];
    this.rules[37].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[37].opcodes[1] = {type: 4, index: 38};// RNM(parameterName)
    this.rules[37].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[37].opcodes[3] = {type: 1, children: [4,5]};// ALT
    this.rules[37].opcodes[4] = {type: 4, index: 39};// RNM(parameterAlias)
    this.rules[37].opcodes[5] = {type: 4, index: 241};// RNM(primitiveLiteral)

    // parameterName
    this.rules[38].opcodes = [];
    this.rules[38].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // parameterAlias
    this.rules[39].opcodes = [];
    this.rules[39].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[39].opcodes[1] = {type: 4, index: 343};// RNM(AT)
    this.rules[39].opcodes[2] = {type: 4, index: 210};// RNM(odataIdentifier)

    // crossjoin
    this.rules[40].opcodes = [];
    this.rules[40].opcodes[0] = {type: 2, children: [1,2,3,4,8]};// CAT
    this.rules[40].opcodes[1] = {type: 10, string: [36,99,114,111,115,115,106,111,105,110]};// TBS
    this.rules[40].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[40].opcodes[3] = {type: 4, index: 202};// RNM(entitySetName)
    this.rules[40].opcodes[4] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[40].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[40].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[40].opcodes[7] = {type: 4, index: 202};// RNM(entitySetName)
    this.rules[40].opcodes[8] = {type: 4, index: 352};// RNM(CLOSE)

    // queryOptions
    this.rules[41].opcodes = [];
    this.rules[41].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[41].opcodes[1] = {type: 4, index: 42};// RNM(queryOption)
    this.rules[41].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[41].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[41].opcodes[4] = {type: 9, string: [38]};// TLS
    this.rules[41].opcodes[5] = {type: 4, index: 42};// RNM(queryOption)

    // queryOption
    this.rules[42].opcodes = [];
    this.rules[42].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[42].opcodes[1] = {type: 4, index: 48};// RNM(systemQueryOption)
    this.rules[42].opcodes[2] = {type: 4, index: 79};// RNM(aliasAndValue)
    this.rules[42].opcodes[3] = {type: 4, index: 81};// RNM(customQueryOption)

    // entityOptions
    this.rules[43].opcodes = [];
    this.rules[43].opcodes[0] = {type: 2, children: [1,5,6]};// CAT
    this.rules[43].opcodes[1] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[43].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[43].opcodes[3] = {type: 4, index: 44};// RNM(entityIdOption)
    this.rules[43].opcodes[4] = {type: 9, string: [38]};// TLS
    this.rules[43].opcodes[5] = {type: 4, index: 47};// RNM(id)
    this.rules[43].opcodes[6] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[43].opcodes[7] = {type: 2, children: [8,9]};// CAT
    this.rules[43].opcodes[8] = {type: 9, string: [38]};// TLS
    this.rules[43].opcodes[9] = {type: 4, index: 44};// RNM(entityIdOption)

    // entityIdOption
    this.rules[44].opcodes = [];
    this.rules[44].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[44].opcodes[1] = {type: 4, index: 61};// RNM(format)
    this.rules[44].opcodes[2] = {type: 4, index: 81};// RNM(customQueryOption)

    // entityCastOptions
    this.rules[45].opcodes = [];
    this.rules[45].opcodes[0] = {type: 2, children: [1,5,6]};// CAT
    this.rules[45].opcodes[1] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[45].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[45].opcodes[3] = {type: 4, index: 46};// RNM(entityCastOption)
    this.rules[45].opcodes[4] = {type: 9, string: [38]};// TLS
    this.rules[45].opcodes[5] = {type: 4, index: 47};// RNM(id)
    this.rules[45].opcodes[6] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[45].opcodes[7] = {type: 2, children: [8,9]};// CAT
    this.rules[45].opcodes[8] = {type: 9, string: [38]};// TLS
    this.rules[45].opcodes[9] = {type: 4, index: 46};// RNM(entityCastOption)

    // entityCastOption
    this.rules[46].opcodes = [];
    this.rules[46].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[46].opcodes[1] = {type: 4, index: 44};// RNM(entityIdOption)
    this.rules[46].opcodes[2] = {type: 4, index: 49};// RNM(expand)
    this.rules[46].opcodes[3] = {type: 4, index: 70};// RNM(select)

    // id
    this.rules[47].opcodes = [];
    this.rules[47].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[47].opcodes[1] = {type: 10, string: [36,105,100]};// TBS
    this.rules[47].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[47].opcodes[3] = {type: 4, index: 389};// RNM(IRI-in-query)

    // systemQueryOption
    this.rules[48].opcodes = [];
    this.rules[48].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9,10,11]};// ALT
    this.rules[48].opcodes[1] = {type: 4, index: 49};// RNM(expand)
    this.rules[48].opcodes[2] = {type: 4, index: 56};// RNM(filter)
    this.rules[48].opcodes[3] = {type: 4, index: 61};// RNM(format)
    this.rules[48].opcodes[4] = {type: 4, index: 47};// RNM(id)
    this.rules[48].opcodes[5] = {type: 4, index: 62};// RNM(inlinecount)
    this.rules[48].opcodes[6] = {type: 4, index: 57};// RNM(orderby)
    this.rules[48].opcodes[7] = {type: 4, index: 63};// RNM(search)
    this.rules[48].opcodes[8] = {type: 4, index: 70};// RNM(select)
    this.rules[48].opcodes[9] = {type: 4, index: 59};// RNM(skip)
    this.rules[48].opcodes[10] = {type: 4, index: 78};// RNM(skiptoken)
    this.rules[48].opcodes[11] = {type: 4, index: 60};// RNM(top)

    // expand
    this.rules[49].opcodes = [];
    this.rules[49].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[49].opcodes[1] = {type: 10, string: [36,101,120,112,97,110,100]};// TBS
    this.rules[49].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[49].opcodes[3] = {type: 4, index: 50};// RNM(expandItem)
    this.rules[49].opcodes[4] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[49].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[49].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[49].opcodes[7] = {type: 4, index: 50};// RNM(expandItem)

    // expandItem
    this.rules[50].opcodes = [];
    this.rules[50].opcodes[0] = {type: 1, children: [1,10]};// ALT
    this.rules[50].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[50].opcodes[2] = {type: 4, index: 349};// RNM(STAR)
    this.rules[50].opcodes[3] = {type: 3, min: 0, max: 1};// REP
    this.rules[50].opcodes[4] = {type: 1, children: [5,6]};// ALT
    this.rules[50].opcodes[5] = {type: 4, index: 19};// RNM(ref)
    this.rules[50].opcodes[6] = {type: 2, children: [7,8,9]};// CAT
    this.rules[50].opcodes[7] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[50].opcodes[8] = {type: 4, index: 55};// RNM(levels)
    this.rules[50].opcodes[9] = {type: 4, index: 352};// RNM(CLOSE)
    this.rules[50].opcodes[10] = {type: 2, children: [11,12]};// CAT
    this.rules[50].opcodes[11] = {type: 4, index: 51};// RNM(expandPath)
    this.rules[50].opcodes[12] = {type: 3, min: 0, max: 1};// REP
    this.rules[50].opcodes[13] = {type: 1, children: [14,25,36]};// ALT
    this.rules[50].opcodes[14] = {type: 2, children: [15,16]};// CAT
    this.rules[50].opcodes[15] = {type: 4, index: 19};// RNM(ref)
    this.rules[50].opcodes[16] = {type: 3, min: 0, max: 1};// REP
    this.rules[50].opcodes[17] = {type: 2, children: [18,19,20,24]};// CAT
    this.rules[50].opcodes[18] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[50].opcodes[19] = {type: 4, index: 53};// RNM(expandRefOption)
    this.rules[50].opcodes[20] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[50].opcodes[21] = {type: 2, children: [22,23]};// CAT
    this.rules[50].opcodes[22] = {type: 4, index: 348};// RNM(SEMI)
    this.rules[50].opcodes[23] = {type: 4, index: 53};// RNM(expandRefOption)
    this.rules[50].opcodes[24] = {type: 4, index: 352};// RNM(CLOSE)
    this.rules[50].opcodes[25] = {type: 2, children: [26,27]};// CAT
    this.rules[50].opcodes[26] = {type: 4, index: 18};// RNM(count)
    this.rules[50].opcodes[27] = {type: 3, min: 0, max: 1};// REP
    this.rules[50].opcodes[28] = {type: 2, children: [29,30,31,35]};// CAT
    this.rules[50].opcodes[29] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[50].opcodes[30] = {type: 4, index: 52};// RNM(expandCountOption)
    this.rules[50].opcodes[31] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[50].opcodes[32] = {type: 2, children: [33,34]};// CAT
    this.rules[50].opcodes[33] = {type: 4, index: 348};// RNM(SEMI)
    this.rules[50].opcodes[34] = {type: 4, index: 52};// RNM(expandCountOption)
    this.rules[50].opcodes[35] = {type: 4, index: 352};// RNM(CLOSE)
    this.rules[50].opcodes[36] = {type: 2, children: [37,38,39,43]};// CAT
    this.rules[50].opcodes[37] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[50].opcodes[38] = {type: 4, index: 54};// RNM(expandOption)
    this.rules[50].opcodes[39] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[50].opcodes[40] = {type: 2, children: [41,42]};// CAT
    this.rules[50].opcodes[41] = {type: 4, index: 348};// RNM(SEMI)
    this.rules[50].opcodes[42] = {type: 4, index: 54};// RNM(expandOption)
    this.rules[50].opcodes[43] = {type: 4, index: 352};// RNM(CLOSE)

    // expandPath
    this.rules[51].opcodes = [];
    this.rules[51].opcodes[0] = {type: 2, children: [1,7,17,18]};// CAT
    this.rules[51].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[51].opcodes[2] = {type: 2, children: [3,6]};// CAT
    this.rules[51].opcodes[3] = {type: 1, children: [4,5]};// ALT
    this.rules[51].opcodes[4] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[51].opcodes[5] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[51].opcodes[6] = {type: 9, string: [47]};// TLS
    this.rules[51].opcodes[7] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[51].opcodes[8] = {type: 2, children: [9,12,13]};// CAT
    this.rules[51].opcodes[9] = {type: 1, children: [10,11]};// ALT
    this.rules[51].opcodes[10] = {type: 4, index: 220};// RNM(complexProperty)
    this.rules[51].opcodes[11] = {type: 4, index: 221};// RNM(complexColProperty)
    this.rules[51].opcodes[12] = {type: 9, string: [47]};// TLS
    this.rules[51].opcodes[13] = {type: 3, min: 0, max: 1};// REP
    this.rules[51].opcodes[14] = {type: 2, children: [15,16]};// CAT
    this.rules[51].opcodes[15] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[51].opcodes[16] = {type: 9, string: [47]};// TLS
    this.rules[51].opcodes[17] = {type: 4, index: 223};// RNM(navigationProperty)
    this.rules[51].opcodes[18] = {type: 3, min: 0, max: 1};// REP
    this.rules[51].opcodes[19] = {type: 2, children: [20,21]};// CAT
    this.rules[51].opcodes[20] = {type: 9, string: [47]};// TLS
    this.rules[51].opcodes[21] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)

    // expandCountOption
    this.rules[52].opcodes = [];
    this.rules[52].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[52].opcodes[1] = {type: 4, index: 56};// RNM(filter)
    this.rules[52].opcodes[2] = {type: 4, index: 63};// RNM(search)

    // expandRefOption
    this.rules[53].opcodes = [];
    this.rules[53].opcodes[0] = {type: 1, children: [1,2,3,4,5]};// ALT
    this.rules[53].opcodes[1] = {type: 4, index: 52};// RNM(expandCountOption)
    this.rules[53].opcodes[2] = {type: 4, index: 57};// RNM(orderby)
    this.rules[53].opcodes[3] = {type: 4, index: 59};// RNM(skip)
    this.rules[53].opcodes[4] = {type: 4, index: 60};// RNM(top)
    this.rules[53].opcodes[5] = {type: 4, index: 62};// RNM(inlinecount)

    // expandOption
    this.rules[54].opcodes = [];
    this.rules[54].opcodes[0] = {type: 1, children: [1,2,3,4]};// ALT
    this.rules[54].opcodes[1] = {type: 4, index: 53};// RNM(expandRefOption)
    this.rules[54].opcodes[2] = {type: 4, index: 70};// RNM(select)
    this.rules[54].opcodes[3] = {type: 4, index: 49};// RNM(expand)
    this.rules[54].opcodes[4] = {type: 4, index: 55};// RNM(levels)

    // levels
    this.rules[55].opcodes = [];
    this.rules[55].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[55].opcodes[1] = {type: 10, string: [36,108,101,118,101,108,115]};// TBS
    this.rules[55].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[55].opcodes[3] = {type: 1, children: [4,8]};// ALT
    this.rules[55].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[55].opcodes[5] = {type: 4, index: 267};// RNM(oneToNine)
    this.rules[55].opcodes[6] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[55].opcodes[7] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[55].opcodes[8] = {type: 10, string: [109,97,120]};// TBS

    // filter
    this.rules[56].opcodes = [];
    this.rules[56].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[56].opcodes[1] = {type: 10, string: [36,102,105,108,116,101,114]};// TBS
    this.rules[56].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[56].opcodes[3] = {type: 4, index: 94};// RNM(boolCommonExpr)

    // orderby
    this.rules[57].opcodes = [];
    this.rules[57].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[57].opcodes[1] = {type: 10, string: [36,111,114,100,101,114,98,121]};// TBS
    this.rules[57].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[57].opcodes[3] = {type: 4, index: 58};// RNM(orderbyItem)
    this.rules[57].opcodes[4] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[57].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[57].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[57].opcodes[7] = {type: 4, index: 58};// RNM(orderbyItem)

    // orderbyItem
    this.rules[58].opcodes = [];
    this.rules[58].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[58].opcodes[1] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[58].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[58].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[58].opcodes[4] = {type: 4, index: 341};// RNM(RWS)
    this.rules[58].opcodes[5] = {type: 1, children: [6,7]};// ALT
    this.rules[58].opcodes[6] = {type: 10, string: [97,115,99]};// TBS
    this.rules[58].opcodes[7] = {type: 10, string: [100,101,115,99]};// TBS

    // skip
    this.rules[59].opcodes = [];
    this.rules[59].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[59].opcodes[1] = {type: 10, string: [36,115,107,105,112]};// TBS
    this.rules[59].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[59].opcodes[3] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[59].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)

    // top
    this.rules[60].opcodes = [];
    this.rules[60].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[60].opcodes[1] = {type: 10, string: [36,116,111,112]};// TBS
    this.rules[60].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[60].opcodes[3] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[60].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)

    // format
    this.rules[61].opcodes = [];
    this.rules[61].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[61].opcodes[1] = {type: 10, string: [36,102,111,114,109,97,116]};// TBS
    this.rules[61].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[61].opcodes[3] = {type: 1, children: [4,5,6,7]};// ALT
    this.rules[61].opcodes[4] = {type: 9, string: [97,116,111,109]};// TLS
    this.rules[61].opcodes[5] = {type: 9, string: [106,115,111,110]};// TLS
    this.rules[61].opcodes[6] = {type: 9, string: [120,109,108]};// TLS
    this.rules[61].opcodes[7] = {type: 2, children: [8,10,11]};// CAT
    this.rules[61].opcodes[8] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[61].opcodes[9] = {type: 4, index: 373};// RNM(pchar)
    this.rules[61].opcodes[10] = {type: 9, string: [47]};// TLS
    this.rules[61].opcodes[11] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[61].opcodes[12] = {type: 4, index: 373};// RNM(pchar)

    // inlinecount
    this.rules[62].opcodes = [];
    this.rules[62].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[62].opcodes[1] = {type: 10, string: [36,99,111,117,110,116]};// TBS
    this.rules[62].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[62].opcodes[3] = {type: 4, index: 249};// RNM(booleanValue)

    // search
    this.rules[63].opcodes = [];
    this.rules[63].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[63].opcodes[1] = {type: 10, string: [36,115,101,97,114,99,104]};// TBS
    this.rules[63].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[63].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[63].opcodes[4] = {type: 4, index: 64};// RNM(searchExpr)

    // searchExpr
    this.rules[64].opcodes = [];
    this.rules[64].opcodes[0] = {type: 2, children: [1,9]};// CAT
    this.rules[64].opcodes[1] = {type: 1, children: [2,8]};// ALT
    this.rules[64].opcodes[2] = {type: 2, children: [3,4,5,6,7]};// CAT
    this.rules[64].opcodes[3] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[64].opcodes[4] = {type: 4, index: 342};// RNM(BWS)
    this.rules[64].opcodes[5] = {type: 4, index: 64};// RNM(searchExpr)
    this.rules[64].opcodes[6] = {type: 4, index: 342};// RNM(BWS)
    this.rules[64].opcodes[7] = {type: 4, index: 352};// RNM(CLOSE)
    this.rules[64].opcodes[8] = {type: 4, index: 67};// RNM(searchTerm)
    this.rules[64].opcodes[9] = {type: 3, min: 0, max: 1};// REP
    this.rules[64].opcodes[10] = {type: 1, children: [11,12]};// ALT
    this.rules[64].opcodes[11] = {type: 4, index: 65};// RNM(searchOrExpr)
    this.rules[64].opcodes[12] = {type: 4, index: 66};// RNM(searchAndExpr)

    // searchOrExpr
    this.rules[65].opcodes = [];
    this.rules[65].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[65].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[65].opcodes[2] = {type: 10, string: [79,82]};// TBS
    this.rules[65].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[65].opcodes[4] = {type: 4, index: 64};// RNM(searchExpr)

    // searchAndExpr
    this.rules[66].opcodes = [];
    this.rules[66].opcodes[0] = {type: 2, children: [1,2,6]};// CAT
    this.rules[66].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[66].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[66].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[66].opcodes[4] = {type: 10, string: [65,78,68]};// TBS
    this.rules[66].opcodes[5] = {type: 4, index: 341};// RNM(RWS)
    this.rules[66].opcodes[6] = {type: 4, index: 64};// RNM(searchExpr)

    // searchTerm
    this.rules[67].opcodes = [];
    this.rules[67].opcodes[0] = {type: 2, children: [1,5]};// CAT
    this.rules[67].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[67].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[67].opcodes[3] = {type: 10, string: [78,79,84]};// TBS
    this.rules[67].opcodes[4] = {type: 4, index: 341};// RNM(RWS)
    this.rules[67].opcodes[5] = {type: 1, children: [6,7]};// ALT
    this.rules[67].opcodes[6] = {type: 4, index: 68};// RNM(searchPhrase)
    this.rules[67].opcodes[7] = {type: 4, index: 69};// RNM(searchWord)

    // searchPhrase
    this.rules[68].opcodes = [];
    this.rules[68].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
    this.rules[68].opcodes[1] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[68].opcodes[2] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[68].opcodes[3] = {type: 4, index: 387};// RNM(qchar-no-AMP-DQUOTE)
    this.rules[68].opcodes[4] = {type: 4, index: 182};// RNM(quotation-mark)

    // searchWord
    this.rules[69].opcodes = [];
    this.rules[69].opcodes[0] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[69].opcodes[1] = {type: 4, index: 390};// RNM(ALPHA)

    // select
    this.rules[70].opcodes = [];
    this.rules[70].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[70].opcodes[1] = {type: 10, string: [36,115,101,108,101,99,116]};// TBS
    this.rules[70].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[70].opcodes[3] = {type: 4, index: 71};// RNM(selectItem)
    this.rules[70].opcodes[4] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[70].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[70].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[70].opcodes[7] = {type: 4, index: 71};// RNM(selectItem)

    // selectItem
    this.rules[71].opcodes = [];
    this.rules[71].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[71].opcodes[1] = {type: 4, index: 349};// RNM(STAR)
    this.rules[71].opcodes[2] = {type: 4, index: 74};// RNM(allOperationsInSchema)
    this.rules[71].opcodes[3] = {type: 2, children: [4,10]};// CAT
    this.rules[71].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[71].opcodes[5] = {type: 2, children: [6,9]};// CAT
    this.rules[71].opcodes[6] = {type: 1, children: [7,8]};// ALT
    this.rules[71].opcodes[7] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[71].opcodes[8] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[71].opcodes[9] = {type: 9, string: [47]};// TLS
    this.rules[71].opcodes[10] = {type: 1, children: [11,12,13]};// ALT
    this.rules[71].opcodes[11] = {type: 4, index: 72};// RNM(selectProperty)
    this.rules[71].opcodes[12] = {type: 4, index: 75};// RNM(qualifiedActionName)
    this.rules[71].opcodes[13] = {type: 4, index: 76};// RNM(qualifiedFunctionName)

    // selectProperty
    this.rules[72].opcodes = [];
    this.rules[72].opcodes[0] = {type: 1, children: [1,2,3,4]};// ALT
    this.rules[72].opcodes[1] = {type: 4, index: 216};// RNM(primitiveProperty)
    this.rules[72].opcodes[2] = {type: 4, index: 219};// RNM(primitiveColProperty)
    this.rules[72].opcodes[3] = {type: 4, index: 223};// RNM(navigationProperty)
    this.rules[72].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[72].opcodes[5] = {type: 4, index: 73};// RNM(selectPath)
    this.rules[72].opcodes[6] = {type: 3, min: 0, max: 1};// REP
    this.rules[72].opcodes[7] = {type: 2, children: [8,9]};// CAT
    this.rules[72].opcodes[8] = {type: 9, string: [47]};// TLS
    this.rules[72].opcodes[9] = {type: 4, index: 72};// RNM(selectProperty)

    // selectPath
    this.rules[73].opcodes = [];
    this.rules[73].opcodes[0] = {type: 2, children: [1,4]};// CAT
    this.rules[73].opcodes[1] = {type: 1, children: [2,3]};// ALT
    this.rules[73].opcodes[2] = {type: 4, index: 220};// RNM(complexProperty)
    this.rules[73].opcodes[3] = {type: 4, index: 221};// RNM(complexColProperty)
    this.rules[73].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[73].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[73].opcodes[6] = {type: 9, string: [47]};// TLS
    this.rules[73].opcodes[7] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)

    // allOperationsInSchema
    this.rules[74].opcodes = [];
    this.rules[74].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[74].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[74].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[74].opcodes[3] = {type: 4, index: 349};// RNM(STAR)

    // qualifiedActionName
    this.rules[75].opcodes = [];
    this.rules[75].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[75].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[75].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[75].opcodes[3] = {type: 4, index: 226};// RNM(action)

    // qualifiedFunctionName
    this.rules[76].opcodes = [];
    this.rules[76].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[76].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[76].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[76].opcodes[3] = {type: 4, index: 228};// RNM(function)
    this.rules[76].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[76].opcodes[5] = {type: 2, children: [6,7,8]};// CAT
    this.rules[76].opcodes[6] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[76].opcodes[7] = {type: 4, index: 77};// RNM(parameterNames)
    this.rules[76].opcodes[8] = {type: 4, index: 352};// RNM(CLOSE)

    // parameterNames
    this.rules[77].opcodes = [];
    this.rules[77].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[77].opcodes[1] = {type: 4, index: 38};// RNM(parameterName)
    this.rules[77].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[77].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[77].opcodes[4] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[77].opcodes[5] = {type: 4, index: 38};// RNM(parameterName)

    // skiptoken
    this.rules[78].opcodes = [];
    this.rules[78].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[78].opcodes[1] = {type: 10, string: [36,115,107,105,112,116,111,107,101,110]};// TBS
    this.rules[78].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[78].opcodes[3] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[78].opcodes[4] = {type: 4, index: 382};// RNM(qchar-no-AMP)

    // aliasAndValue
    this.rules[79].opcodes = [];
    this.rules[79].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[79].opcodes[1] = {type: 4, index: 39};// RNM(parameterAlias)
    this.rules[79].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[79].opcodes[3] = {type: 4, index: 80};// RNM(parameterValue)

    // parameterValue
    this.rules[80].opcodes = [];
    this.rules[80].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[80].opcodes[1] = {type: 4, index: 166};// RNM(arrayOrObject)
    this.rules[80].opcodes[2] = {type: 4, index: 93};// RNM(commonExpr)

    // customQueryOption
    this.rules[81].opcodes = [];
    this.rules[81].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[81].opcodes[1] = {type: 4, index: 82};// RNM(customName)
    this.rules[81].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[81].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[81].opcodes[4] = {type: 4, index: 346};// RNM(EQ)
    this.rules[81].opcodes[5] = {type: 4, index: 83};// RNM(customValue)

    // customName
    this.rules[82].opcodes = [];
    this.rules[82].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[82].opcodes[1] = {type: 4, index: 384};// RNM(qchar-no-AMP-EQ-AT-DOLLAR)
    this.rules[82].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[82].opcodes[3] = {type: 4, index: 383};// RNM(qchar-no-AMP-EQ)

    // customValue
    this.rules[83].opcodes = [];
    this.rules[83].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[83].opcodes[1] = {type: 4, index: 382};// RNM(qchar-no-AMP)

    // context
    this.rules[84].opcodes = [];
    this.rules[84].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[84].opcodes[1] = {type: 9, string: [35]};// TLS
    this.rules[84].opcodes[2] = {type: 4, index: 85};// RNM(contextFragment)

    // contextFragment
    this.rules[85].opcodes = [];
    this.rules[85].opcodes[0] = {type: 1, children: [1,2,3,4,5,18,22,28,35]};// ALT
    this.rules[85].opcodes[1] = {type: 10, string: [67,111,108,108,101,99,116,105,111,110,40,36,114,101,102,41]};// TBS
    this.rules[85].opcodes[2] = {type: 10, string: [36,114,101,102]};// TBS
    this.rules[85].opcodes[3] = {type: 10, string: [67,111,108,108,101,99,116,105,111,110,40,69,100,109,46,69,110,116,105,116,121,84,121,112,101,41]};// TBS
    this.rules[85].opcodes[4] = {type: 10, string: [67,111,108,108,101,99,116,105,111,110,40,69,100,109,46,67,111,109,112,108,101,120,84,121,112,101,41]};// TBS
    this.rules[85].opcodes[5] = {type: 2, children: [6,7,16]};// CAT
    this.rules[85].opcodes[6] = {type: 4, index: 203};// RNM(singletonEntity)
    this.rules[85].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[85].opcodes[8] = {type: 2, children: [9,10,12]};// CAT
    this.rules[85].opcodes[9] = {type: 4, index: 88};// RNM(navigation)
    this.rules[85].opcodes[10] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[85].opcodes[11] = {type: 4, index: 87};// RNM(containmentNavigation)
    this.rules[85].opcodes[12] = {type: 3, min: 0, max: 1};// REP
    this.rules[85].opcodes[13] = {type: 2, children: [14,15]};// CAT
    this.rules[85].opcodes[14] = {type: 9, string: [47]};// TLS
    this.rules[85].opcodes[15] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[85].opcodes[16] = {type: 3, min: 0, max: 1};// REP
    this.rules[85].opcodes[17] = {type: 4, index: 89};// RNM(selectList)
    this.rules[85].opcodes[18] = {type: 2, children: [19,20]};// CAT
    this.rules[85].opcodes[19] = {type: 4, index: 195};// RNM(qualifiedTypeName)
    this.rules[85].opcodes[20] = {type: 3, min: 0, max: 1};// REP
    this.rules[85].opcodes[21] = {type: 4, index: 89};// RNM(selectList)
    this.rules[85].opcodes[22] = {type: 2, children: [23,24]};// CAT
    this.rules[85].opcodes[23] = {type: 4, index: 86};// RNM(entitySet)
    this.rules[85].opcodes[24] = {type: 1, children: [25,26,27]};// ALT
    this.rules[85].opcodes[25] = {type: 10, string: [47,36,100,101,108,101,116,101,100,69,110,116,105,116,121]};// TBS
    this.rules[85].opcodes[26] = {type: 10, string: [47,36,108,105,110,107]};// TBS
    this.rules[85].opcodes[27] = {type: 10, string: [47,36,100,101,108,101,116,101,100,76,105,110,107]};// TBS
    this.rules[85].opcodes[28] = {type: 2, children: [29,30,31,32,33]};// CAT
    this.rules[85].opcodes[29] = {type: 4, index: 86};// RNM(entitySet)
    this.rules[85].opcodes[30] = {type: 4, index: 7};// RNM(keyPredicate)
    this.rules[85].opcodes[31] = {type: 9, string: [47]};// TLS
    this.rules[85].opcodes[32] = {type: 4, index: 92};// RNM(contextPropertyPath)
    this.rules[85].opcodes[33] = {type: 3, min: 0, max: 1};// REP
    this.rules[85].opcodes[34] = {type: 4, index: 89};// RNM(selectList)
    this.rules[85].opcodes[35] = {type: 2, children: [36,37,39]};// CAT
    this.rules[85].opcodes[36] = {type: 4, index: 86};// RNM(entitySet)
    this.rules[85].opcodes[37] = {type: 3, min: 0, max: 1};// REP
    this.rules[85].opcodes[38] = {type: 4, index: 89};// RNM(selectList)
    this.rules[85].opcodes[39] = {type: 3, min: 0, max: 1};// REP
    this.rules[85].opcodes[40] = {type: 1, children: [41,42]};// ALT
    this.rules[85].opcodes[41] = {type: 10, string: [47,36,101,110,116,105,116,121]};// TBS
    this.rules[85].opcodes[42] = {type: 10, string: [47,36,100,101,108,116,97]};// TBS

    // entitySet
    this.rules[86].opcodes = [];
    this.rules[86].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
    this.rules[86].opcodes[1] = {type: 4, index: 202};// RNM(entitySetName)
    this.rules[86].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[86].opcodes[3] = {type: 4, index: 87};// RNM(containmentNavigation)
    this.rules[86].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[86].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[86].opcodes[6] = {type: 9, string: [47]};// TLS
    this.rules[86].opcodes[7] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)

    // containmentNavigation
    this.rules[87].opcodes = [];
    this.rules[87].opcodes[0] = {type: 2, children: [1,2,6]};// CAT
    this.rules[87].opcodes[1] = {type: 4, index: 7};// RNM(keyPredicate)
    this.rules[87].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[87].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[87].opcodes[4] = {type: 9, string: [47]};// TLS
    this.rules[87].opcodes[5] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[87].opcodes[6] = {type: 4, index: 88};// RNM(navigation)

    // navigation
    this.rules[88].opcodes = [];
    this.rules[88].opcodes[0] = {type: 2, children: [1,9,10]};// CAT
    this.rules[88].opcodes[1] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[88].opcodes[2] = {type: 2, children: [3,4,5]};// CAT
    this.rules[88].opcodes[3] = {type: 9, string: [47]};// TLS
    this.rules[88].opcodes[4] = {type: 4, index: 220};// RNM(complexProperty)
    this.rules[88].opcodes[5] = {type: 3, min: 0, max: 1};// REP
    this.rules[88].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[88].opcodes[7] = {type: 9, string: [47]};// TLS
    this.rules[88].opcodes[8] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[88].opcodes[9] = {type: 9, string: [47]};// TLS
    this.rules[88].opcodes[10] = {type: 4, index: 223};// RNM(navigationProperty)

    // selectList
    this.rules[89].opcodes = [];
    this.rules[89].opcodes[0] = {type: 2, children: [1,2,3,7]};// CAT
    this.rules[89].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[89].opcodes[2] = {type: 4, index: 90};// RNM(selectListItem)
    this.rules[89].opcodes[3] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[89].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[89].opcodes[5] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[89].opcodes[6] = {type: 4, index: 90};// RNM(selectListItem)
    this.rules[89].opcodes[7] = {type: 4, index: 352};// RNM(CLOSE)

    // selectListItem
    this.rules[90].opcodes = [];
    this.rules[90].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[90].opcodes[1] = {type: 4, index: 349};// RNM(STAR)
    this.rules[90].opcodes[2] = {type: 4, index: 74};// RNM(allOperationsInSchema)
    this.rules[90].opcodes[3] = {type: 2, children: [4,8]};// CAT
    this.rules[90].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[90].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[90].opcodes[6] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[90].opcodes[7] = {type: 9, string: [47]};// TLS
    this.rules[90].opcodes[8] = {type: 1, children: [9,10,11]};// ALT
    this.rules[90].opcodes[9] = {type: 4, index: 75};// RNM(qualifiedActionName)
    this.rules[90].opcodes[10] = {type: 4, index: 76};// RNM(qualifiedFunctionName)
    this.rules[90].opcodes[11] = {type: 4, index: 91};// RNM(selectListProperty)

    // selectListProperty
    this.rules[91].opcodes = [];
    this.rules[91].opcodes[0] = {type: 1, children: [1,2,3,9]};// ALT
    this.rules[91].opcodes[1] = {type: 4, index: 216};// RNM(primitiveProperty)
    this.rules[91].opcodes[2] = {type: 4, index: 219};// RNM(primitiveColProperty)
    this.rules[91].opcodes[3] = {type: 2, children: [4,5,7]};// CAT
    this.rules[91].opcodes[4] = {type: 4, index: 223};// RNM(navigationProperty)
    this.rules[91].opcodes[5] = {type: 3, min: 0, max: 1};// REP
    this.rules[91].opcodes[6] = {type: 10, string: [43]};// TBS
    this.rules[91].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[91].opcodes[8] = {type: 4, index: 89};// RNM(selectList)
    this.rules[91].opcodes[9] = {type: 2, children: [10,11]};// CAT
    this.rules[91].opcodes[10] = {type: 4, index: 73};// RNM(selectPath)
    this.rules[91].opcodes[11] = {type: 3, min: 0, max: 1};// REP
    this.rules[91].opcodes[12] = {type: 2, children: [13,14]};// CAT
    this.rules[91].opcodes[13] = {type: 9, string: [47]};// TLS
    this.rules[91].opcodes[14] = {type: 4, index: 91};// RNM(selectListProperty)

    // contextPropertyPath
    this.rules[92].opcodes = [];
    this.rules[92].opcodes[0] = {type: 1, children: [1,2,3,4]};// ALT
    this.rules[92].opcodes[1] = {type: 4, index: 216};// RNM(primitiveProperty)
    this.rules[92].opcodes[2] = {type: 4, index: 219};// RNM(primitiveColProperty)
    this.rules[92].opcodes[3] = {type: 4, index: 221};// RNM(complexColProperty)
    this.rules[92].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[92].opcodes[5] = {type: 4, index: 220};// RNM(complexProperty)
    this.rules[92].opcodes[6] = {type: 3, min: 0, max: 1};// REP
    this.rules[92].opcodes[7] = {type: 2, children: [8,12,13]};// CAT
    this.rules[92].opcodes[8] = {type: 3, min: 0, max: 1};// REP
    this.rules[92].opcodes[9] = {type: 2, children: [10,11]};// CAT
    this.rules[92].opcodes[10] = {type: 9, string: [47]};// TLS
    this.rules[92].opcodes[11] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[92].opcodes[12] = {type: 9, string: [47]};// TLS
    this.rules[92].opcodes[13] = {type: 4, index: 92};// RNM(contextPropertyPath)

    // commonExpr
    this.rules[93].opcodes = [];
    this.rules[93].opcodes[0] = {type: 2, children: [1,12]};// CAT
    this.rules[93].opcodes[1] = {type: 1, children: [2,3,4,5,6,7,8,9,10,11]};// ALT
    this.rules[93].opcodes[2] = {type: 4, index: 241};// RNM(primitiveLiteral)
    this.rules[93].opcodes[3] = {type: 4, index: 39};// RNM(parameterAlias)
    this.rules[93].opcodes[4] = {type: 4, index: 166};// RNM(arrayOrObject)
    this.rules[93].opcodes[5] = {type: 4, index: 95};// RNM(rootExpr)
    this.rules[93].opcodes[6] = {type: 4, index: 96};// RNM(firstMemberExpr)
    this.rules[93].opcodes[7] = {type: 4, index: 108};// RNM(functionExpr)
    this.rules[93].opcodes[8] = {type: 4, index: 162};// RNM(negateExpr)
    this.rules[93].opcodes[9] = {type: 4, index: 114};// RNM(methodCallExpr)
    this.rules[93].opcodes[10] = {type: 4, index: 147};// RNM(parenExpr)
    this.rules[93].opcodes[11] = {type: 4, index: 165};// RNM(castExpr)
    this.rules[93].opcodes[12] = {type: 3, min: 0, max: 1};// REP
    this.rules[93].opcodes[13] = {type: 1, children: [14,15,16,17,18]};// ALT
    this.rules[93].opcodes[14] = {type: 4, index: 157};// RNM(addExpr)
    this.rules[93].opcodes[15] = {type: 4, index: 158};// RNM(subExpr)
    this.rules[93].opcodes[16] = {type: 4, index: 159};// RNM(mulExpr)
    this.rules[93].opcodes[17] = {type: 4, index: 160};// RNM(divExpr)
    this.rules[93].opcodes[18] = {type: 4, index: 161};// RNM(modExpr)

    // boolCommonExpr
    this.rules[94].opcodes = [];
    this.rules[94].opcodes[0] = {type: 2, children: [1,17]};// CAT
    this.rules[94].opcodes[1] = {type: 1, children: [2,3,4,5,16]};// ALT
    this.rules[94].opcodes[2] = {type: 4, index: 164};// RNM(isofExpr)
    this.rules[94].opcodes[3] = {type: 4, index: 115};// RNM(boolMethodCallExpr)
    this.rules[94].opcodes[4] = {type: 4, index: 163};// RNM(notExpr)
    this.rules[94].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[94].opcodes[6] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[94].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[94].opcodes[8] = {type: 1, children: [9,10,11,12,13,14,15]};// ALT
    this.rules[94].opcodes[9] = {type: 4, index: 150};// RNM(eqExpr)
    this.rules[94].opcodes[10] = {type: 4, index: 151};// RNM(neExpr)
    this.rules[94].opcodes[11] = {type: 4, index: 152};// RNM(ltExpr)
    this.rules[94].opcodes[12] = {type: 4, index: 153};// RNM(leExpr)
    this.rules[94].opcodes[13] = {type: 4, index: 154};// RNM(gtExpr)
    this.rules[94].opcodes[14] = {type: 4, index: 155};// RNM(geExpr)
    this.rules[94].opcodes[15] = {type: 4, index: 156};// RNM(hasExpr)
    this.rules[94].opcodes[16] = {type: 4, index: 146};// RNM(boolParenExpr)
    this.rules[94].opcodes[17] = {type: 3, min: 0, max: 1};// REP
    this.rules[94].opcodes[18] = {type: 1, children: [19,20]};// ALT
    this.rules[94].opcodes[19] = {type: 4, index: 148};// RNM(andExpr)
    this.rules[94].opcodes[20] = {type: 4, index: 149};// RNM(orExpr)

    // rootExpr
    this.rules[95].opcodes = [];
    this.rules[95].opcodes[0] = {type: 2, children: [1,2,7]};// CAT
    this.rules[95].opcodes[1] = {type: 10, string: [36,114,111,111,116,47]};// TBS
    this.rules[95].opcodes[2] = {type: 1, children: [3,6]};// ALT
    this.rules[95].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[95].opcodes[4] = {type: 4, index: 202};// RNM(entitySetName)
    this.rules[95].opcodes[5] = {type: 4, index: 7};// RNM(keyPredicate)
    this.rules[95].opcodes[6] = {type: 4, index: 203};// RNM(singletonEntity)
    this.rules[95].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[95].opcodes[8] = {type: 4, index: 103};// RNM(singleNavigationExpr)

    // firstMemberExpr
    this.rules[96].opcodes = [];
    this.rules[96].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[96].opcodes[1] = {type: 4, index: 97};// RNM(memberExpr)
    this.rules[96].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[96].opcodes[3] = {type: 4, index: 99};// RNM(inscopeVariableExpr)
    this.rules[96].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[96].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[96].opcodes[6] = {type: 9, string: [47]};// TLS
    this.rules[96].opcodes[7] = {type: 4, index: 97};// RNM(memberExpr)

    // memberExpr
    this.rules[97].opcodes = [];
    this.rules[97].opcodes[0] = {type: 2, children: [1,5]};// CAT
    this.rules[97].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[97].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[97].opcodes[3] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[97].opcodes[4] = {type: 9, string: [47]};// TLS
    this.rules[97].opcodes[5] = {type: 1, children: [6,7]};// ALT
    this.rules[97].opcodes[6] = {type: 4, index: 98};// RNM(propertyPathExpr)
    this.rules[97].opcodes[7] = {type: 4, index: 107};// RNM(boundFunctionExpr)

    // propertyPathExpr
    this.rules[98].opcodes = [];
    this.rules[98].opcodes[0] = {type: 1, children: [1,5,9,13,17,21,25]};// ALT
    this.rules[98].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[98].opcodes[2] = {type: 4, index: 225};// RNM(entityColNavigationProperty)
    this.rules[98].opcodes[3] = {type: 3, min: 0, max: 1};// REP
    this.rules[98].opcodes[4] = {type: 4, index: 102};// RNM(collectionNavigationExpr)
    this.rules[98].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[98].opcodes[6] = {type: 4, index: 224};// RNM(entityNavigationProperty)
    this.rules[98].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[98].opcodes[8] = {type: 4, index: 103};// RNM(singleNavigationExpr)
    this.rules[98].opcodes[9] = {type: 2, children: [10,11]};// CAT
    this.rules[98].opcodes[10] = {type: 4, index: 221};// RNM(complexColProperty)
    this.rules[98].opcodes[11] = {type: 3, min: 0, max: 1};// REP
    this.rules[98].opcodes[12] = {type: 4, index: 104};// RNM(collectionPathExpr)
    this.rules[98].opcodes[13] = {type: 2, children: [14,15]};// CAT
    this.rules[98].opcodes[14] = {type: 4, index: 220};// RNM(complexProperty)
    this.rules[98].opcodes[15] = {type: 3, min: 0, max: 1};// REP
    this.rules[98].opcodes[16] = {type: 4, index: 105};// RNM(complexPathExpr)
    this.rules[98].opcodes[17] = {type: 2, children: [18,19]};// CAT
    this.rules[98].opcodes[18] = {type: 4, index: 219};// RNM(primitiveColProperty)
    this.rules[98].opcodes[19] = {type: 3, min: 0, max: 1};// REP
    this.rules[98].opcodes[20] = {type: 4, index: 104};// RNM(collectionPathExpr)
    this.rules[98].opcodes[21] = {type: 2, children: [22,23]};// CAT
    this.rules[98].opcodes[22] = {type: 4, index: 216};// RNM(primitiveProperty)
    this.rules[98].opcodes[23] = {type: 3, min: 0, max: 1};// REP
    this.rules[98].opcodes[24] = {type: 4, index: 106};// RNM(singlePathExpr)
    this.rules[98].opcodes[25] = {type: 2, children: [26,27]};// CAT
    this.rules[98].opcodes[26] = {type: 4, index: 222};// RNM(streamProperty)
    this.rules[98].opcodes[27] = {type: 3, min: 0, max: 1};// REP
    this.rules[98].opcodes[28] = {type: 4, index: 106};// RNM(singlePathExpr)

    // inscopeVariableExpr
    this.rules[99].opcodes = [];
    this.rules[99].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[99].opcodes[1] = {type: 4, index: 100};// RNM(implicitVariableExpr)
    this.rules[99].opcodes[2] = {type: 4, index: 101};// RNM(lambdaVariableExpr)

    // implicitVariableExpr
    this.rules[100].opcodes = [];
    this.rules[100].opcodes[0] = {type: 10, string: [36,105,116]};// TBS

    // lambdaVariableExpr
    this.rules[101].opcodes = [];
    this.rules[101].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // collectionNavigationExpr
    this.rules[102].opcodes = [];
    this.rules[102].opcodes[0] = {type: 2, children: [1,5]};// CAT
    this.rules[102].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[102].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[102].opcodes[3] = {type: 9, string: [47]};// TLS
    this.rules[102].opcodes[4] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[102].opcodes[5] = {type: 1, children: [6,10]};// ALT
    this.rules[102].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[102].opcodes[7] = {type: 4, index: 7};// RNM(keyPredicate)
    this.rules[102].opcodes[8] = {type: 3, min: 0, max: 1};// REP
    this.rules[102].opcodes[9] = {type: 4, index: 103};// RNM(singleNavigationExpr)
    this.rules[102].opcodes[10] = {type: 4, index: 104};// RNM(collectionPathExpr)

    // singleNavigationExpr
    this.rules[103].opcodes = [];
    this.rules[103].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[103].opcodes[1] = {type: 9, string: [47]};// TLS
    this.rules[103].opcodes[2] = {type: 4, index: 97};// RNM(memberExpr)

    // collectionPathExpr
    this.rules[104].opcodes = [];
    this.rules[104].opcodes[0] = {type: 1, children: [1,2,5,8]};// ALT
    this.rules[104].opcodes[1] = {type: 4, index: 18};// RNM(count)
    this.rules[104].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[104].opcodes[3] = {type: 9, string: [47]};// TLS
    this.rules[104].opcodes[4] = {type: 4, index: 107};// RNM(boundFunctionExpr)
    this.rules[104].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[104].opcodes[6] = {type: 9, string: [47]};// TLS
    this.rules[104].opcodes[7] = {type: 4, index: 111};// RNM(anyExpr)
    this.rules[104].opcodes[8] = {type: 2, children: [9,10]};// CAT
    this.rules[104].opcodes[9] = {type: 9, string: [47]};// TLS
    this.rules[104].opcodes[10] = {type: 4, index: 112};// RNM(allExpr)

    // complexPathExpr
    this.rules[105].opcodes = [];
    this.rules[105].opcodes[0] = {type: 2, children: [1,2,6]};// CAT
    this.rules[105].opcodes[1] = {type: 9, string: [47]};// TLS
    this.rules[105].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[105].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[105].opcodes[4] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[105].opcodes[5] = {type: 9, string: [47]};// TLS
    this.rules[105].opcodes[6] = {type: 1, children: [7,8]};// ALT
    this.rules[105].opcodes[7] = {type: 4, index: 98};// RNM(propertyPathExpr)
    this.rules[105].opcodes[8] = {type: 4, index: 107};// RNM(boundFunctionExpr)

    // singlePathExpr
    this.rules[106].opcodes = [];
    this.rules[106].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[106].opcodes[1] = {type: 9, string: [47]};// TLS
    this.rules[106].opcodes[2] = {type: 4, index: 107};// RNM(boundFunctionExpr)

    // boundFunctionExpr
    this.rules[107].opcodes = [];
    this.rules[107].opcodes[0] = {type: 4, index: 108};// RNM(functionExpr)

    // functionExpr
    this.rules[108].opcodes = [];
    this.rules[108].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[108].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[108].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[108].opcodes[3] = {type: 1, children: [4,9,14,19,24,29]};// ALT
    this.rules[108].opcodes[4] = {type: 2, children: [5,6,7]};// CAT
    this.rules[108].opcodes[5] = {type: 4, index: 230};// RNM(entityColFunction)
    this.rules[108].opcodes[6] = {type: 4, index: 109};// RNM(functionExprParameters)
    this.rules[108].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[108].opcodes[8] = {type: 4, index: 102};// RNM(collectionNavigationExpr)
    this.rules[108].opcodes[9] = {type: 2, children: [10,11,12]};// CAT
    this.rules[108].opcodes[10] = {type: 4, index: 229};// RNM(entityFunction)
    this.rules[108].opcodes[11] = {type: 4, index: 109};// RNM(functionExprParameters)
    this.rules[108].opcodes[12] = {type: 3, min: 0, max: 1};// REP
    this.rules[108].opcodes[13] = {type: 4, index: 103};// RNM(singleNavigationExpr)
    this.rules[108].opcodes[14] = {type: 2, children: [15,16,17]};// CAT
    this.rules[108].opcodes[15] = {type: 4, index: 232};// RNM(complexColFunction)
    this.rules[108].opcodes[16] = {type: 4, index: 109};// RNM(functionExprParameters)
    this.rules[108].opcodes[17] = {type: 3, min: 0, max: 1};// REP
    this.rules[108].opcodes[18] = {type: 4, index: 104};// RNM(collectionPathExpr)
    this.rules[108].opcodes[19] = {type: 2, children: [20,21,22]};// CAT
    this.rules[108].opcodes[20] = {type: 4, index: 231};// RNM(complexFunction)
    this.rules[108].opcodes[21] = {type: 4, index: 109};// RNM(functionExprParameters)
    this.rules[108].opcodes[22] = {type: 3, min: 0, max: 1};// REP
    this.rules[108].opcodes[23] = {type: 4, index: 105};// RNM(complexPathExpr)
    this.rules[108].opcodes[24] = {type: 2, children: [25,26,27]};// CAT
    this.rules[108].opcodes[25] = {type: 4, index: 234};// RNM(primitiveColFunction)
    this.rules[108].opcodes[26] = {type: 4, index: 109};// RNM(functionExprParameters)
    this.rules[108].opcodes[27] = {type: 3, min: 0, max: 1};// REP
    this.rules[108].opcodes[28] = {type: 4, index: 104};// RNM(collectionPathExpr)
    this.rules[108].opcodes[29] = {type: 2, children: [30,31,32]};// CAT
    this.rules[108].opcodes[30] = {type: 4, index: 233};// RNM(primitiveFunction)
    this.rules[108].opcodes[31] = {type: 4, index: 109};// RNM(functionExprParameters)
    this.rules[108].opcodes[32] = {type: 3, min: 0, max: 1};// REP
    this.rules[108].opcodes[33] = {type: 4, index: 106};// RNM(singlePathExpr)

    // functionExprParameters
    this.rules[109].opcodes = [];
    this.rules[109].opcodes[0] = {type: 2, children: [1,2,9]};// CAT
    this.rules[109].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[109].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[109].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[109].opcodes[4] = {type: 4, index: 110};// RNM(functionExprParameter)
    this.rules[109].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[109].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[109].opcodes[7] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[109].opcodes[8] = {type: 4, index: 110};// RNM(functionExprParameter)
    this.rules[109].opcodes[9] = {type: 4, index: 352};// RNM(CLOSE)

    // functionExprParameter
    this.rules[110].opcodes = [];
    this.rules[110].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[110].opcodes[1] = {type: 4, index: 38};// RNM(parameterName)
    this.rules[110].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[110].opcodes[3] = {type: 1, children: [4,5]};// ALT
    this.rules[110].opcodes[4] = {type: 4, index: 39};// RNM(parameterAlias)
    this.rules[110].opcodes[5] = {type: 4, index: 80};// RNM(parameterValue)

    // anyExpr
    this.rules[111].opcodes = [];
    this.rules[111].opcodes[0] = {type: 2, children: [1,2,3,4,11,12]};// CAT
    this.rules[111].opcodes[1] = {type: 10, string: [97,110,121]};// TBS
    this.rules[111].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[111].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[111].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[111].opcodes[5] = {type: 2, children: [6,7,8,9,10]};// CAT
    this.rules[111].opcodes[6] = {type: 4, index: 101};// RNM(lambdaVariableExpr)
    this.rules[111].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[111].opcodes[8] = {type: 4, index: 344};// RNM(COLON)
    this.rules[111].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[111].opcodes[10] = {type: 4, index: 113};// RNM(lambdaPredicateExpr)
    this.rules[111].opcodes[11] = {type: 4, index: 342};// RNM(BWS)
    this.rules[111].opcodes[12] = {type: 4, index: 352};// RNM(CLOSE)

    // allExpr
    this.rules[112].opcodes = [];
    this.rules[112].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10]};// CAT
    this.rules[112].opcodes[1] = {type: 10, string: [97,108,108]};// TBS
    this.rules[112].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[112].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[112].opcodes[4] = {type: 4, index: 101};// RNM(lambdaVariableExpr)
    this.rules[112].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[112].opcodes[6] = {type: 4, index: 344};// RNM(COLON)
    this.rules[112].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[112].opcodes[8] = {type: 4, index: 113};// RNM(lambdaPredicateExpr)
    this.rules[112].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[112].opcodes[10] = {type: 4, index: 352};// RNM(CLOSE)

    // lambdaPredicateExpr
    this.rules[113].opcodes = [];
    this.rules[113].opcodes[0] = {type: 4, index: 94};// RNM(boolCommonExpr)

    // methodCallExpr
    this.rules[114].opcodes = [];
    this.rules[114].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]};// ALT
    this.rules[114].opcodes[1] = {type: 4, index: 120};// RNM(indexOfMethodCallExpr)
    this.rules[114].opcodes[2] = {type: 4, index: 122};// RNM(toLowerMethodCallExpr)
    this.rules[114].opcodes[3] = {type: 4, index: 123};// RNM(toUpperMethodCallExpr)
    this.rules[114].opcodes[4] = {type: 4, index: 124};// RNM(trimMethodCallExpr)
    this.rules[114].opcodes[5] = {type: 4, index: 121};// RNM(substringMethodCallExpr)
    this.rules[114].opcodes[6] = {type: 4, index: 125};// RNM(concatMethodCallExpr)
    this.rules[114].opcodes[7] = {type: 4, index: 119};// RNM(lengthMethodCallExpr)
    this.rules[114].opcodes[8] = {type: 4, index: 126};// RNM(yearMethodCallExpr)
    this.rules[114].opcodes[9] = {type: 4, index: 127};// RNM(monthMethodCallExpr)
    this.rules[114].opcodes[10] = {type: 4, index: 128};// RNM(dayMethodCallExpr)
    this.rules[114].opcodes[11] = {type: 4, index: 129};// RNM(hourMethodCallExpr)
    this.rules[114].opcodes[12] = {type: 4, index: 130};// RNM(minuteMethodCallExpr)
    this.rules[114].opcodes[13] = {type: 4, index: 131};// RNM(secondMethodCallExpr)
    this.rules[114].opcodes[14] = {type: 4, index: 132};// RNM(fractionalsecondsMethodCallExpr)
    this.rules[114].opcodes[15] = {type: 4, index: 133};// RNM(totalsecondsMethodCallExpr)
    this.rules[114].opcodes[16] = {type: 4, index: 134};// RNM(dateMethodCallExpr)
    this.rules[114].opcodes[17] = {type: 4, index: 135};// RNM(timeMethodCallExpr)
    this.rules[114].opcodes[18] = {type: 4, index: 140};// RNM(roundMethodCallExpr)
    this.rules[114].opcodes[19] = {type: 4, index: 141};// RNM(floorMethodCallExpr)
    this.rules[114].opcodes[20] = {type: 4, index: 142};// RNM(ceilingMethodCallExpr)
    this.rules[114].opcodes[21] = {type: 4, index: 143};// RNM(distanceMethodCallExpr)
    this.rules[114].opcodes[22] = {type: 4, index: 144};// RNM(geoLengthMethodCallExpr)
    this.rules[114].opcodes[23] = {type: 4, index: 136};// RNM(totalOffsetMinutesMethodCallExpr)
    this.rules[114].opcodes[24] = {type: 4, index: 137};// RNM(minDateTimeMethodCallExpr)
    this.rules[114].opcodes[25] = {type: 4, index: 138};// RNM(maxDateTimeMethodCallExpr)
    this.rules[114].opcodes[26] = {type: 4, index: 139};// RNM(nowMethodCallExpr)

    // boolMethodCallExpr
    this.rules[115].opcodes = [];
    this.rules[115].opcodes[0] = {type: 1, children: [1,2,3,4]};// ALT
    this.rules[115].opcodes[1] = {type: 4, index: 118};// RNM(endsWithMethodCallExpr)
    this.rules[115].opcodes[2] = {type: 4, index: 117};// RNM(startsWithMethodCallExpr)
    this.rules[115].opcodes[3] = {type: 4, index: 116};// RNM(containsMethodCallExpr)
    this.rules[115].opcodes[4] = {type: 4, index: 145};// RNM(intersectsMethodCallExpr)

    // containsMethodCallExpr
    this.rules[116].opcodes = [];
    this.rules[116].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10]};// CAT
    this.rules[116].opcodes[1] = {type: 10, string: [99,111,110,116,97,105,110,115]};// TBS
    this.rules[116].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[116].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[116].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[116].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[116].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[116].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[116].opcodes[8] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[116].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[116].opcodes[10] = {type: 4, index: 352};// RNM(CLOSE)

    // startsWithMethodCallExpr
    this.rules[117].opcodes = [];
    this.rules[117].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10]};// CAT
    this.rules[117].opcodes[1] = {type: 10, string: [115,116,97,114,116,115,119,105,116,104]};// TBS
    this.rules[117].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[117].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[117].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[117].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[117].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[117].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[117].opcodes[8] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[117].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[117].opcodes[10] = {type: 4, index: 352};// RNM(CLOSE)

    // endsWithMethodCallExpr
    this.rules[118].opcodes = [];
    this.rules[118].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10]};// CAT
    this.rules[118].opcodes[1] = {type: 10, string: [101,110,100,115,119,105,116,104]};// TBS
    this.rules[118].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[118].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[118].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[118].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[118].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[118].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[118].opcodes[8] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[118].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[118].opcodes[10] = {type: 4, index: 352};// RNM(CLOSE)

    // lengthMethodCallExpr
    this.rules[119].opcodes = [];
    this.rules[119].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[119].opcodes[1] = {type: 10, string: [108,101,110,103,116,104]};// TBS
    this.rules[119].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[119].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[119].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[119].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[119].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // indexOfMethodCallExpr
    this.rules[120].opcodes = [];
    this.rules[120].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10]};// CAT
    this.rules[120].opcodes[1] = {type: 10, string: [105,110,100,101,120,111,102]};// TBS
    this.rules[120].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[120].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[120].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[120].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[120].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[120].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[120].opcodes[8] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[120].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[120].opcodes[10] = {type: 4, index: 352};// RNM(CLOSE)

    // substringMethodCallExpr
    this.rules[121].opcodes = [];
    this.rules[121].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10,16]};// CAT
    this.rules[121].opcodes[1] = {type: 10, string: [115,117,98,115,116,114,105,110,103]};// TBS
    this.rules[121].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[121].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[121].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[121].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[121].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[121].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[121].opcodes[8] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[121].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[121].opcodes[10] = {type: 3, min: 0, max: 1};// REP
    this.rules[121].opcodes[11] = {type: 2, children: [12,13,14,15]};// CAT
    this.rules[121].opcodes[12] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[121].opcodes[13] = {type: 4, index: 342};// RNM(BWS)
    this.rules[121].opcodes[14] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[121].opcodes[15] = {type: 4, index: 342};// RNM(BWS)
    this.rules[121].opcodes[16] = {type: 4, index: 352};// RNM(CLOSE)

    // toLowerMethodCallExpr
    this.rules[122].opcodes = [];
    this.rules[122].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[122].opcodes[1] = {type: 10, string: [116,111,108,111,119,101,114]};// TBS
    this.rules[122].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[122].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[122].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[122].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[122].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // toUpperMethodCallExpr
    this.rules[123].opcodes = [];
    this.rules[123].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[123].opcodes[1] = {type: 10, string: [116,111,117,112,112,101,114]};// TBS
    this.rules[123].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[123].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[123].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[123].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[123].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // trimMethodCallExpr
    this.rules[124].opcodes = [];
    this.rules[124].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[124].opcodes[1] = {type: 10, string: [116,114,105,109]};// TBS
    this.rules[124].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[124].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[124].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[124].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[124].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // concatMethodCallExpr
    this.rules[125].opcodes = [];
    this.rules[125].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10]};// CAT
    this.rules[125].opcodes[1] = {type: 10, string: [99,111,110,99,97,116]};// TBS
    this.rules[125].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[125].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[125].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[125].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[125].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[125].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[125].opcodes[8] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[125].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[125].opcodes[10] = {type: 4, index: 352};// RNM(CLOSE)

    // yearMethodCallExpr
    this.rules[126].opcodes = [];
    this.rules[126].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[126].opcodes[1] = {type: 10, string: [121,101,97,114]};// TBS
    this.rules[126].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[126].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[126].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[126].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[126].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // monthMethodCallExpr
    this.rules[127].opcodes = [];
    this.rules[127].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[127].opcodes[1] = {type: 10, string: [109,111,110,116,104]};// TBS
    this.rules[127].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[127].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[127].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[127].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[127].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // dayMethodCallExpr
    this.rules[128].opcodes = [];
    this.rules[128].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[128].opcodes[1] = {type: 10, string: [100,97,121]};// TBS
    this.rules[128].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[128].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[128].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[128].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[128].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // hourMethodCallExpr
    this.rules[129].opcodes = [];
    this.rules[129].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[129].opcodes[1] = {type: 10, string: [104,111,117,114]};// TBS
    this.rules[129].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[129].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[129].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[129].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[129].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // minuteMethodCallExpr
    this.rules[130].opcodes = [];
    this.rules[130].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[130].opcodes[1] = {type: 10, string: [109,105,110,117,116,101]};// TBS
    this.rules[130].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[130].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[130].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[130].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[130].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // secondMethodCallExpr
    this.rules[131].opcodes = [];
    this.rules[131].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[131].opcodes[1] = {type: 10, string: [115,101,99,111,110,100]};// TBS
    this.rules[131].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[131].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[131].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[131].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[131].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // fractionalsecondsMethodCallExpr
    this.rules[132].opcodes = [];
    this.rules[132].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[132].opcodes[1] = {type: 10, string: [102,114,97,99,116,105,111,110,97,108,115,101,99,111,110,100,115]};// TBS
    this.rules[132].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[132].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[132].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[132].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[132].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // totalsecondsMethodCallExpr
    this.rules[133].opcodes = [];
    this.rules[133].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[133].opcodes[1] = {type: 10, string: [116,111,116,97,108,115,101,99,111,110,100,115]};// TBS
    this.rules[133].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[133].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[133].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[133].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[133].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // dateMethodCallExpr
    this.rules[134].opcodes = [];
    this.rules[134].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[134].opcodes[1] = {type: 10, string: [100,97,116,101]};// TBS
    this.rules[134].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[134].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[134].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[134].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[134].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // timeMethodCallExpr
    this.rules[135].opcodes = [];
    this.rules[135].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[135].opcodes[1] = {type: 10, string: [116,105,109,101]};// TBS
    this.rules[135].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[135].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[135].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[135].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[135].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // totalOffsetMinutesMethodCallExpr
    this.rules[136].opcodes = [];
    this.rules[136].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[136].opcodes[1] = {type: 10, string: [116,111,116,97,108,111,102,102,115,101,116,109,105,110,117,116,101,115]};// TBS
    this.rules[136].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[136].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[136].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[136].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[136].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // minDateTimeMethodCallExpr
    this.rules[137].opcodes = [];
    this.rules[137].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[137].opcodes[1] = {type: 10, string: [109,105,110,100,97,116,101,116,105,109,101,40]};// TBS
    this.rules[137].opcodes[2] = {type: 4, index: 342};// RNM(BWS)
    this.rules[137].opcodes[3] = {type: 10, string: [41]};// TBS

    // maxDateTimeMethodCallExpr
    this.rules[138].opcodes = [];
    this.rules[138].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[138].opcodes[1] = {type: 10, string: [109,97,120,100,97,116,101,116,105,109,101,40]};// TBS
    this.rules[138].opcodes[2] = {type: 4, index: 342};// RNM(BWS)
    this.rules[138].opcodes[3] = {type: 10, string: [41]};// TBS

    // nowMethodCallExpr
    this.rules[139].opcodes = [];
    this.rules[139].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[139].opcodes[1] = {type: 10, string: [110,111,119,40]};// TBS
    this.rules[139].opcodes[2] = {type: 4, index: 342};// RNM(BWS)
    this.rules[139].opcodes[3] = {type: 10, string: [41]};// TBS

    // roundMethodCallExpr
    this.rules[140].opcodes = [];
    this.rules[140].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[140].opcodes[1] = {type: 10, string: [114,111,117,110,100]};// TBS
    this.rules[140].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[140].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[140].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[140].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[140].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // floorMethodCallExpr
    this.rules[141].opcodes = [];
    this.rules[141].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[141].opcodes[1] = {type: 10, string: [102,108,111,111,114]};// TBS
    this.rules[141].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[141].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[141].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[141].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[141].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // ceilingMethodCallExpr
    this.rules[142].opcodes = [];
    this.rules[142].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[142].opcodes[1] = {type: 10, string: [99,101,105,108,105,110,103]};// TBS
    this.rules[142].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[142].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[142].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[142].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[142].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // distanceMethodCallExpr
    this.rules[143].opcodes = [];
    this.rules[143].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10]};// CAT
    this.rules[143].opcodes[1] = {type: 10, string: [103,101,111,46,100,105,115,116,97,110,99,101]};// TBS
    this.rules[143].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[143].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[143].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[143].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[143].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[143].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[143].opcodes[8] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[143].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[143].opcodes[10] = {type: 4, index: 352};// RNM(CLOSE)

    // geoLengthMethodCallExpr
    this.rules[144].opcodes = [];
    this.rules[144].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[144].opcodes[1] = {type: 10, string: [103,101,111,46,108,101,110,103,116,104]};// TBS
    this.rules[144].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[144].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[144].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[144].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[144].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // intersectsMethodCallExpr
    this.rules[145].opcodes = [];
    this.rules[145].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10]};// CAT
    this.rules[145].opcodes[1] = {type: 10, string: [103,101,111,46,105,110,116,101,114,115,101,99,116,115]};// TBS
    this.rules[145].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[145].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[145].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[145].opcodes[5] = {type: 4, index: 342};// RNM(BWS)
    this.rules[145].opcodes[6] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[145].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[145].opcodes[8] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[145].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[145].opcodes[10] = {type: 4, index: 352};// RNM(CLOSE)

    // boolParenExpr
    this.rules[146].opcodes = [];
    this.rules[146].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[146].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[146].opcodes[2] = {type: 4, index: 342};// RNM(BWS)
    this.rules[146].opcodes[3] = {type: 4, index: 94};// RNM(boolCommonExpr)
    this.rules[146].opcodes[4] = {type: 4, index: 342};// RNM(BWS)
    this.rules[146].opcodes[5] = {type: 4, index: 352};// RNM(CLOSE)

    // parenExpr
    this.rules[147].opcodes = [];
    this.rules[147].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[147].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[147].opcodes[2] = {type: 4, index: 342};// RNM(BWS)
    this.rules[147].opcodes[3] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[147].opcodes[4] = {type: 4, index: 342};// RNM(BWS)
    this.rules[147].opcodes[5] = {type: 4, index: 352};// RNM(CLOSE)

    // andExpr
    this.rules[148].opcodes = [];
    this.rules[148].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[148].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[148].opcodes[2] = {type: 10, string: [97,110,100]};// TBS
    this.rules[148].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[148].opcodes[4] = {type: 4, index: 94};// RNM(boolCommonExpr)

    // orExpr
    this.rules[149].opcodes = [];
    this.rules[149].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[149].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[149].opcodes[2] = {type: 10, string: [111,114]};// TBS
    this.rules[149].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[149].opcodes[4] = {type: 4, index: 94};// RNM(boolCommonExpr)

    // eqExpr
    this.rules[150].opcodes = [];
    this.rules[150].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[150].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[150].opcodes[2] = {type: 10, string: [101,113]};// TBS
    this.rules[150].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[150].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // neExpr
    this.rules[151].opcodes = [];
    this.rules[151].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[151].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[151].opcodes[2] = {type: 10, string: [110,101]};// TBS
    this.rules[151].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[151].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // ltExpr
    this.rules[152].opcodes = [];
    this.rules[152].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[152].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[152].opcodes[2] = {type: 10, string: [108,116]};// TBS
    this.rules[152].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[152].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // leExpr
    this.rules[153].opcodes = [];
    this.rules[153].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[153].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[153].opcodes[2] = {type: 10, string: [108,101]};// TBS
    this.rules[153].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[153].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // gtExpr
    this.rules[154].opcodes = [];
    this.rules[154].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[154].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[154].opcodes[2] = {type: 10, string: [103,116]};// TBS
    this.rules[154].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[154].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // geExpr
    this.rules[155].opcodes = [];
    this.rules[155].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[155].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[155].opcodes[2] = {type: 10, string: [103,101]};// TBS
    this.rules[155].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[155].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // hasExpr
    this.rules[156].opcodes = [];
    this.rules[156].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[156].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[156].opcodes[2] = {type: 10, string: [104,97,115]};// TBS
    this.rules[156].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[156].opcodes[4] = {type: 4, index: 276};// RNM(enum)

    // addExpr
    this.rules[157].opcodes = [];
    this.rules[157].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[157].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[157].opcodes[2] = {type: 10, string: [97,100,100]};// TBS
    this.rules[157].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[157].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // subExpr
    this.rules[158].opcodes = [];
    this.rules[158].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[158].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[158].opcodes[2] = {type: 10, string: [115,117,98]};// TBS
    this.rules[158].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[158].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // mulExpr
    this.rules[159].opcodes = [];
    this.rules[159].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[159].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[159].opcodes[2] = {type: 10, string: [109,117,108]};// TBS
    this.rules[159].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[159].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // divExpr
    this.rules[160].opcodes = [];
    this.rules[160].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[160].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[160].opcodes[2] = {type: 10, string: [100,105,118]};// TBS
    this.rules[160].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[160].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // modExpr
    this.rules[161].opcodes = [];
    this.rules[161].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[161].opcodes[1] = {type: 4, index: 341};// RNM(RWS)
    this.rules[161].opcodes[2] = {type: 10, string: [109,111,100]};// TBS
    this.rules[161].opcodes[3] = {type: 4, index: 341};// RNM(RWS)
    this.rules[161].opcodes[4] = {type: 4, index: 93};// RNM(commonExpr)

    // negateExpr
    this.rules[162].opcodes = [];
    this.rules[162].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[162].opcodes[1] = {type: 9, string: [45]};// TLS
    this.rules[162].opcodes[2] = {type: 4, index: 342};// RNM(BWS)
    this.rules[162].opcodes[3] = {type: 4, index: 93};// RNM(commonExpr)

    // notExpr
    this.rules[163].opcodes = [];
    this.rules[163].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[163].opcodes[1] = {type: 10, string: [110,111,116]};// TBS
    this.rules[163].opcodes[2] = {type: 4, index: 341};// RNM(RWS)
    this.rules[163].opcodes[3] = {type: 4, index: 94};// RNM(boolCommonExpr)

    // isofExpr
    this.rules[164].opcodes = [];
    this.rules[164].opcodes[0] = {type: 2, children: [1,2,3,4,10,11,12]};// CAT
    this.rules[164].opcodes[1] = {type: 10, string: [105,115,111,102]};// TBS
    this.rules[164].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[164].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[164].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[164].opcodes[5] = {type: 2, children: [6,7,8,9]};// CAT
    this.rules[164].opcodes[6] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[164].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[164].opcodes[8] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[164].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[164].opcodes[10] = {type: 4, index: 195};// RNM(qualifiedTypeName)
    this.rules[164].opcodes[11] = {type: 4, index: 342};// RNM(BWS)
    this.rules[164].opcodes[12] = {type: 4, index: 352};// RNM(CLOSE)

    // castExpr
    this.rules[165].opcodes = [];
    this.rules[165].opcodes[0] = {type: 2, children: [1,2,3,4,10,11,12]};// CAT
    this.rules[165].opcodes[1] = {type: 10, string: [99,97,115,116]};// TBS
    this.rules[165].opcodes[2] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[165].opcodes[3] = {type: 4, index: 342};// RNM(BWS)
    this.rules[165].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[165].opcodes[5] = {type: 2, children: [6,7,8,9]};// CAT
    this.rules[165].opcodes[6] = {type: 4, index: 93};// RNM(commonExpr)
    this.rules[165].opcodes[7] = {type: 4, index: 342};// RNM(BWS)
    this.rules[165].opcodes[8] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[165].opcodes[9] = {type: 4, index: 342};// RNM(BWS)
    this.rules[165].opcodes[10] = {type: 4, index: 195};// RNM(qualifiedTypeName)
    this.rules[165].opcodes[11] = {type: 4, index: 342};// RNM(BWS)
    this.rules[165].opcodes[12] = {type: 4, index: 352};// RNM(CLOSE)

    // arrayOrObject
    this.rules[166].opcodes = [];
    this.rules[166].opcodes[0] = {type: 1, children: [1,2,3,4]};// ALT
    this.rules[166].opcodes[1] = {type: 4, index: 167};// RNM(complexColInUri)
    this.rules[166].opcodes[2] = {type: 4, index: 168};// RNM(complexInUri)
    this.rules[166].opcodes[3] = {type: 4, index: 177};// RNM(rootExprCol)
    this.rules[166].opcodes[4] = {type: 4, index: 170};// RNM(primitiveColInUri)

    // complexColInUri
    this.rules[167].opcodes = [];
    this.rules[167].opcodes[0] = {type: 2, children: [1,2,9]};// CAT
    this.rules[167].opcodes[1] = {type: 4, index: 180};// RNM(begin-array)
    this.rules[167].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[167].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[167].opcodes[4] = {type: 4, index: 168};// RNM(complexInUri)
    this.rules[167].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[167].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[167].opcodes[7] = {type: 4, index: 184};// RNM(value-separator)
    this.rules[167].opcodes[8] = {type: 4, index: 168};// RNM(complexInUri)
    this.rules[167].opcodes[9] = {type: 4, index: 181};// RNM(end-array)

    // complexInUri
    this.rules[168].opcodes = [];
    this.rules[168].opcodes[0] = {type: 2, children: [1,2,19]};// CAT
    this.rules[168].opcodes[1] = {type: 4, index: 178};// RNM(begin-object)
    this.rules[168].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[168].opcodes[3] = {type: 2, children: [4,10]};// CAT
    this.rules[168].opcodes[4] = {type: 1, children: [5,6,7,8,9]};// ALT
    this.rules[168].opcodes[5] = {type: 4, index: 172};// RNM(annotationInUri)
    this.rules[168].opcodes[6] = {type: 4, index: 173};// RNM(primitivePropertyInUri)
    this.rules[168].opcodes[7] = {type: 4, index: 171};// RNM(complexPropertyInUri)
    this.rules[168].opcodes[8] = {type: 4, index: 169};// RNM(collectionPropertyInUri)
    this.rules[168].opcodes[9] = {type: 4, index: 174};// RNM(navigationPropertyInUri)
    this.rules[168].opcodes[10] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[168].opcodes[11] = {type: 2, children: [12,13]};// CAT
    this.rules[168].opcodes[12] = {type: 4, index: 184};// RNM(value-separator)
    this.rules[168].opcodes[13] = {type: 1, children: [14,15,16,17,18]};// ALT
    this.rules[168].opcodes[14] = {type: 4, index: 172};// RNM(annotationInUri)
    this.rules[168].opcodes[15] = {type: 4, index: 173};// RNM(primitivePropertyInUri)
    this.rules[168].opcodes[16] = {type: 4, index: 171};// RNM(complexPropertyInUri)
    this.rules[168].opcodes[17] = {type: 4, index: 169};// RNM(collectionPropertyInUri)
    this.rules[168].opcodes[18] = {type: 4, index: 174};// RNM(navigationPropertyInUri)
    this.rules[168].opcodes[19] = {type: 4, index: 179};// RNM(end-object)

    // collectionPropertyInUri
    this.rules[169].opcodes = [];
    this.rules[169].opcodes[0] = {type: 1, children: [1,7]};// ALT
    this.rules[169].opcodes[1] = {type: 2, children: [2,3,4,5,6]};// CAT
    this.rules[169].opcodes[2] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[169].opcodes[3] = {type: 4, index: 219};// RNM(primitiveColProperty)
    this.rules[169].opcodes[4] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[169].opcodes[5] = {type: 4, index: 183};// RNM(name-separator)
    this.rules[169].opcodes[6] = {type: 4, index: 170};// RNM(primitiveColInUri)
    this.rules[169].opcodes[7] = {type: 2, children: [8,9,10,11,12]};// CAT
    this.rules[169].opcodes[8] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[169].opcodes[9] = {type: 4, index: 221};// RNM(complexColProperty)
    this.rules[169].opcodes[10] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[169].opcodes[11] = {type: 4, index: 183};// RNM(name-separator)
    this.rules[169].opcodes[12] = {type: 4, index: 167};// RNM(complexColInUri)

    // primitiveColInUri
    this.rules[170].opcodes = [];
    this.rules[170].opcodes[0] = {type: 2, children: [1,2,9]};// CAT
    this.rules[170].opcodes[1] = {type: 4, index: 180};// RNM(begin-array)
    this.rules[170].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[170].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[170].opcodes[4] = {type: 4, index: 185};// RNM(primitiveLiteralInJSON)
    this.rules[170].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[170].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[170].opcodes[7] = {type: 4, index: 184};// RNM(value-separator)
    this.rules[170].opcodes[8] = {type: 4, index: 185};// RNM(primitiveLiteralInJSON)
    this.rules[170].opcodes[9] = {type: 4, index: 181};// RNM(end-array)

    // complexPropertyInUri
    this.rules[171].opcodes = [];
    this.rules[171].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[171].opcodes[1] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[171].opcodes[2] = {type: 4, index: 220};// RNM(complexProperty)
    this.rules[171].opcodes[3] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[171].opcodes[4] = {type: 4, index: 183};// RNM(name-separator)
    this.rules[171].opcodes[5] = {type: 4, index: 168};// RNM(complexInUri)

    // annotationInUri
    this.rules[172].opcodes = [];
    this.rules[172].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8]};// CAT
    this.rules[172].opcodes[1] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[172].opcodes[2] = {type: 4, index: 343};// RNM(AT)
    this.rules[172].opcodes[3] = {type: 4, index: 200};// RNM(namespace)
    this.rules[172].opcodes[4] = {type: 9, string: [46]};// TLS
    this.rules[172].opcodes[5] = {type: 4, index: 209};// RNM(termName)
    this.rules[172].opcodes[6] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[172].opcodes[7] = {type: 4, index: 183};// RNM(name-separator)
    this.rules[172].opcodes[8] = {type: 1, children: [9,10,11,12]};// ALT
    this.rules[172].opcodes[9] = {type: 4, index: 168};// RNM(complexInUri)
    this.rules[172].opcodes[10] = {type: 4, index: 167};// RNM(complexColInUri)
    this.rules[172].opcodes[11] = {type: 4, index: 185};// RNM(primitiveLiteralInJSON)
    this.rules[172].opcodes[12] = {type: 4, index: 170};// RNM(primitiveColInUri)

    // primitivePropertyInUri
    this.rules[173].opcodes = [];
    this.rules[173].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[173].opcodes[1] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[173].opcodes[2] = {type: 4, index: 216};// RNM(primitiveProperty)
    this.rules[173].opcodes[3] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[173].opcodes[4] = {type: 4, index: 183};// RNM(name-separator)
    this.rules[173].opcodes[5] = {type: 4, index: 185};// RNM(primitiveLiteralInJSON)

    // navigationPropertyInUri
    this.rules[174].opcodes = [];
    this.rules[174].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[174].opcodes[1] = {type: 4, index: 175};// RNM(singleNavPropInJSON)
    this.rules[174].opcodes[2] = {type: 4, index: 176};// RNM(collectionNavPropInJSON)

    // singleNavPropInJSON
    this.rules[175].opcodes = [];
    this.rules[175].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[175].opcodes[1] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[175].opcodes[2] = {type: 4, index: 224};// RNM(entityNavigationProperty)
    this.rules[175].opcodes[3] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[175].opcodes[4] = {type: 4, index: 183};// RNM(name-separator)
    this.rules[175].opcodes[5] = {type: 4, index: 95};// RNM(rootExpr)

    // collectionNavPropInJSON
    this.rules[176].opcodes = [];
    this.rules[176].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[176].opcodes[1] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[176].opcodes[2] = {type: 4, index: 225};// RNM(entityColNavigationProperty)
    this.rules[176].opcodes[3] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[176].opcodes[4] = {type: 4, index: 183};// RNM(name-separator)
    this.rules[176].opcodes[5] = {type: 4, index: 177};// RNM(rootExprCol)

    // rootExprCol
    this.rules[177].opcodes = [];
    this.rules[177].opcodes[0] = {type: 2, children: [1,2,9]};// CAT
    this.rules[177].opcodes[1] = {type: 4, index: 180};// RNM(begin-array)
    this.rules[177].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[177].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[177].opcodes[4] = {type: 4, index: 95};// RNM(rootExpr)
    this.rules[177].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[177].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[177].opcodes[7] = {type: 4, index: 184};// RNM(value-separator)
    this.rules[177].opcodes[8] = {type: 4, index: 95};// RNM(rootExpr)
    this.rules[177].opcodes[9] = {type: 4, index: 181};// RNM(end-array)

    // begin-object
    this.rules[178].opcodes = [];
    this.rules[178].opcodes[0] = {type: 2, children: [1,2,5]};// CAT
    this.rules[178].opcodes[1] = {type: 4, index: 342};// RNM(BWS)
    this.rules[178].opcodes[2] = {type: 1, children: [3,4]};// ALT
    this.rules[178].opcodes[3] = {type: 9, string: [123]};// TLS
    this.rules[178].opcodes[4] = {type: 9, string: [37,55,98]};// TLS
    this.rules[178].opcodes[5] = {type: 4, index: 342};// RNM(BWS)

    // end-object
    this.rules[179].opcodes = [];
    this.rules[179].opcodes[0] = {type: 2, children: [1,2,5]};// CAT
    this.rules[179].opcodes[1] = {type: 4, index: 342};// RNM(BWS)
    this.rules[179].opcodes[2] = {type: 1, children: [3,4]};// ALT
    this.rules[179].opcodes[3] = {type: 9, string: [125]};// TLS
    this.rules[179].opcodes[4] = {type: 9, string: [37,55,100]};// TLS
    this.rules[179].opcodes[5] = {type: 4, index: 342};// RNM(BWS)

    // begin-array
    this.rules[180].opcodes = [];
    this.rules[180].opcodes[0] = {type: 2, children: [1,2,5]};// CAT
    this.rules[180].opcodes[1] = {type: 4, index: 342};// RNM(BWS)
    this.rules[180].opcodes[2] = {type: 1, children: [3,4]};// ALT
    this.rules[180].opcodes[3] = {type: 9, string: [91]};// TLS
    this.rules[180].opcodes[4] = {type: 9, string: [37,53,98]};// TLS
    this.rules[180].opcodes[5] = {type: 4, index: 342};// RNM(BWS)

    // end-array
    this.rules[181].opcodes = [];
    this.rules[181].opcodes[0] = {type: 2, children: [1,2,5]};// CAT
    this.rules[181].opcodes[1] = {type: 4, index: 342};// RNM(BWS)
    this.rules[181].opcodes[2] = {type: 1, children: [3,4]};// ALT
    this.rules[181].opcodes[3] = {type: 9, string: [93]};// TLS
    this.rules[181].opcodes[4] = {type: 9, string: [37,53,100]};// TLS
    this.rules[181].opcodes[5] = {type: 4, index: 342};// RNM(BWS)

    // quotation-mark
    this.rules[182].opcodes = [];
    this.rules[182].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[182].opcodes[1] = {type: 4, index: 394};// RNM(DQUOTE)
    this.rules[182].opcodes[2] = {type: 9, string: [37,50,50]};// TLS

    // name-separator
    this.rules[183].opcodes = [];
    this.rules[183].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[183].opcodes[1] = {type: 4, index: 342};// RNM(BWS)
    this.rules[183].opcodes[2] = {type: 4, index: 344};// RNM(COLON)
    this.rules[183].opcodes[3] = {type: 4, index: 342};// RNM(BWS)

    // value-separator
    this.rules[184].opcodes = [];
    this.rules[184].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[184].opcodes[1] = {type: 4, index: 342};// RNM(BWS)
    this.rules[184].opcodes[2] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[184].opcodes[3] = {type: 4, index: 342};// RNM(BWS)

    // primitiveLiteralInJSON
    this.rules[185].opcodes = [];
    this.rules[185].opcodes[0] = {type: 1, children: [1,2,3,4,5]};// ALT
    this.rules[185].opcodes[1] = {type: 4, index: 186};// RNM(stringInJSON)
    this.rules[185].opcodes[2] = {type: 4, index: 190};// RNM(numberInJSON)
    this.rules[185].opcodes[3] = {type: 10, string: [116,114,117,101]};// TBS
    this.rules[185].opcodes[4] = {type: 10, string: [102,97,108,115,101]};// TBS
    this.rules[185].opcodes[5] = {type: 10, string: [110,117,108,108]};// TBS

    // stringInJSON
    this.rules[186].opcodes = [];
    this.rules[186].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
    this.rules[186].opcodes[1] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[186].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[186].opcodes[3] = {type: 4, index: 187};// RNM(charInJSON)
    this.rules[186].opcodes[4] = {type: 4, index: 182};// RNM(quotation-mark)

    // charInJSON
    this.rules[187].opcodes = [];
    this.rules[187].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[187].opcodes[1] = {type: 4, index: 385};// RNM(qchar-unescaped)
    this.rules[187].opcodes[2] = {type: 4, index: 188};// RNM(qchar-JSON-special)
    this.rules[187].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[187].opcodes[4] = {type: 4, index: 189};// RNM(escape)
    this.rules[187].opcodes[5] = {type: 1, children: [6,7,8,11,12,13,14,15,16]};// ALT
    this.rules[187].opcodes[6] = {type: 4, index: 182};// RNM(quotation-mark)
    this.rules[187].opcodes[7] = {type: 4, index: 189};// RNM(escape)
    this.rules[187].opcodes[8] = {type: 1, children: [9,10]};// ALT
    this.rules[187].opcodes[9] = {type: 9, string: [47]};// TLS
    this.rules[187].opcodes[10] = {type: 9, string: [37,50,102]};// TLS
    this.rules[187].opcodes[11] = {type: 10, string: [98]};// TBS
    this.rules[187].opcodes[12] = {type: 10, string: [102]};// TBS
    this.rules[187].opcodes[13] = {type: 10, string: [110]};// TBS
    this.rules[187].opcodes[14] = {type: 10, string: [114]};// TBS
    this.rules[187].opcodes[15] = {type: 10, string: [116]};// TBS
    this.rules[187].opcodes[16] = {type: 2, children: [17,18]};// CAT
    this.rules[187].opcodes[17] = {type: 10, string: [117]};// TBS
    this.rules[187].opcodes[18] = {type: 3, min: 4, max: 4};// REP
    this.rules[187].opcodes[19] = {type: 4, index: 392};// RNM(HEXDIG)

    // qchar-JSON-special
    this.rules[188].opcodes = [];
    this.rules[188].opcodes[0] = {type: 1, children: [1,2,3,4,5,6]};// ALT
    this.rules[188].opcodes[1] = {type: 4, index: 395};// RNM(SP)
    this.rules[188].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[188].opcodes[3] = {type: 9, string: [123]};// TLS
    this.rules[188].opcodes[4] = {type: 9, string: [125]};// TLS
    this.rules[188].opcodes[5] = {type: 9, string: [91]};// TLS
    this.rules[188].opcodes[6] = {type: 9, string: [93]};// TLS

    // escape
    this.rules[189].opcodes = [];
    this.rules[189].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[189].opcodes[1] = {type: 9, string: [92]};// TLS
    this.rules[189].opcodes[2] = {type: 9, string: [37,53,99]};// TLS

    // numberInJSON
    this.rules[190].opcodes = [];
    this.rules[190].opcodes[0] = {type: 2, children: [1,3,4,6]};// CAT
    this.rules[190].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[190].opcodes[2] = {type: 9, string: [45]};// TLS
    this.rules[190].opcodes[3] = {type: 4, index: 191};// RNM(int)
    this.rules[190].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[190].opcodes[5] = {type: 4, index: 192};// RNM(frac)
    this.rules[190].opcodes[6] = {type: 3, min: 0, max: 1};// REP
    this.rules[190].opcodes[7] = {type: 4, index: 193};// RNM(exp)

    // int
    this.rules[191].opcodes = [];
    this.rules[191].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[191].opcodes[1] = {type: 9, string: [48]};// TLS
    this.rules[191].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[191].opcodes[3] = {type: 4, index: 267};// RNM(oneToNine)
    this.rules[191].opcodes[4] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[191].opcodes[5] = {type: 4, index: 391};// RNM(DIGIT)

    // frac
    this.rules[192].opcodes = [];
    this.rules[192].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[192].opcodes[1] = {type: 9, string: [46]};// TLS
    this.rules[192].opcodes[2] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[192].opcodes[3] = {type: 4, index: 391};// RNM(DIGIT)

    // exp
    this.rules[193].opcodes = [];
    this.rules[193].opcodes[0] = {type: 2, children: [1,2,6]};// CAT
    this.rules[193].opcodes[1] = {type: 9, string: [101]};// TLS
    this.rules[193].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[193].opcodes[3] = {type: 1, children: [4,5]};// ALT
    this.rules[193].opcodes[4] = {type: 9, string: [45]};// TLS
    this.rules[193].opcodes[5] = {type: 9, string: [43]};// TLS
    this.rules[193].opcodes[6] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[193].opcodes[7] = {type: 4, index: 391};// RNM(DIGIT)

    // singleQualifiedTypeName
    this.rules[194].opcodes = [];
    this.rules[194].opcodes[0] = {type: 1, children: [1,2,3,4,5]};// ALT
    this.rules[194].opcodes[1] = {type: 4, index: 196};// RNM(qualifiedEntityTypeName)
    this.rules[194].opcodes[2] = {type: 4, index: 197};// RNM(qualifiedComplexTypeName)
    this.rules[194].opcodes[3] = {type: 4, index: 198};// RNM(qualifiedTypeDefinitionName)
    this.rules[194].opcodes[4] = {type: 4, index: 199};// RNM(qualifiedEnumTypeName)
    this.rules[194].opcodes[5] = {type: 4, index: 213};// RNM(primitiveTypeName)

    // qualifiedTypeName
    this.rules[195].opcodes = [];
    this.rules[195].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[195].opcodes[1] = {type: 4, index: 194};// RNM(singleQualifiedTypeName)
    this.rules[195].opcodes[2] = {type: 2, children: [3,4,5,6]};// CAT
    this.rules[195].opcodes[3] = {type: 10, string: [67,111,108,108,101,99,116,105,111,110]};// TBS
    this.rules[195].opcodes[4] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[195].opcodes[5] = {type: 4, index: 194};// RNM(singleQualifiedTypeName)
    this.rules[195].opcodes[6] = {type: 4, index: 352};// RNM(CLOSE)

    // qualifiedEntityTypeName
    this.rules[196].opcodes = [];
    this.rules[196].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[196].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[196].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[196].opcodes[3] = {type: 4, index: 204};// RNM(entityTypeName)

    // qualifiedComplexTypeName
    this.rules[197].opcodes = [];
    this.rules[197].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[197].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[197].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[197].opcodes[3] = {type: 4, index: 205};// RNM(complexTypeName)

    // qualifiedTypeDefinitionName
    this.rules[198].opcodes = [];
    this.rules[198].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[198].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[198].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[198].opcodes[3] = {type: 4, index: 206};// RNM(typeDefinitionName)

    // qualifiedEnumTypeName
    this.rules[199].opcodes = [];
    this.rules[199].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[199].opcodes[1] = {type: 4, index: 200};// RNM(namespace)
    this.rules[199].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[199].opcodes[3] = {type: 4, index: 207};// RNM(enumerationTypeName)

    // namespace
    this.rules[200].opcodes = [];
    this.rules[200].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[200].opcodes[1] = {type: 4, index: 201};// RNM(namespacePart)
    this.rules[200].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[200].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[200].opcodes[4] = {type: 9, string: [46]};// TLS
    this.rules[200].opcodes[5] = {type: 4, index: 201};// RNM(namespacePart)

    // namespacePart
    this.rules[201].opcodes = [];
    this.rules[201].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // entitySetName
    this.rules[202].opcodes = [];
    this.rules[202].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // singletonEntity
    this.rules[203].opcodes = [];
    this.rules[203].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // entityTypeName
    this.rules[204].opcodes = [];
    this.rules[204].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // complexTypeName
    this.rules[205].opcodes = [];
    this.rules[205].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // typeDefinitionName
    this.rules[206].opcodes = [];
    this.rules[206].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // enumerationTypeName
    this.rules[207].opcodes = [];
    this.rules[207].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // enumerationMember
    this.rules[208].opcodes = [];
    this.rules[208].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // termName
    this.rules[209].opcodes = [];
    this.rules[209].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // odataIdentifier
    this.rules[210].opcodes = [];
    this.rules[210].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[210].opcodes[1] = {type: 4, index: 211};// RNM(identifierLeadingCharacter)
    this.rules[210].opcodes[2] = {type: 3, min: 0, max: 127};// REP
    this.rules[210].opcodes[3] = {type: 4, index: 212};// RNM(identifierCharacter)

    // identifierLeadingCharacter
    this.rules[211].opcodes = [];
    this.rules[211].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[211].opcodes[1] = {type: 4, index: 390};// RNM(ALPHA)
    this.rules[211].opcodes[2] = {type: 9, string: [95]};// TLS

    // identifierCharacter
    this.rules[212].opcodes = [];
    this.rules[212].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[212].opcodes[1] = {type: 4, index: 390};// RNM(ALPHA)
    this.rules[212].opcodes[2] = {type: 9, string: [95]};// TLS
    this.rules[212].opcodes[3] = {type: 4, index: 391};// RNM(DIGIT)

    // primitiveTypeName
    this.rules[213].opcodes = [];
    this.rules[213].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[213].opcodes[1] = {type: 10, string: [69,100,109,46]};// TBS
    this.rules[213].opcodes[2] = {type: 1, children: [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]};// ALT
    this.rules[213].opcodes[3] = {type: 10, string: [66,105,110,97,114,121]};// TBS
    this.rules[213].opcodes[4] = {type: 10, string: [66,111,111,108,101,97,110]};// TBS
    this.rules[213].opcodes[5] = {type: 10, string: [66,121,116,101]};// TBS
    this.rules[213].opcodes[6] = {type: 10, string: [68,97,116,101]};// TBS
    this.rules[213].opcodes[7] = {type: 10, string: [68,97,116,101,84,105,109,101,79,102,102,115,101,116]};// TBS
    this.rules[213].opcodes[8] = {type: 10, string: [68,101,99,105,109,97,108]};// TBS
    this.rules[213].opcodes[9] = {type: 10, string: [68,111,117,98,108,101]};// TBS
    this.rules[213].opcodes[10] = {type: 10, string: [68,117,114,97,116,105,111,110]};// TBS
    this.rules[213].opcodes[11] = {type: 10, string: [71,117,105,100]};// TBS
    this.rules[213].opcodes[12] = {type: 10, string: [73,110,116,49,54]};// TBS
    this.rules[213].opcodes[13] = {type: 10, string: [73,110,116,51,50]};// TBS
    this.rules[213].opcodes[14] = {type: 10, string: [73,110,116,54,52]};// TBS
    this.rules[213].opcodes[15] = {type: 10, string: [83,66,121,116,101]};// TBS
    this.rules[213].opcodes[16] = {type: 10, string: [83,105,110,103,108,101]};// TBS
    this.rules[213].opcodes[17] = {type: 10, string: [83,116,114,101,97,109]};// TBS
    this.rules[213].opcodes[18] = {type: 10, string: [83,116,114,105,110,103]};// TBS
    this.rules[213].opcodes[19] = {type: 10, string: [84,105,109,101,79,102,68,97,121]};// TBS
    this.rules[213].opcodes[20] = {type: 2, children: [21,22]};// CAT
    this.rules[213].opcodes[21] = {type: 4, index: 214};// RNM(abstractSpatialTypeName)
    this.rules[213].opcodes[22] = {type: 3, min: 0, max: 1};// REP
    this.rules[213].opcodes[23] = {type: 4, index: 215};// RNM(concreteSpatialTypeName)

    // abstractSpatialTypeName
    this.rules[214].opcodes = [];
    this.rules[214].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[214].opcodes[1] = {type: 10, string: [71,101,111,103,114,97,112,104,121]};// TBS
    this.rules[214].opcodes[2] = {type: 10, string: [71,101,111,109,101,116,114,121]};// TBS

    // concreteSpatialTypeName
    this.rules[215].opcodes = [];
    this.rules[215].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7]};// ALT
    this.rules[215].opcodes[1] = {type: 10, string: [67,111,108,108,101,99,116,105,111,110]};// TBS
    this.rules[215].opcodes[2] = {type: 10, string: [76,105,110,101,83,116,114,105,110,103]};// TBS
    this.rules[215].opcodes[3] = {type: 10, string: [77,117,108,116,105,76,105,110,101,83,116,114,105,110,103]};// TBS
    this.rules[215].opcodes[4] = {type: 10, string: [77,117,108,116,105,80,111,105,110,116]};// TBS
    this.rules[215].opcodes[5] = {type: 10, string: [77,117,108,116,105,80,111,108,121,103,111,110]};// TBS
    this.rules[215].opcodes[6] = {type: 10, string: [80,111,105,110,116]};// TBS
    this.rules[215].opcodes[7] = {type: 10, string: [80,111,108,121,103,111,110]};// TBS

    // primitiveProperty
    this.rules[216].opcodes = [];
    this.rules[216].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[216].opcodes[1] = {type: 4, index: 217};// RNM(primitiveKeyProperty)
    this.rules[216].opcodes[2] = {type: 4, index: 218};// RNM(primitiveNonKeyProperty)

    // primitiveKeyProperty
    this.rules[217].opcodes = [];
    this.rules[217].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // primitiveNonKeyProperty
    this.rules[218].opcodes = [];
    this.rules[218].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // primitiveColProperty
    this.rules[219].opcodes = [];
    this.rules[219].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // complexProperty
    this.rules[220].opcodes = [];
    this.rules[220].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // complexColProperty
    this.rules[221].opcodes = [];
    this.rules[221].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // streamProperty
    this.rules[222].opcodes = [];
    this.rules[222].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // navigationProperty
    this.rules[223].opcodes = [];
    this.rules[223].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[223].opcodes[1] = {type: 4, index: 224};// RNM(entityNavigationProperty)
    this.rules[223].opcodes[2] = {type: 4, index: 225};// RNM(entityColNavigationProperty)

    // entityNavigationProperty
    this.rules[224].opcodes = [];
    this.rules[224].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // entityColNavigationProperty
    this.rules[225].opcodes = [];
    this.rules[225].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // action
    this.rules[226].opcodes = [];
    this.rules[226].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // actionImport
    this.rules[227].opcodes = [];
    this.rules[227].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // function
    this.rules[228].opcodes = [];
    this.rules[228].opcodes[0] = {type: 1, children: [1,2,3,4,5,6]};// ALT
    this.rules[228].opcodes[1] = {type: 4, index: 229};// RNM(entityFunction)
    this.rules[228].opcodes[2] = {type: 4, index: 230};// RNM(entityColFunction)
    this.rules[228].opcodes[3] = {type: 4, index: 231};// RNM(complexFunction)
    this.rules[228].opcodes[4] = {type: 4, index: 232};// RNM(complexColFunction)
    this.rules[228].opcodes[5] = {type: 4, index: 233};// RNM(primitiveFunction)
    this.rules[228].opcodes[6] = {type: 4, index: 234};// RNM(primitiveColFunction)

    // entityFunction
    this.rules[229].opcodes = [];
    this.rules[229].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // entityColFunction
    this.rules[230].opcodes = [];
    this.rules[230].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // complexFunction
    this.rules[231].opcodes = [];
    this.rules[231].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // complexColFunction
    this.rules[232].opcodes = [];
    this.rules[232].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // primitiveFunction
    this.rules[233].opcodes = [];
    this.rules[233].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // primitiveColFunction
    this.rules[234].opcodes = [];
    this.rules[234].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // entityFunctionImport
    this.rules[235].opcodes = [];
    this.rules[235].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // entityColFunctionImport
    this.rules[236].opcodes = [];
    this.rules[236].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // complexFunctionImport
    this.rules[237].opcodes = [];
    this.rules[237].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // complexColFunctionImport
    this.rules[238].opcodes = [];
    this.rules[238].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // primitiveFunctionImport
    this.rules[239].opcodes = [];
    this.rules[239].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // primitiveColFunctionImport
    this.rules[240].opcodes = [];
    this.rules[240].opcodes[0] = {type: 4, index: 210};// RNM(odataIdentifier)

    // primitiveLiteral
    this.rules[241].opcodes = [];
    this.rules[241].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]};// ALT
    this.rules[241].opcodes[1] = {type: 4, index: 243};// RNM(nullValue)
    this.rules[241].opcodes[2] = {type: 4, index: 249};// RNM(booleanValue)
    this.rules[241].opcodes[3] = {type: 4, index: 254};// RNM(guidValue)
    this.rules[241].opcodes[4] = {type: 4, index: 262};// RNM(dateValue)
    this.rules[241].opcodes[5] = {type: 4, index: 263};// RNM(dateTimeOffsetValue)
    this.rules[241].opcodes[6] = {type: 4, index: 266};// RNM(timeOfDayValue)
    this.rules[241].opcodes[7] = {type: 4, index: 250};// RNM(decimalValue)
    this.rules[241].opcodes[8] = {type: 4, index: 251};// RNM(doubleValue)
    this.rules[241].opcodes[9] = {type: 4, index: 252};// RNM(singleValue)
    this.rules[241].opcodes[10] = {type: 4, index: 256};// RNM(sbyteValue)
    this.rules[241].opcodes[11] = {type: 4, index: 255};// RNM(byteValue)
    this.rules[241].opcodes[12] = {type: 4, index: 257};// RNM(int16Value)
    this.rules[241].opcodes[13] = {type: 4, index: 258};// RNM(int32Value)
    this.rules[241].opcodes[14] = {type: 4, index: 259};// RNM(int64Value)
    this.rules[241].opcodes[15] = {type: 4, index: 260};// RNM(string)
    this.rules[241].opcodes[16] = {type: 4, index: 264};// RNM(duration)
    this.rules[241].opcodes[17] = {type: 4, index: 244};// RNM(binary)
    this.rules[241].opcodes[18] = {type: 4, index: 276};// RNM(enum)
    this.rules[241].opcodes[19] = {type: 4, index: 280};// RNM(geographyCollection)
    this.rules[241].opcodes[20] = {type: 4, index: 284};// RNM(geographyLineString)
    this.rules[241].opcodes[21] = {type: 4, index: 288};// RNM(geographyMultiLineString)
    this.rules[241].opcodes[22] = {type: 4, index: 291};// RNM(geographyMultiPoint)
    this.rules[241].opcodes[23] = {type: 4, index: 294};// RNM(geographyMultiPolygon)
    this.rules[241].opcodes[24] = {type: 4, index: 297};// RNM(geographyPoint)
    this.rules[241].opcodes[25] = {type: 4, index: 303};// RNM(geographyPolygon)
    this.rules[241].opcodes[26] = {type: 4, index: 308};// RNM(geometryCollection)
    this.rules[241].opcodes[27] = {type: 4, index: 309};// RNM(geometryLineString)
    this.rules[241].opcodes[28] = {type: 4, index: 310};// RNM(geometryMultiLineString)
    this.rules[241].opcodes[29] = {type: 4, index: 311};// RNM(geometryMultiPoint)
    this.rules[241].opcodes[30] = {type: 4, index: 312};// RNM(geometryMultiPolygon)
    this.rules[241].opcodes[31] = {type: 4, index: 313};// RNM(geometryPoint)
    this.rules[241].opcodes[32] = {type: 4, index: 314};// RNM(geometryPolygon)

    // primitiveValue
    this.rules[242].opcodes = [];
    this.rules[242].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]};// ALT
    this.rules[242].opcodes[1] = {type: 4, index: 249};// RNM(booleanValue)
    this.rules[242].opcodes[2] = {type: 4, index: 254};// RNM(guidValue)
    this.rules[242].opcodes[3] = {type: 4, index: 265};// RNM(durationValue)
    this.rules[242].opcodes[4] = {type: 4, index: 262};// RNM(dateValue)
    this.rules[242].opcodes[5] = {type: 4, index: 263};// RNM(dateTimeOffsetValue)
    this.rules[242].opcodes[6] = {type: 4, index: 266};// RNM(timeOfDayValue)
    this.rules[242].opcodes[7] = {type: 4, index: 277};// RNM(enumValue)
    this.rules[242].opcodes[8] = {type: 4, index: 281};// RNM(fullCollectionLiteral)
    this.rules[242].opcodes[9] = {type: 4, index: 285};// RNM(fullLineStringLiteral)
    this.rules[242].opcodes[10] = {type: 4, index: 292};// RNM(fullMultiPointLiteral)
    this.rules[242].opcodes[11] = {type: 4, index: 289};// RNM(fullMultiLineStringLiteral)
    this.rules[242].opcodes[12] = {type: 4, index: 295};// RNM(fullMultiPolygonLiteral)
    this.rules[242].opcodes[13] = {type: 4, index: 298};// RNM(fullPointLiteral)
    this.rules[242].opcodes[14] = {type: 4, index: 304};// RNM(fullPolygonLiteral)
    this.rules[242].opcodes[15] = {type: 4, index: 250};// RNM(decimalValue)
    this.rules[242].opcodes[16] = {type: 4, index: 251};// RNM(doubleValue)
    this.rules[242].opcodes[17] = {type: 4, index: 252};// RNM(singleValue)
    this.rules[242].opcodes[18] = {type: 4, index: 256};// RNM(sbyteValue)
    this.rules[242].opcodes[19] = {type: 4, index: 255};// RNM(byteValue)
    this.rules[242].opcodes[20] = {type: 4, index: 257};// RNM(int16Value)
    this.rules[242].opcodes[21] = {type: 4, index: 258};// RNM(int32Value)
    this.rules[242].opcodes[22] = {type: 4, index: 259};// RNM(int64Value)
    this.rules[242].opcodes[23] = {type: 4, index: 245};// RNM(binaryValue)

    // nullValue
    this.rules[243].opcodes = [];
    this.rules[243].opcodes[0] = {type: 10, string: [110,117,108,108]};// TBS

    // binary
    this.rules[244].opcodes = [];
    this.rules[244].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[244].opcodes[1] = {type: 9, string: [98,105,110,97,114,121]};// TLS
    this.rules[244].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[244].opcodes[3] = {type: 4, index: 245};// RNM(binaryValue)
    this.rules[244].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // binaryValue
    this.rules[245].opcodes = [];
    this.rules[245].opcodes[0] = {type: 2, children: [1,4]};// CAT
    this.rules[245].opcodes[1] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[245].opcodes[2] = {type: 3, min: 4, max: 4};// REP
    this.rules[245].opcodes[3] = {type: 4, index: 248};// RNM(base64char)
    this.rules[245].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[245].opcodes[5] = {type: 1, children: [6,7]};// ALT
    this.rules[245].opcodes[6] = {type: 4, index: 246};// RNM(base64b16)
    this.rules[245].opcodes[7] = {type: 4, index: 247};// RNM(base64b8)

    // base64b16
    this.rules[246].opcodes = [];
    this.rules[246].opcodes[0] = {type: 2, children: [1,3,20]};// CAT
    this.rules[246].opcodes[1] = {type: 3, min: 2, max: 2};// REP
    this.rules[246].opcodes[2] = {type: 4, index: 248};// RNM(base64char)
    this.rules[246].opcodes[3] = {type: 1, children: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]};// ALT
    this.rules[246].opcodes[4] = {type: 10, string: [65]};// TBS
    this.rules[246].opcodes[5] = {type: 10, string: [69]};// TBS
    this.rules[246].opcodes[6] = {type: 10, string: [73]};// TBS
    this.rules[246].opcodes[7] = {type: 10, string: [77]};// TBS
    this.rules[246].opcodes[8] = {type: 10, string: [81]};// TBS
    this.rules[246].opcodes[9] = {type: 10, string: [85]};// TBS
    this.rules[246].opcodes[10] = {type: 10, string: [89]};// TBS
    this.rules[246].opcodes[11] = {type: 10, string: [99]};// TBS
    this.rules[246].opcodes[12] = {type: 10, string: [103]};// TBS
    this.rules[246].opcodes[13] = {type: 10, string: [107]};// TBS
    this.rules[246].opcodes[14] = {type: 10, string: [111]};// TBS
    this.rules[246].opcodes[15] = {type: 10, string: [115]};// TBS
    this.rules[246].opcodes[16] = {type: 10, string: [119]};// TBS
    this.rules[246].opcodes[17] = {type: 10, string: [48]};// TBS
    this.rules[246].opcodes[18] = {type: 10, string: [52]};// TBS
    this.rules[246].opcodes[19] = {type: 10, string: [56]};// TBS
    this.rules[246].opcodes[20] = {type: 3, min: 0, max: 1};// REP
    this.rules[246].opcodes[21] = {type: 9, string: [61]};// TLS

    // base64b8
    this.rules[247].opcodes = [];
    this.rules[247].opcodes[0] = {type: 2, children: [1,2,7]};// CAT
    this.rules[247].opcodes[1] = {type: 4, index: 248};// RNM(base64char)
    this.rules[247].opcodes[2] = {type: 1, children: [3,4,5,6]};// ALT
    this.rules[247].opcodes[3] = {type: 10, string: [65]};// TBS
    this.rules[247].opcodes[4] = {type: 10, string: [81]};// TBS
    this.rules[247].opcodes[5] = {type: 10, string: [103]};// TBS
    this.rules[247].opcodes[6] = {type: 10, string: [119]};// TBS
    this.rules[247].opcodes[7] = {type: 3, min: 0, max: 1};// REP
    this.rules[247].opcodes[8] = {type: 9, string: [61,61]};// TLS

    // base64char
    this.rules[248].opcodes = [];
    this.rules[248].opcodes[0] = {type: 1, children: [1,2,3,4]};// ALT
    this.rules[248].opcodes[1] = {type: 4, index: 390};// RNM(ALPHA)
    this.rules[248].opcodes[2] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[248].opcodes[3] = {type: 9, string: [45]};// TLS
    this.rules[248].opcodes[4] = {type: 9, string: [95]};// TLS

    // booleanValue
    this.rules[249].opcodes = [];
    this.rules[249].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[249].opcodes[1] = {type: 9, string: [116,114,117,101]};// TLS
    this.rules[249].opcodes[2] = {type: 9, string: [102,97,108,115,101]};// TLS

    // decimalValue
    this.rules[250].opcodes = [];
    this.rules[250].opcodes[0] = {type: 2, children: [1,3,5]};// CAT
    this.rules[250].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[250].opcodes[2] = {type: 4, index: 347};// RNM(SIGN)
    this.rules[250].opcodes[3] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[250].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[250].opcodes[5] = {type: 3, min: 0, max: 1};// REP
    this.rules[250].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[250].opcodes[7] = {type: 9, string: [46]};// TLS
    this.rules[250].opcodes[8] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[250].opcodes[9] = {type: 4, index: 391};// RNM(DIGIT)

    // doubleValue
    this.rules[251].opcodes = [];
    this.rules[251].opcodes[0] = {type: 1, children: [1,10]};// ALT
    this.rules[251].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[251].opcodes[2] = {type: 4, index: 250};// RNM(decimalValue)
    this.rules[251].opcodes[3] = {type: 3, min: 0, max: 1};// REP
    this.rules[251].opcodes[4] = {type: 2, children: [5,6,8]};// CAT
    this.rules[251].opcodes[5] = {type: 9, string: [101]};// TLS
    this.rules[251].opcodes[6] = {type: 3, min: 0, max: 1};// REP
    this.rules[251].opcodes[7] = {type: 4, index: 347};// RNM(SIGN)
    this.rules[251].opcodes[8] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[251].opcodes[9] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[251].opcodes[10] = {type: 4, index: 253};// RNM(nanInfinity)

    // singleValue
    this.rules[252].opcodes = [];
    this.rules[252].opcodes[0] = {type: 4, index: 251};// RNM(doubleValue)

    // nanInfinity
    this.rules[253].opcodes = [];
    this.rules[253].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[253].opcodes[1] = {type: 10, string: [78,97,78]};// TBS
    this.rules[253].opcodes[2] = {type: 10, string: [45,73,78,70]};// TBS
    this.rules[253].opcodes[3] = {type: 10, string: [73,78,70]};// TBS

    // guidValue
    this.rules[254].opcodes = [];
    this.rules[254].opcodes[0] = {type: 2, children: [1,3,4,6,7,9,10,12,13]};// CAT
    this.rules[254].opcodes[1] = {type: 3, min: 8, max: 8};// REP
    this.rules[254].opcodes[2] = {type: 4, index: 392};// RNM(HEXDIG)
    this.rules[254].opcodes[3] = {type: 9, string: [45]};// TLS
    this.rules[254].opcodes[4] = {type: 3, min: 4, max: 4};// REP
    this.rules[254].opcodes[5] = {type: 4, index: 392};// RNM(HEXDIG)
    this.rules[254].opcodes[6] = {type: 9, string: [45]};// TLS
    this.rules[254].opcodes[7] = {type: 3, min: 4, max: 4};// REP
    this.rules[254].opcodes[8] = {type: 4, index: 392};// RNM(HEXDIG)
    this.rules[254].opcodes[9] = {type: 9, string: [45]};// TLS
    this.rules[254].opcodes[10] = {type: 3, min: 4, max: 4};// REP
    this.rules[254].opcodes[11] = {type: 4, index: 392};// RNM(HEXDIG)
    this.rules[254].opcodes[12] = {type: 9, string: [45]};// TLS
    this.rules[254].opcodes[13] = {type: 3, min: 12, max: 12};// REP
    this.rules[254].opcodes[14] = {type: 4, index: 392};// RNM(HEXDIG)

    // byteValue
    this.rules[255].opcodes = [];
    this.rules[255].opcodes[0] = {type: 3, min: 1, max: 3};// REP
    this.rules[255].opcodes[1] = {type: 4, index: 391};// RNM(DIGIT)

    // sbyteValue
    this.rules[256].opcodes = [];
    this.rules[256].opcodes[0] = {type: 2, children: [1,3]};// CAT
    this.rules[256].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[256].opcodes[2] = {type: 4, index: 347};// RNM(SIGN)
    this.rules[256].opcodes[3] = {type: 3, min: 1, max: 3};// REP
    this.rules[256].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)

    // int16Value
    this.rules[257].opcodes = [];
    this.rules[257].opcodes[0] = {type: 2, children: [1,3]};// CAT
    this.rules[257].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[257].opcodes[2] = {type: 4, index: 347};// RNM(SIGN)
    this.rules[257].opcodes[3] = {type: 3, min: 1, max: 5};// REP
    this.rules[257].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)

    // int32Value
    this.rules[258].opcodes = [];
    this.rules[258].opcodes[0] = {type: 2, children: [1,3]};// CAT
    this.rules[258].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[258].opcodes[2] = {type: 4, index: 347};// RNM(SIGN)
    this.rules[258].opcodes[3] = {type: 3, min: 1, max: 10};// REP
    this.rules[258].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)

    // int64Value
    this.rules[259].opcodes = [];
    this.rules[259].opcodes[0] = {type: 2, children: [1,3]};// CAT
    this.rules[259].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[259].opcodes[2] = {type: 4, index: 347};// RNM(SIGN)
    this.rules[259].opcodes[3] = {type: 3, min: 1, max: 19};// REP
    this.rules[259].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)

    // string
    this.rules[260].opcodes = [];
    this.rules[260].opcodes[0] = {type: 2, children: [1,2,6]};// CAT
    this.rules[260].opcodes[1] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[260].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[260].opcodes[3] = {type: 1, children: [4,5]};// ALT
    this.rules[260].opcodes[4] = {type: 4, index: 261};// RNM(SQUOTE-in-string)
    this.rules[260].opcodes[5] = {type: 4, index: 380};// RNM(pchar-no-SQUOTE)
    this.rules[260].opcodes[6] = {type: 4, index: 350};// RNM(SQUOTE)

    // SQUOTE-in-string
    this.rules[261].opcodes = [];
    this.rules[261].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[261].opcodes[1] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[261].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)

    // dateValue
    this.rules[262].opcodes = [];
    this.rules[262].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[262].opcodes[1] = {type: 4, index: 269};// RNM(year)
    this.rules[262].opcodes[2] = {type: 9, string: [45]};// TLS
    this.rules[262].opcodes[3] = {type: 4, index: 270};// RNM(month)
    this.rules[262].opcodes[4] = {type: 9, string: [45]};// TLS
    this.rules[262].opcodes[5] = {type: 4, index: 271};// RNM(day)

    // dateTimeOffsetValue
    this.rules[263].opcodes = [];
    this.rules[263].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9,10,18]};// CAT
    this.rules[263].opcodes[1] = {type: 4, index: 269};// RNM(year)
    this.rules[263].opcodes[2] = {type: 9, string: [45]};// TLS
    this.rules[263].opcodes[3] = {type: 4, index: 270};// RNM(month)
    this.rules[263].opcodes[4] = {type: 9, string: [45]};// TLS
    this.rules[263].opcodes[5] = {type: 4, index: 271};// RNM(day)
    this.rules[263].opcodes[6] = {type: 9, string: [116]};// TLS
    this.rules[263].opcodes[7] = {type: 4, index: 272};// RNM(hour)
    this.rules[263].opcodes[8] = {type: 9, string: [58]};// TLS
    this.rules[263].opcodes[9] = {type: 4, index: 273};// RNM(minute)
    this.rules[263].opcodes[10] = {type: 3, min: 0, max: 1};// REP
    this.rules[263].opcodes[11] = {type: 2, children: [12,13,14]};// CAT
    this.rules[263].opcodes[12] = {type: 9, string: [58]};// TLS
    this.rules[263].opcodes[13] = {type: 4, index: 274};// RNM(second)
    this.rules[263].opcodes[14] = {type: 3, min: 0, max: 1};// REP
    this.rules[263].opcodes[15] = {type: 2, children: [16,17]};// CAT
    this.rules[263].opcodes[16] = {type: 9, string: [46]};// TLS
    this.rules[263].opcodes[17] = {type: 4, index: 275};// RNM(fractionalSeconds)
    this.rules[263].opcodes[18] = {type: 1, children: [19,20]};// ALT
    this.rules[263].opcodes[19] = {type: 9, string: [122]};// TLS
    this.rules[263].opcodes[20] = {type: 2, children: [21,22,23,24]};// CAT
    this.rules[263].opcodes[21] = {type: 4, index: 347};// RNM(SIGN)
    this.rules[263].opcodes[22] = {type: 4, index: 272};// RNM(hour)
    this.rules[263].opcodes[23] = {type: 9, string: [58]};// TLS
    this.rules[263].opcodes[24] = {type: 4, index: 273};// RNM(minute)

    // duration
    this.rules[264].opcodes = [];
    this.rules[264].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[264].opcodes[1] = {type: 9, string: [100,117,114,97,116,105,111,110]};// TLS
    this.rules[264].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[264].opcodes[3] = {type: 4, index: 265};// RNM(durationValue)
    this.rules[264].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // durationValue
    this.rules[265].opcodes = [];
    this.rules[265].opcodes[0] = {type: 2, children: [1,3,4,9]};// CAT
    this.rules[265].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[265].opcodes[2] = {type: 4, index: 347};// RNM(SIGN)
    this.rules[265].opcodes[3] = {type: 9, string: [112]};// TLS
    this.rules[265].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[265].opcodes[5] = {type: 2, children: [6,8]};// CAT
    this.rules[265].opcodes[6] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[265].opcodes[7] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[265].opcodes[8] = {type: 9, string: [100]};// TLS
    this.rules[265].opcodes[9] = {type: 3, min: 0, max: 1};// REP
    this.rules[265].opcodes[10] = {type: 2, children: [11,12,17,22]};// CAT
    this.rules[265].opcodes[11] = {type: 9, string: [116]};// TLS
    this.rules[265].opcodes[12] = {type: 3, min: 0, max: 1};// REP
    this.rules[265].opcodes[13] = {type: 2, children: [14,16]};// CAT
    this.rules[265].opcodes[14] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[265].opcodes[15] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[265].opcodes[16] = {type: 9, string: [104]};// TLS
    this.rules[265].opcodes[17] = {type: 3, min: 0, max: 1};// REP
    this.rules[265].opcodes[18] = {type: 2, children: [19,21]};// CAT
    this.rules[265].opcodes[19] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[265].opcodes[20] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[265].opcodes[21] = {type: 9, string: [109]};// TLS
    this.rules[265].opcodes[22] = {type: 3, min: 0, max: 1};// REP
    this.rules[265].opcodes[23] = {type: 2, children: [24,26,31]};// CAT
    this.rules[265].opcodes[24] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[265].opcodes[25] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[265].opcodes[26] = {type: 3, min: 0, max: 1};// REP
    this.rules[265].opcodes[27] = {type: 2, children: [28,29]};// CAT
    this.rules[265].opcodes[28] = {type: 9, string: [46]};// TLS
    this.rules[265].opcodes[29] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[265].opcodes[30] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[265].opcodes[31] = {type: 9, string: [115]};// TLS

    // timeOfDayValue
    this.rules[266].opcodes = [];
    this.rules[266].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[266].opcodes[1] = {type: 4, index: 272};// RNM(hour)
    this.rules[266].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[266].opcodes[3] = {type: 4, index: 273};// RNM(minute)
    this.rules[266].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[266].opcodes[5] = {type: 2, children: [6,7,8]};// CAT
    this.rules[266].opcodes[6] = {type: 9, string: [58]};// TLS
    this.rules[266].opcodes[7] = {type: 4, index: 274};// RNM(second)
    this.rules[266].opcodes[8] = {type: 3, min: 0, max: 1};// REP
    this.rules[266].opcodes[9] = {type: 2, children: [10,11]};// CAT
    this.rules[266].opcodes[10] = {type: 9, string: [46]};// TLS
    this.rules[266].opcodes[11] = {type: 4, index: 275};// RNM(fractionalSeconds)

    // oneToNine
    this.rules[267].opcodes = [];
    this.rules[267].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9]};// ALT
    this.rules[267].opcodes[1] = {type: 9, string: [49]};// TLS
    this.rules[267].opcodes[2] = {type: 9, string: [50]};// TLS
    this.rules[267].opcodes[3] = {type: 9, string: [51]};// TLS
    this.rules[267].opcodes[4] = {type: 9, string: [52]};// TLS
    this.rules[267].opcodes[5] = {type: 9, string: [53]};// TLS
    this.rules[267].opcodes[6] = {type: 9, string: [54]};// TLS
    this.rules[267].opcodes[7] = {type: 9, string: [55]};// TLS
    this.rules[267].opcodes[8] = {type: 9, string: [56]};// TLS
    this.rules[267].opcodes[9] = {type: 9, string: [57]};// TLS

    // zeroToFiftyNine
    this.rules[268].opcodes = [];
    this.rules[268].opcodes[0] = {type: 2, children: [1,8]};// CAT
    this.rules[268].opcodes[1] = {type: 1, children: [2,3,4,5,6,7]};// ALT
    this.rules[268].opcodes[2] = {type: 9, string: [48]};// TLS
    this.rules[268].opcodes[3] = {type: 9, string: [49]};// TLS
    this.rules[268].opcodes[4] = {type: 9, string: [50]};// TLS
    this.rules[268].opcodes[5] = {type: 9, string: [51]};// TLS
    this.rules[268].opcodes[6] = {type: 9, string: [52]};// TLS
    this.rules[268].opcodes[7] = {type: 9, string: [53]};// TLS
    this.rules[268].opcodes[8] = {type: 4, index: 391};// RNM(DIGIT)

    // year
    this.rules[269].opcodes = [];
    this.rules[269].opcodes[0] = {type: 2, children: [1,3]};// CAT
    this.rules[269].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[269].opcodes[2] = {type: 9, string: [45]};// TLS
    this.rules[269].opcodes[3] = {type: 1, children: [4,8]};// ALT
    this.rules[269].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[269].opcodes[5] = {type: 9, string: [48]};// TLS
    this.rules[269].opcodes[6] = {type: 3, min: 3, max: 3};// REP
    this.rules[269].opcodes[7] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[269].opcodes[8] = {type: 2, children: [9,10]};// CAT
    this.rules[269].opcodes[9] = {type: 4, index: 267};// RNM(oneToNine)
    this.rules[269].opcodes[10] = {type: 3, min: 3, max: Infinity};// REP
    this.rules[269].opcodes[11] = {type: 4, index: 391};// RNM(DIGIT)

    // month
    this.rules[270].opcodes = [];
    this.rules[270].opcodes[0] = {type: 1, children: [1,4]};// ALT
    this.rules[270].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[270].opcodes[2] = {type: 9, string: [48]};// TLS
    this.rules[270].opcodes[3] = {type: 4, index: 267};// RNM(oneToNine)
    this.rules[270].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[270].opcodes[5] = {type: 9, string: [49]};// TLS
    this.rules[270].opcodes[6] = {type: 1, children: [7,8,9]};// ALT
    this.rules[270].opcodes[7] = {type: 9, string: [48]};// TLS
    this.rules[270].opcodes[8] = {type: 9, string: [49]};// TLS
    this.rules[270].opcodes[9] = {type: 9, string: [50]};// TLS

    // day
    this.rules[271].opcodes = [];
    this.rules[271].opcodes[0] = {type: 1, children: [1,4,9]};// ALT
    this.rules[271].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[271].opcodes[2] = {type: 9, string: [48]};// TLS
    this.rules[271].opcodes[3] = {type: 4, index: 267};// RNM(oneToNine)
    this.rules[271].opcodes[4] = {type: 2, children: [5,8]};// CAT
    this.rules[271].opcodes[5] = {type: 1, children: [6,7]};// ALT
    this.rules[271].opcodes[6] = {type: 9, string: [49]};// TLS
    this.rules[271].opcodes[7] = {type: 9, string: [50]};// TLS
    this.rules[271].opcodes[8] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[271].opcodes[9] = {type: 2, children: [10,11]};// CAT
    this.rules[271].opcodes[10] = {type: 9, string: [51]};// TLS
    this.rules[271].opcodes[11] = {type: 1, children: [12,13]};// ALT
    this.rules[271].opcodes[12] = {type: 9, string: [48]};// TLS
    this.rules[271].opcodes[13] = {type: 9, string: [49]};// TLS

    // hour
    this.rules[272].opcodes = [];
    this.rules[272].opcodes[0] = {type: 1, children: [1,6]};// ALT
    this.rules[272].opcodes[1] = {type: 2, children: [2,5]};// CAT
    this.rules[272].opcodes[2] = {type: 1, children: [3,4]};// ALT
    this.rules[272].opcodes[3] = {type: 9, string: [48]};// TLS
    this.rules[272].opcodes[4] = {type: 9, string: [49]};// TLS
    this.rules[272].opcodes[5] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[272].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[272].opcodes[7] = {type: 9, string: [50]};// TLS
    this.rules[272].opcodes[8] = {type: 1, children: [9,10,11,12]};// ALT
    this.rules[272].opcodes[9] = {type: 9, string: [48]};// TLS
    this.rules[272].opcodes[10] = {type: 9, string: [49]};// TLS
    this.rules[272].opcodes[11] = {type: 9, string: [50]};// TLS
    this.rules[272].opcodes[12] = {type: 9, string: [51]};// TLS

    // minute
    this.rules[273].opcodes = [];
    this.rules[273].opcodes[0] = {type: 4, index: 268};// RNM(zeroToFiftyNine)

    // second
    this.rules[274].opcodes = [];
    this.rules[274].opcodes[0] = {type: 4, index: 268};// RNM(zeroToFiftyNine)

    // fractionalSeconds
    this.rules[275].opcodes = [];
    this.rules[275].opcodes[0] = {type: 3, min: 1, max: 12};// REP
    this.rules[275].opcodes[1] = {type: 4, index: 391};// RNM(DIGIT)

    // enum
    this.rules[276].opcodes = [];
    this.rules[276].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[276].opcodes[1] = {type: 4, index: 199};// RNM(qualifiedEnumTypeName)
    this.rules[276].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[276].opcodes[3] = {type: 4, index: 277};// RNM(enumValue)
    this.rules[276].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // enumValue
    this.rules[277].opcodes = [];
    this.rules[277].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[277].opcodes[1] = {type: 4, index: 278};// RNM(singleEnumValue)
    this.rules[277].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[277].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[277].opcodes[4] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[277].opcodes[5] = {type: 4, index: 278};// RNM(singleEnumValue)

    // singleEnumValue
    this.rules[278].opcodes = [];
    this.rules[278].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[278].opcodes[1] = {type: 4, index: 208};// RNM(enumerationMember)
    this.rules[278].opcodes[2] = {type: 4, index: 279};// RNM(enumMemberValue)

    // enumMemberValue
    this.rules[279].opcodes = [];
    this.rules[279].opcodes[0] = {type: 4, index: 259};// RNM(int64Value)

    // geographyCollection
    this.rules[280].opcodes = [];
    this.rules[280].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[280].opcodes[1] = {type: 4, index: 315};// RNM(geographyPrefix)
    this.rules[280].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[280].opcodes[3] = {type: 4, index: 281};// RNM(fullCollectionLiteral)
    this.rules[280].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // fullCollectionLiteral
    this.rules[281].opcodes = [];
    this.rules[281].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[281].opcodes[1] = {type: 4, index: 299};// RNM(sridLiteral)
    this.rules[281].opcodes[2] = {type: 4, index: 282};// RNM(collectionLiteral)

    // collectionLiteral
    this.rules[282].opcodes = [];
    this.rules[282].opcodes[0] = {type: 2, children: [1,2,3,7]};// CAT
    this.rules[282].opcodes[1] = {type: 9, string: [99,111,108,108,101,99,116,105,111,110,40]};// TLS
    this.rules[282].opcodes[2] = {type: 4, index: 283};// RNM(geoLiteral)
    this.rules[282].opcodes[3] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[282].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[282].opcodes[5] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[282].opcodes[6] = {type: 4, index: 283};// RNM(geoLiteral)
    this.rules[282].opcodes[7] = {type: 4, index: 352};// RNM(CLOSE)

    // geoLiteral
    this.rules[283].opcodes = [];
    this.rules[283].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7]};// ALT
    this.rules[283].opcodes[1] = {type: 4, index: 282};// RNM(collectionLiteral)
    this.rules[283].opcodes[2] = {type: 4, index: 286};// RNM(lineStringLiteral)
    this.rules[283].opcodes[3] = {type: 4, index: 293};// RNM(multiPointLiteral)
    this.rules[283].opcodes[4] = {type: 4, index: 290};// RNM(multiLineStringLiteral)
    this.rules[283].opcodes[5] = {type: 4, index: 296};// RNM(multiPolygonLiteral)
    this.rules[283].opcodes[6] = {type: 4, index: 300};// RNM(pointLiteral)
    this.rules[283].opcodes[7] = {type: 4, index: 305};// RNM(polygonLiteral)

    // geographyLineString
    this.rules[284].opcodes = [];
    this.rules[284].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[284].opcodes[1] = {type: 4, index: 315};// RNM(geographyPrefix)
    this.rules[284].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[284].opcodes[3] = {type: 4, index: 285};// RNM(fullLineStringLiteral)
    this.rules[284].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // fullLineStringLiteral
    this.rules[285].opcodes = [];
    this.rules[285].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[285].opcodes[1] = {type: 4, index: 299};// RNM(sridLiteral)
    this.rules[285].opcodes[2] = {type: 4, index: 286};// RNM(lineStringLiteral)

    // lineStringLiteral
    this.rules[286].opcodes = [];
    this.rules[286].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[286].opcodes[1] = {type: 9, string: [108,105,110,101,115,116,114,105,110,103]};// TLS
    this.rules[286].opcodes[2] = {type: 4, index: 287};// RNM(lineStringData)

    // lineStringData
    this.rules[287].opcodes = [];
    this.rules[287].opcodes[0] = {type: 2, children: [1,2,3,7]};// CAT
    this.rules[287].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[287].opcodes[2] = {type: 4, index: 302};// RNM(positionLiteral)
    this.rules[287].opcodes[3] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[287].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[287].opcodes[5] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[287].opcodes[6] = {type: 4, index: 302};// RNM(positionLiteral)
    this.rules[287].opcodes[7] = {type: 4, index: 352};// RNM(CLOSE)

    // geographyMultiLineString
    this.rules[288].opcodes = [];
    this.rules[288].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[288].opcodes[1] = {type: 4, index: 315};// RNM(geographyPrefix)
    this.rules[288].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[288].opcodes[3] = {type: 4, index: 289};// RNM(fullMultiLineStringLiteral)
    this.rules[288].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // fullMultiLineStringLiteral
    this.rules[289].opcodes = [];
    this.rules[289].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[289].opcodes[1] = {type: 4, index: 299};// RNM(sridLiteral)
    this.rules[289].opcodes[2] = {type: 4, index: 290};// RNM(multiLineStringLiteral)

    // multiLineStringLiteral
    this.rules[290].opcodes = [];
    this.rules[290].opcodes[0] = {type: 2, children: [1,2,9]};// CAT
    this.rules[290].opcodes[1] = {type: 9, string: [109,117,108,116,105,108,105,110,101,115,116,114,105,110,103,40]};// TLS
    this.rules[290].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[290].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[290].opcodes[4] = {type: 4, index: 287};// RNM(lineStringData)
    this.rules[290].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[290].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[290].opcodes[7] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[290].opcodes[8] = {type: 4, index: 287};// RNM(lineStringData)
    this.rules[290].opcodes[9] = {type: 4, index: 352};// RNM(CLOSE)

    // geographyMultiPoint
    this.rules[291].opcodes = [];
    this.rules[291].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[291].opcodes[1] = {type: 4, index: 315};// RNM(geographyPrefix)
    this.rules[291].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[291].opcodes[3] = {type: 4, index: 292};// RNM(fullMultiPointLiteral)
    this.rules[291].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // fullMultiPointLiteral
    this.rules[292].opcodes = [];
    this.rules[292].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[292].opcodes[1] = {type: 4, index: 299};// RNM(sridLiteral)
    this.rules[292].opcodes[2] = {type: 4, index: 293};// RNM(multiPointLiteral)

    // multiPointLiteral
    this.rules[293].opcodes = [];
    this.rules[293].opcodes[0] = {type: 2, children: [1,2,9]};// CAT
    this.rules[293].opcodes[1] = {type: 9, string: [109,117,108,116,105,112,111,105,110,116,40]};// TLS
    this.rules[293].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[293].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[293].opcodes[4] = {type: 4, index: 301};// RNM(pointData)
    this.rules[293].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[293].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[293].opcodes[7] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[293].opcodes[8] = {type: 4, index: 301};// RNM(pointData)
    this.rules[293].opcodes[9] = {type: 4, index: 352};// RNM(CLOSE)

    // geographyMultiPolygon
    this.rules[294].opcodes = [];
    this.rules[294].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[294].opcodes[1] = {type: 4, index: 315};// RNM(geographyPrefix)
    this.rules[294].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[294].opcodes[3] = {type: 4, index: 295};// RNM(fullMultiPolygonLiteral)
    this.rules[294].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // fullMultiPolygonLiteral
    this.rules[295].opcodes = [];
    this.rules[295].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[295].opcodes[1] = {type: 4, index: 299};// RNM(sridLiteral)
    this.rules[295].opcodes[2] = {type: 4, index: 296};// RNM(multiPolygonLiteral)

    // multiPolygonLiteral
    this.rules[296].opcodes = [];
    this.rules[296].opcodes[0] = {type: 2, children: [1,2,9]};// CAT
    this.rules[296].opcodes[1] = {type: 9, string: [109,117,108,116,105,112,111,108,121,103,111,110,40]};// TLS
    this.rules[296].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[296].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[296].opcodes[4] = {type: 4, index: 306};// RNM(polygonData)
    this.rules[296].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[296].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[296].opcodes[7] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[296].opcodes[8] = {type: 4, index: 306};// RNM(polygonData)
    this.rules[296].opcodes[9] = {type: 4, index: 352};// RNM(CLOSE)

    // geographyPoint
    this.rules[297].opcodes = [];
    this.rules[297].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[297].opcodes[1] = {type: 4, index: 315};// RNM(geographyPrefix)
    this.rules[297].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[297].opcodes[3] = {type: 4, index: 298};// RNM(fullPointLiteral)
    this.rules[297].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // fullPointLiteral
    this.rules[298].opcodes = [];
    this.rules[298].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[298].opcodes[1] = {type: 4, index: 299};// RNM(sridLiteral)
    this.rules[298].opcodes[2] = {type: 4, index: 300};// RNM(pointLiteral)

    // sridLiteral
    this.rules[299].opcodes = [];
    this.rules[299].opcodes[0] = {type: 2, children: [1,2,3,5]};// CAT
    this.rules[299].opcodes[1] = {type: 9, string: [115,114,105,100]};// TLS
    this.rules[299].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[299].opcodes[3] = {type: 3, min: 1, max: 5};// REP
    this.rules[299].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[299].opcodes[5] = {type: 4, index: 348};// RNM(SEMI)

    // pointLiteral
    this.rules[300].opcodes = [];
    this.rules[300].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[300].opcodes[1] = {type: 9, string: [112,111,105,110,116]};// TLS
    this.rules[300].opcodes[2] = {type: 4, index: 301};// RNM(pointData)

    // pointData
    this.rules[301].opcodes = [];
    this.rules[301].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[301].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[301].opcodes[2] = {type: 4, index: 302};// RNM(positionLiteral)
    this.rules[301].opcodes[3] = {type: 4, index: 352};// RNM(CLOSE)

    // positionLiteral
    this.rules[302].opcodes = [];
    this.rules[302].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[302].opcodes[1] = {type: 4, index: 251};// RNM(doubleValue)
    this.rules[302].opcodes[2] = {type: 4, index: 395};// RNM(SP)
    this.rules[302].opcodes[3] = {type: 4, index: 251};// RNM(doubleValue)

    // geographyPolygon
    this.rules[303].opcodes = [];
    this.rules[303].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[303].opcodes[1] = {type: 4, index: 315};// RNM(geographyPrefix)
    this.rules[303].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[303].opcodes[3] = {type: 4, index: 304};// RNM(fullPolygonLiteral)
    this.rules[303].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // fullPolygonLiteral
    this.rules[304].opcodes = [];
    this.rules[304].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[304].opcodes[1] = {type: 4, index: 299};// RNM(sridLiteral)
    this.rules[304].opcodes[2] = {type: 4, index: 305};// RNM(polygonLiteral)

    // polygonLiteral
    this.rules[305].opcodes = [];
    this.rules[305].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[305].opcodes[1] = {type: 9, string: [112,111,108,121,103,111,110]};// TLS
    this.rules[305].opcodes[2] = {type: 4, index: 306};// RNM(polygonData)

    // polygonData
    this.rules[306].opcodes = [];
    this.rules[306].opcodes[0] = {type: 2, children: [1,2,3,7]};// CAT
    this.rules[306].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[306].opcodes[2] = {type: 4, index: 307};// RNM(ringLiteral)
    this.rules[306].opcodes[3] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[306].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[306].opcodes[5] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[306].opcodes[6] = {type: 4, index: 307};// RNM(ringLiteral)
    this.rules[306].opcodes[7] = {type: 4, index: 352};// RNM(CLOSE)

    // ringLiteral
    this.rules[307].opcodes = [];
    this.rules[307].opcodes[0] = {type: 2, children: [1,2,3,7]};// CAT
    this.rules[307].opcodes[1] = {type: 4, index: 351};// RNM(OPEN)
    this.rules[307].opcodes[2] = {type: 4, index: 302};// RNM(positionLiteral)
    this.rules[307].opcodes[3] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[307].opcodes[4] = {type: 2, children: [5,6]};// CAT
    this.rules[307].opcodes[5] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[307].opcodes[6] = {type: 4, index: 302};// RNM(positionLiteral)
    this.rules[307].opcodes[7] = {type: 4, index: 352};// RNM(CLOSE)

    // geometryCollection
    this.rules[308].opcodes = [];
    this.rules[308].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[308].opcodes[1] = {type: 4, index: 316};// RNM(geometryPrefix)
    this.rules[308].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[308].opcodes[3] = {type: 4, index: 281};// RNM(fullCollectionLiteral)
    this.rules[308].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // geometryLineString
    this.rules[309].opcodes = [];
    this.rules[309].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[309].opcodes[1] = {type: 4, index: 316};// RNM(geometryPrefix)
    this.rules[309].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[309].opcodes[3] = {type: 4, index: 285};// RNM(fullLineStringLiteral)
    this.rules[309].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // geometryMultiLineString
    this.rules[310].opcodes = [];
    this.rules[310].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[310].opcodes[1] = {type: 4, index: 316};// RNM(geometryPrefix)
    this.rules[310].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[310].opcodes[3] = {type: 4, index: 289};// RNM(fullMultiLineStringLiteral)
    this.rules[310].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // geometryMultiPoint
    this.rules[311].opcodes = [];
    this.rules[311].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[311].opcodes[1] = {type: 4, index: 316};// RNM(geometryPrefix)
    this.rules[311].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[311].opcodes[3] = {type: 4, index: 292};// RNM(fullMultiPointLiteral)
    this.rules[311].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // geometryMultiPolygon
    this.rules[312].opcodes = [];
    this.rules[312].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[312].opcodes[1] = {type: 4, index: 316};// RNM(geometryPrefix)
    this.rules[312].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[312].opcodes[3] = {type: 4, index: 295};// RNM(fullMultiPolygonLiteral)
    this.rules[312].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // geometryPoint
    this.rules[313].opcodes = [];
    this.rules[313].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[313].opcodes[1] = {type: 4, index: 316};// RNM(geometryPrefix)
    this.rules[313].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[313].opcodes[3] = {type: 4, index: 298};// RNM(fullPointLiteral)
    this.rules[313].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // geometryPolygon
    this.rules[314].opcodes = [];
    this.rules[314].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[314].opcodes[1] = {type: 4, index: 316};// RNM(geometryPrefix)
    this.rules[314].opcodes[2] = {type: 4, index: 350};// RNM(SQUOTE)
    this.rules[314].opcodes[3] = {type: 4, index: 304};// RNM(fullPolygonLiteral)
    this.rules[314].opcodes[4] = {type: 4, index: 350};// RNM(SQUOTE)

    // geographyPrefix
    this.rules[315].opcodes = [];
    this.rules[315].opcodes[0] = {type: 9, string: [103,101,111,103,114,97,112,104,121]};// TLS

    // geometryPrefix
    this.rules[316].opcodes = [];
    this.rules[316].opcodes[0] = {type: 9, string: [103,101,111,109,101,116,114,121]};// TLS

    // header
    this.rules[317].opcodes = [];
    this.rules[317].opcodes[0] = {type: 1, children: [1,2,3,4,5,6]};// ALT
    this.rules[317].opcodes[1] = {type: 4, index: 318};// RNM(content-id)
    this.rules[317].opcodes[2] = {type: 4, index: 319};// RNM(odata-entityid)
    this.rules[317].opcodes[3] = {type: 4, index: 320};// RNM(odata-isolation)
    this.rules[317].opcodes[4] = {type: 4, index: 321};// RNM(odata-maxversion)
    this.rules[317].opcodes[5] = {type: 4, index: 322};// RNM(odata-version)
    this.rules[317].opcodes[6] = {type: 4, index: 323};// RNM(prefer)

    // content-id
    this.rules[318].opcodes = [];
    this.rules[318].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[318].opcodes[1] = {type: 9, string: [99,111,110,116,101,110,116,45,105,100]};// TLS
    this.rules[318].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[318].opcodes[3] = {type: 4, index: 338};// RNM(OWS)
    this.rules[318].opcodes[4] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[318].opcodes[5] = {type: 4, index: 377};// RNM(unreserved)

    // odata-entityid
    this.rules[319].opcodes = [];
    this.rules[319].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[319].opcodes[1] = {type: 9, string: [111,100,97,116,97,45,101,110,116,105,116,121,105,100]};// TLS
    this.rules[319].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[319].opcodes[3] = {type: 4, index: 338};// RNM(OWS)
    this.rules[319].opcodes[4] = {type: 4, index: 388};// RNM(IRI-in-header)

    // odata-isolation
    this.rules[320].opcodes = [];
    this.rules[320].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[320].opcodes[1] = {type: 9, string: [111,100,97,116,97,45,105,115,111,108,97,116,105,111,110]};// TLS
    this.rules[320].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[320].opcodes[3] = {type: 4, index: 338};// RNM(OWS)
    this.rules[320].opcodes[4] = {type: 9, string: [115,110,97,112,115,104,111,116]};// TLS

    // odata-maxversion
    this.rules[321].opcodes = [];
    this.rules[321].opcodes[0] = {type: 2, children: [1,2,3,4,6,7]};// CAT
    this.rules[321].opcodes[1] = {type: 9, string: [111,100,97,116,97,45,109,97,120,118,101,114,115,105,111,110]};// TLS
    this.rules[321].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[321].opcodes[3] = {type: 4, index: 338};// RNM(OWS)
    this.rules[321].opcodes[4] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[321].opcodes[5] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[321].opcodes[6] = {type: 9, string: [46]};// TLS
    this.rules[321].opcodes[7] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[321].opcodes[8] = {type: 4, index: 391};// RNM(DIGIT)

    // odata-version
    this.rules[322].opcodes = [];
    this.rules[322].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[322].opcodes[1] = {type: 9, string: [111,100,97,116,97,45,118,101,114,115,105,111,110]};// TLS
    this.rules[322].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[322].opcodes[3] = {type: 4, index: 338};// RNM(OWS)
    this.rules[322].opcodes[4] = {type: 9, string: [52,46,48]};// TLS

    // prefer
    this.rules[323].opcodes = [];
    this.rules[323].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[323].opcodes[1] = {type: 9, string: [112,114,101,102,101,114]};// TLS
    this.rules[323].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[323].opcodes[3] = {type: 4, index: 338};// RNM(OWS)
    this.rules[323].opcodes[4] = {type: 4, index: 324};// RNM(preference)
    this.rules[323].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[323].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[323].opcodes[7] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[323].opcodes[8] = {type: 4, index: 324};// RNM(preference)

    // preference
    this.rules[324].opcodes = [];
    this.rules[324].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9]};// ALT
    this.rules[324].opcodes[1] = {type: 4, index: 325};// RNM(allowEntityReferencesPreference)
    this.rules[324].opcodes[2] = {type: 4, index: 326};// RNM(callbackPreference)
    this.rules[324].opcodes[3] = {type: 4, index: 327};// RNM(continueOnErrorPreference)
    this.rules[324].opcodes[4] = {type: 4, index: 328};// RNM(includeAnnotationsPreference)
    this.rules[324].opcodes[5] = {type: 4, index: 332};// RNM(maxpagesizePreference)
    this.rules[324].opcodes[6] = {type: 4, index: 333};// RNM(respondAsyncPreference)
    this.rules[324].opcodes[7] = {type: 4, index: 334};// RNM(returnPreference)
    this.rules[324].opcodes[8] = {type: 4, index: 335};// RNM(trackChangesPreference)
    this.rules[324].opcodes[9] = {type: 4, index: 336};// RNM(waitPreference)

    // allowEntityReferencesPreference
    this.rules[325].opcodes = [];
    this.rules[325].opcodes[0] = {type: 9, string: [111,100,97,116,97,46,97,108,108,111,119,45,101,110,116,105,116,121,114,101,102,101,114,101,110,99,101,115]};// TLS

    // callbackPreference
    this.rules[326].opcodes = [];
    this.rules[326].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7,8,9]};// CAT
    this.rules[326].opcodes[1] = {type: 9, string: [111,100,97,116,97,46,99,97,108,108,98,97,99,107]};// TLS
    this.rules[326].opcodes[2] = {type: 4, index: 338};// RNM(OWS)
    this.rules[326].opcodes[3] = {type: 9, string: [59]};// TLS
    this.rules[326].opcodes[4] = {type: 4, index: 338};// RNM(OWS)
    this.rules[326].opcodes[5] = {type: 9, string: [117,114,108]};// TLS
    this.rules[326].opcodes[6] = {type: 4, index: 340};// RNM(EQ-h)
    this.rules[326].opcodes[7] = {type: 4, index: 394};// RNM(DQUOTE)
    this.rules[326].opcodes[8] = {type: 4, index: 353};// RNM(URI)
    this.rules[326].opcodes[9] = {type: 4, index: 394};// RNM(DQUOTE)

    // continueOnErrorPreference
    this.rules[327].opcodes = [];
    this.rules[327].opcodes[0] = {type: 9, string: [111,100,97,116,97,46,99,111,110,116,105,110,117,101,45,111,110,45,101,114,114,111,114]};// TLS

    // includeAnnotationsPreference
    this.rules[328].opcodes = [];
    this.rules[328].opcodes[0] = {type: 2, children: [1,2,3,4,5]};// CAT
    this.rules[328].opcodes[1] = {type: 9, string: [111,100,97,116,97,46,105,110,99,108,117,100,101,45,97,110,110,111,116,97,116,105,111,110,115]};// TLS
    this.rules[328].opcodes[2] = {type: 4, index: 340};// RNM(EQ-h)
    this.rules[328].opcodes[3] = {type: 4, index: 394};// RNM(DQUOTE)
    this.rules[328].opcodes[4] = {type: 4, index: 329};// RNM(annotationsList)
    this.rules[328].opcodes[5] = {type: 4, index: 394};// RNM(DQUOTE)

    // annotationsList
    this.rules[329].opcodes = [];
    this.rules[329].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[329].opcodes[1] = {type: 4, index: 330};// RNM(annotationIdentifier)
    this.rules[329].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[329].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[329].opcodes[4] = {type: 4, index: 345};// RNM(COMMA)
    this.rules[329].opcodes[5] = {type: 4, index: 330};// RNM(annotationIdentifier)

    // annotationIdentifier
    this.rules[330].opcodes = [];
    this.rules[330].opcodes[0] = {type: 2, children: [1,3]};// CAT
    this.rules[330].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[330].opcodes[2] = {type: 4, index: 331};// RNM(excludeOperator)
    this.rules[330].opcodes[3] = {type: 1, children: [4,5]};// ALT
    this.rules[330].opcodes[4] = {type: 4, index: 349};// RNM(STAR)
    this.rules[330].opcodes[5] = {type: 2, children: [6,7,8]};// CAT
    this.rules[330].opcodes[6] = {type: 4, index: 200};// RNM(namespace)
    this.rules[330].opcodes[7] = {type: 9, string: [46]};// TLS
    this.rules[330].opcodes[8] = {type: 1, children: [9,10]};// ALT
    this.rules[330].opcodes[9] = {type: 4, index: 209};// RNM(termName)
    this.rules[330].opcodes[10] = {type: 4, index: 349};// RNM(STAR)

    // excludeOperator
    this.rules[331].opcodes = [];
    this.rules[331].opcodes[0] = {type: 9, string: [45]};// TLS

    // maxpagesizePreference
    this.rules[332].opcodes = [];
    this.rules[332].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[332].opcodes[1] = {type: 9, string: [111,100,97,116,97,46,109,97,120,112,97,103,101,115,105,122,101]};// TLS
    this.rules[332].opcodes[2] = {type: 4, index: 340};// RNM(EQ-h)
    this.rules[332].opcodes[3] = {type: 4, index: 267};// RNM(oneToNine)
    this.rules[332].opcodes[4] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[332].opcodes[5] = {type: 4, index: 391};// RNM(DIGIT)

    // respondAsyncPreference
    this.rules[333].opcodes = [];
    this.rules[333].opcodes[0] = {type: 9, string: [114,101,115,112,111,110,100,45,97,115,121,110,99]};// TLS

    // returnPreference
    this.rules[334].opcodes = [];
    this.rules[334].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[334].opcodes[1] = {type: 9, string: [114,101,116,117,114,110]};// TLS
    this.rules[334].opcodes[2] = {type: 4, index: 340};// RNM(EQ-h)
    this.rules[334].opcodes[3] = {type: 1, children: [4,5]};// ALT
    this.rules[334].opcodes[4] = {type: 10, string: [114,101,112,114,101,115,101,110,116,97,116,105,111,110]};// TBS
    this.rules[334].opcodes[5] = {type: 10, string: [109,105,110,105,109,97,108]};// TBS

    // trackChangesPreference
    this.rules[335].opcodes = [];
    this.rules[335].opcodes[0] = {type: 9, string: [111,100,97,116,97,46,116,114,97,99,107,45,99,104,97,110,103,101,115]};// TLS

    // waitPreference
    this.rules[336].opcodes = [];
    this.rules[336].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[336].opcodes[1] = {type: 9, string: [119,97,105,116]};// TLS
    this.rules[336].opcodes[2] = {type: 4, index: 340};// RNM(EQ-h)
    this.rules[336].opcodes[3] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[336].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)

    // obs-text
    this.rules[337].opcodes = [];
    this.rules[337].opcodes[0] = {type: 8, min: 128, max: 255};// TRG

    // OWS
    this.rules[338].opcodes = [];
    this.rules[338].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[338].opcodes[1] = {type: 1, children: [2,3]};// ALT
    this.rules[338].opcodes[2] = {type: 4, index: 395};// RNM(SP)
    this.rules[338].opcodes[3] = {type: 4, index: 396};// RNM(HTAB)

    // BWS-h
    this.rules[339].opcodes = [];
    this.rules[339].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[339].opcodes[1] = {type: 1, children: [2,3]};// ALT
    this.rules[339].opcodes[2] = {type: 4, index: 395};// RNM(SP)
    this.rules[339].opcodes[3] = {type: 4, index: 396};// RNM(HTAB)

    // EQ-h
    this.rules[340].opcodes = [];
    this.rules[340].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[340].opcodes[1] = {type: 4, index: 339};// RNM(BWS-h)
    this.rules[340].opcodes[2] = {type: 4, index: 346};// RNM(EQ)
    this.rules[340].opcodes[3] = {type: 4, index: 339};// RNM(BWS-h)

    // RWS
    this.rules[341].opcodes = [];
    this.rules[341].opcodes[0] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[341].opcodes[1] = {type: 1, children: [2,3,4,5]};// ALT
    this.rules[341].opcodes[2] = {type: 4, index: 395};// RNM(SP)
    this.rules[341].opcodes[3] = {type: 4, index: 396};// RNM(HTAB)
    this.rules[341].opcodes[4] = {type: 9, string: [37,50,48]};// TLS
    this.rules[341].opcodes[5] = {type: 9, string: [37,48,57]};// TLS

    // BWS
    this.rules[342].opcodes = [];
    this.rules[342].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[342].opcodes[1] = {type: 1, children: [2,3,4,5]};// ALT
    this.rules[342].opcodes[2] = {type: 4, index: 395};// RNM(SP)
    this.rules[342].opcodes[3] = {type: 4, index: 396};// RNM(HTAB)
    this.rules[342].opcodes[4] = {type: 9, string: [37,50,48]};// TLS
    this.rules[342].opcodes[5] = {type: 9, string: [37,48,57]};// TLS

    // AT
    this.rules[343].opcodes = [];
    this.rules[343].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[343].opcodes[1] = {type: 9, string: [64]};// TLS
    this.rules[343].opcodes[2] = {type: 9, string: [37,52,48]};// TLS

    // COLON
    this.rules[344].opcodes = [];
    this.rules[344].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[344].opcodes[1] = {type: 9, string: [58]};// TLS
    this.rules[344].opcodes[2] = {type: 9, string: [37,51,97]};// TLS

    // COMMA
    this.rules[345].opcodes = [];
    this.rules[345].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[345].opcodes[1] = {type: 9, string: [44]};// TLS
    this.rules[345].opcodes[2] = {type: 9, string: [37,50,99]};// TLS

    // EQ
    this.rules[346].opcodes = [];
    this.rules[346].opcodes[0] = {type: 9, string: [61]};// TLS

    // SIGN
    this.rules[347].opcodes = [];
    this.rules[347].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[347].opcodes[1] = {type: 9, string: [43]};// TLS
    this.rules[347].opcodes[2] = {type: 9, string: [37,50,98]};// TLS
    this.rules[347].opcodes[3] = {type: 9, string: [45]};// TLS

    // SEMI
    this.rules[348].opcodes = [];
    this.rules[348].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[348].opcodes[1] = {type: 9, string: [59]};// TLS
    this.rules[348].opcodes[2] = {type: 9, string: [37,51,98]};// TLS

    // STAR
    this.rules[349].opcodes = [];
    this.rules[349].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[349].opcodes[1] = {type: 9, string: [42]};// TLS
    this.rules[349].opcodes[2] = {type: 9, string: [37,50,97]};// TLS

    // SQUOTE
    this.rules[350].opcodes = [];
    this.rules[350].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[350].opcodes[1] = {type: 9, string: [39]};// TLS
    this.rules[350].opcodes[2] = {type: 9, string: [37,50,55]};// TLS

    // OPEN
    this.rules[351].opcodes = [];
    this.rules[351].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[351].opcodes[1] = {type: 9, string: [40]};// TLS
    this.rules[351].opcodes[2] = {type: 9, string: [37,50,56]};// TLS

    // CLOSE
    this.rules[352].opcodes = [];
    this.rules[352].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[352].opcodes[1] = {type: 9, string: [41]};// TLS
    this.rules[352].opcodes[2] = {type: 9, string: [37,50,57]};// TLS

    // URI
    this.rules[353].opcodes = [];
    this.rules[353].opcodes[0] = {type: 2, children: [1,2,3,4,8]};// CAT
    this.rules[353].opcodes[1] = {type: 4, index: 355};// RNM(scheme)
    this.rules[353].opcodes[2] = {type: 9, string: [58]};// TLS
    this.rules[353].opcodes[3] = {type: 4, index: 354};// RNM(hier-part)
    this.rules[353].opcodes[4] = {type: 3, min: 0, max: 1};// REP
    this.rules[353].opcodes[5] = {type: 2, children: [6,7]};// CAT
    this.rules[353].opcodes[6] = {type: 9, string: [63]};// TLS
    this.rules[353].opcodes[7] = {type: 4, index: 374};// RNM(query)
    this.rules[353].opcodes[8] = {type: 3, min: 0, max: 1};// REP
    this.rules[353].opcodes[9] = {type: 2, children: [10,11]};// CAT
    this.rules[353].opcodes[10] = {type: 9, string: [35]};// TLS
    this.rules[353].opcodes[11] = {type: 4, index: 375};// RNM(fragment)

    // hier-part
    this.rules[354].opcodes = [];
    this.rules[354].opcodes[0] = {type: 1, children: [1,5,6]};// ALT
    this.rules[354].opcodes[1] = {type: 2, children: [2,3,4]};// CAT
    this.rules[354].opcodes[2] = {type: 9, string: [47,47]};// TLS
    this.rules[354].opcodes[3] = {type: 4, index: 356};// RNM(authority)
    this.rules[354].opcodes[4] = {type: 4, index: 368};// RNM(path-abempty)
    this.rules[354].opcodes[5] = {type: 4, index: 369};// RNM(path-absolute)
    this.rules[354].opcodes[6] = {type: 4, index: 370};// RNM(path-rootless)

    // scheme
    this.rules[355].opcodes = [];
    this.rules[355].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[355].opcodes[1] = {type: 4, index: 390};// RNM(ALPHA)
    this.rules[355].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[355].opcodes[3] = {type: 1, children: [4,5,6,7,8]};// ALT
    this.rules[355].opcodes[4] = {type: 4, index: 390};// RNM(ALPHA)
    this.rules[355].opcodes[5] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[355].opcodes[6] = {type: 9, string: [43]};// TLS
    this.rules[355].opcodes[7] = {type: 9, string: [45]};// TLS
    this.rules[355].opcodes[8] = {type: 9, string: [46]};// TLS

    // authority
    this.rules[356].opcodes = [];
    this.rules[356].opcodes[0] = {type: 2, children: [1,5,6]};// CAT
    this.rules[356].opcodes[1] = {type: 3, min: 0, max: 1};// REP
    this.rules[356].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[356].opcodes[3] = {type: 4, index: 357};// RNM(userinfo)
    this.rules[356].opcodes[4] = {type: 9, string: [64]};// TLS
    this.rules[356].opcodes[5] = {type: 4, index: 358};// RNM(host)
    this.rules[356].opcodes[6] = {type: 3, min: 0, max: 1};// REP
    this.rules[356].opcodes[7] = {type: 2, children: [8,9]};// CAT
    this.rules[356].opcodes[8] = {type: 9, string: [58]};// TLS
    this.rules[356].opcodes[9] = {type: 4, index: 359};// RNM(port)

    // userinfo
    this.rules[357].opcodes = [];
    this.rules[357].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[357].opcodes[1] = {type: 1, children: [2,3,4,5]};// ALT
    this.rules[357].opcodes[2] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[357].opcodes[3] = {type: 4, index: 376};// RNM(pct-encoded)
    this.rules[357].opcodes[4] = {type: 4, index: 378};// RNM(sub-delims)
    this.rules[357].opcodes[5] = {type: 9, string: [58]};// TLS

    // host
    this.rules[358].opcodes = [];
    this.rules[358].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[358].opcodes[1] = {type: 4, index: 360};// RNM(IP-literal)
    this.rules[358].opcodes[2] = {type: 4, index: 365};// RNM(IPv4address)
    this.rules[358].opcodes[3] = {type: 4, index: 367};// RNM(reg-name)

    // port
    this.rules[359].opcodes = [];
    this.rules[359].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[359].opcodes[1] = {type: 4, index: 391};// RNM(DIGIT)

    // IP-literal
    this.rules[360].opcodes = [];
    this.rules[360].opcodes[0] = {type: 2, children: [1,2,5]};// CAT
    this.rules[360].opcodes[1] = {type: 9, string: [91]};// TLS
    this.rules[360].opcodes[2] = {type: 1, children: [3,4]};// ALT
    this.rules[360].opcodes[3] = {type: 4, index: 362};// RNM(IPv6address)
    this.rules[360].opcodes[4] = {type: 4, index: 361};// RNM(IPvFuture)
    this.rules[360].opcodes[5] = {type: 9, string: [93]};// TLS

    // IPvFuture
    this.rules[361].opcodes = [];
    this.rules[361].opcodes[0] = {type: 2, children: [1,2,4,5]};// CAT
    this.rules[361].opcodes[1] = {type: 9, string: [118]};// TLS
    this.rules[361].opcodes[2] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[361].opcodes[3] = {type: 4, index: 392};// RNM(HEXDIG)
    this.rules[361].opcodes[4] = {type: 9, string: [46]};// TLS
    this.rules[361].opcodes[5] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[361].opcodes[6] = {type: 1, children: [7,8,9]};// ALT
    this.rules[361].opcodes[7] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[361].opcodes[8] = {type: 4, index: 378};// RNM(sub-delims)
    this.rules[361].opcodes[9] = {type: 9, string: [58]};// TLS

    // IPv6address
    this.rules[362].opcodes = [];
    this.rules[362].opcodes[0] = {type: 1, children: [1,7,14,23,37,51,63,73,83]};// ALT
    this.rules[362].opcodes[1] = {type: 2, children: [2,6]};// CAT
    this.rules[362].opcodes[2] = {type: 3, min: 6, max: 6};// REP
    this.rules[362].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[362].opcodes[4] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[5] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[6] = {type: 4, index: 364};// RNM(ls32)
    this.rules[362].opcodes[7] = {type: 2, children: [8,9,13]};// CAT
    this.rules[362].opcodes[8] = {type: 9, string: [58,58]};// TLS
    this.rules[362].opcodes[9] = {type: 3, min: 5, max: 5};// REP
    this.rules[362].opcodes[10] = {type: 2, children: [11,12]};// CAT
    this.rules[362].opcodes[11] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[12] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[13] = {type: 4, index: 364};// RNM(ls32)
    this.rules[362].opcodes[14] = {type: 2, children: [15,17,18,22]};// CAT
    this.rules[362].opcodes[15] = {type: 3, min: 0, max: 1};// REP
    this.rules[362].opcodes[16] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[17] = {type: 9, string: [58,58]};// TLS
    this.rules[362].opcodes[18] = {type: 3, min: 4, max: 4};// REP
    this.rules[362].opcodes[19] = {type: 2, children: [20,21]};// CAT
    this.rules[362].opcodes[20] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[21] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[22] = {type: 4, index: 364};// RNM(ls32)
    this.rules[362].opcodes[23] = {type: 2, children: [24,31,32,36]};// CAT
    this.rules[362].opcodes[24] = {type: 3, min: 0, max: 1};// REP
    this.rules[362].opcodes[25] = {type: 2, children: [26,30]};// CAT
    this.rules[362].opcodes[26] = {type: 3, min: 0, max: 1};// REP
    this.rules[362].opcodes[27] = {type: 2, children: [28,29]};// CAT
    this.rules[362].opcodes[28] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[29] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[30] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[31] = {type: 9, string: [58,58]};// TLS
    this.rules[362].opcodes[32] = {type: 3, min: 3, max: 3};// REP
    this.rules[362].opcodes[33] = {type: 2, children: [34,35]};// CAT
    this.rules[362].opcodes[34] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[35] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[36] = {type: 4, index: 364};// RNM(ls32)
    this.rules[362].opcodes[37] = {type: 2, children: [38,45,46,50]};// CAT
    this.rules[362].opcodes[38] = {type: 3, min: 0, max: 1};// REP
    this.rules[362].opcodes[39] = {type: 2, children: [40,44]};// CAT
    this.rules[362].opcodes[40] = {type: 3, min: 0, max: 2};// REP
    this.rules[362].opcodes[41] = {type: 2, children: [42,43]};// CAT
    this.rules[362].opcodes[42] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[43] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[44] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[45] = {type: 9, string: [58,58]};// TLS
    this.rules[362].opcodes[46] = {type: 3, min: 2, max: 2};// REP
    this.rules[362].opcodes[47] = {type: 2, children: [48,49]};// CAT
    this.rules[362].opcodes[48] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[49] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[50] = {type: 4, index: 364};// RNM(ls32)
    this.rules[362].opcodes[51] = {type: 2, children: [52,59,60,61,62]};// CAT
    this.rules[362].opcodes[52] = {type: 3, min: 0, max: 1};// REP
    this.rules[362].opcodes[53] = {type: 2, children: [54,58]};// CAT
    this.rules[362].opcodes[54] = {type: 3, min: 0, max: 3};// REP
    this.rules[362].opcodes[55] = {type: 2, children: [56,57]};// CAT
    this.rules[362].opcodes[56] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[57] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[58] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[59] = {type: 9, string: [58,58]};// TLS
    this.rules[362].opcodes[60] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[61] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[62] = {type: 4, index: 364};// RNM(ls32)
    this.rules[362].opcodes[63] = {type: 2, children: [64,71,72]};// CAT
    this.rules[362].opcodes[64] = {type: 3, min: 0, max: 1};// REP
    this.rules[362].opcodes[65] = {type: 2, children: [66,70]};// CAT
    this.rules[362].opcodes[66] = {type: 3, min: 0, max: 4};// REP
    this.rules[362].opcodes[67] = {type: 2, children: [68,69]};// CAT
    this.rules[362].opcodes[68] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[69] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[70] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[71] = {type: 9, string: [58,58]};// TLS
    this.rules[362].opcodes[72] = {type: 4, index: 364};// RNM(ls32)
    this.rules[362].opcodes[73] = {type: 2, children: [74,81,82]};// CAT
    this.rules[362].opcodes[74] = {type: 3, min: 0, max: 1};// REP
    this.rules[362].opcodes[75] = {type: 2, children: [76,80]};// CAT
    this.rules[362].opcodes[76] = {type: 3, min: 0, max: 5};// REP
    this.rules[362].opcodes[77] = {type: 2, children: [78,79]};// CAT
    this.rules[362].opcodes[78] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[79] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[80] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[81] = {type: 9, string: [58,58]};// TLS
    this.rules[362].opcodes[82] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[83] = {type: 2, children: [84,91]};// CAT
    this.rules[362].opcodes[84] = {type: 3, min: 0, max: 1};// REP
    this.rules[362].opcodes[85] = {type: 2, children: [86,90]};// CAT
    this.rules[362].opcodes[86] = {type: 3, min: 0, max: 6};// REP
    this.rules[362].opcodes[87] = {type: 2, children: [88,89]};// CAT
    this.rules[362].opcodes[88] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[89] = {type: 9, string: [58]};// TLS
    this.rules[362].opcodes[90] = {type: 4, index: 363};// RNM(h16)
    this.rules[362].opcodes[91] = {type: 9, string: [58,58]};// TLS

    // h16
    this.rules[363].opcodes = [];
    this.rules[363].opcodes[0] = {type: 3, min: 1, max: 4};// REP
    this.rules[363].opcodes[1] = {type: 4, index: 392};// RNM(HEXDIG)

    // ls32
    this.rules[364].opcodes = [];
    this.rules[364].opcodes[0] = {type: 1, children: [1,5]};// ALT
    this.rules[364].opcodes[1] = {type: 2, children: [2,3,4]};// CAT
    this.rules[364].opcodes[2] = {type: 4, index: 363};// RNM(h16)
    this.rules[364].opcodes[3] = {type: 9, string: [58]};// TLS
    this.rules[364].opcodes[4] = {type: 4, index: 363};// RNM(h16)
    this.rules[364].opcodes[5] = {type: 4, index: 365};// RNM(IPv4address)

    // IPv4address
    this.rules[365].opcodes = [];
    this.rules[365].opcodes[0] = {type: 2, children: [1,2,3,4,5,6,7]};// CAT
    this.rules[365].opcodes[1] = {type: 4, index: 366};// RNM(dec-octet)
    this.rules[365].opcodes[2] = {type: 9, string: [46]};// TLS
    this.rules[365].opcodes[3] = {type: 4, index: 366};// RNM(dec-octet)
    this.rules[365].opcodes[4] = {type: 9, string: [46]};// TLS
    this.rules[365].opcodes[5] = {type: 4, index: 366};// RNM(dec-octet)
    this.rules[365].opcodes[6] = {type: 9, string: [46]};// TLS
    this.rules[365].opcodes[7] = {type: 4, index: 366};// RNM(dec-octet)

    // dec-octet
    this.rules[366].opcodes = [];
    this.rules[366].opcodes[0] = {type: 1, children: [1,5,9,12,15]};// ALT
    this.rules[366].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[366].opcodes[2] = {type: 9, string: [49]};// TLS
    this.rules[366].opcodes[3] = {type: 3, min: 2, max: 2};// REP
    this.rules[366].opcodes[4] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[366].opcodes[5] = {type: 2, children: [6,7,8]};// CAT
    this.rules[366].opcodes[6] = {type: 9, string: [50]};// TLS
    this.rules[366].opcodes[7] = {type: 8, min: 48, max: 52};// TRG
    this.rules[366].opcodes[8] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[366].opcodes[9] = {type: 2, children: [10,11]};// CAT
    this.rules[366].opcodes[10] = {type: 9, string: [50,53]};// TLS
    this.rules[366].opcodes[11] = {type: 8, min: 48, max: 53};// TRG
    this.rules[366].opcodes[12] = {type: 2, children: [13,14]};// CAT
    this.rules[366].opcodes[13] = {type: 8, min: 49, max: 57};// TRG
    this.rules[366].opcodes[14] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[366].opcodes[15] = {type: 4, index: 391};// RNM(DIGIT)

    // reg-name
    this.rules[367].opcodes = [];
    this.rules[367].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[367].opcodes[1] = {type: 1, children: [2,3,4]};// ALT
    this.rules[367].opcodes[2] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[367].opcodes[3] = {type: 4, index: 376};// RNM(pct-encoded)
    this.rules[367].opcodes[4] = {type: 4, index: 378};// RNM(sub-delims)

    // path-abempty
    this.rules[368].opcodes = [];
    this.rules[368].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[368].opcodes[1] = {type: 2, children: [2,3]};// CAT
    this.rules[368].opcodes[2] = {type: 9, string: [47]};// TLS
    this.rules[368].opcodes[3] = {type: 4, index: 371};// RNM(segment)

    // path-absolute
    this.rules[369].opcodes = [];
    this.rules[369].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[369].opcodes[1] = {type: 9, string: [47]};// TLS
    this.rules[369].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[369].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[369].opcodes[4] = {type: 4, index: 372};// RNM(segment-nz)
    this.rules[369].opcodes[5] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[369].opcodes[6] = {type: 2, children: [7,8]};// CAT
    this.rules[369].opcodes[7] = {type: 9, string: [47]};// TLS
    this.rules[369].opcodes[8] = {type: 4, index: 371};// RNM(segment)

    // path-rootless
    this.rules[370].opcodes = [];
    this.rules[370].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[370].opcodes[1] = {type: 4, index: 372};// RNM(segment-nz)
    this.rules[370].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[370].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[370].opcodes[4] = {type: 9, string: [47]};// TLS
    this.rules[370].opcodes[5] = {type: 4, index: 371};// RNM(segment)

    // segment
    this.rules[371].opcodes = [];
    this.rules[371].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[371].opcodes[1] = {type: 4, index: 373};// RNM(pchar)

    // segment-nz
    this.rules[372].opcodes = [];
    this.rules[372].opcodes[0] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[372].opcodes[1] = {type: 4, index: 373};// RNM(pchar)

    // pchar
    this.rules[373].opcodes = [];
    this.rules[373].opcodes[0] = {type: 1, children: [1,2,3,4,5]};// ALT
    this.rules[373].opcodes[1] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[373].opcodes[2] = {type: 4, index: 376};// RNM(pct-encoded)
    this.rules[373].opcodes[3] = {type: 4, index: 378};// RNM(sub-delims)
    this.rules[373].opcodes[4] = {type: 9, string: [58]};// TLS
    this.rules[373].opcodes[5] = {type: 9, string: [64]};// TLS

    // query
    this.rules[374].opcodes = [];
    this.rules[374].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[374].opcodes[1] = {type: 1, children: [2,3,4]};// ALT
    this.rules[374].opcodes[2] = {type: 4, index: 373};// RNM(pchar)
    this.rules[374].opcodes[3] = {type: 9, string: [47]};// TLS
    this.rules[374].opcodes[4] = {type: 9, string: [63]};// TLS

    // fragment
    this.rules[375].opcodes = [];
    this.rules[375].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[375].opcodes[1] = {type: 1, children: [2,3,4]};// ALT
    this.rules[375].opcodes[2] = {type: 4, index: 373};// RNM(pchar)
    this.rules[375].opcodes[3] = {type: 9, string: [47]};// TLS
    this.rules[375].opcodes[4] = {type: 9, string: [63]};// TLS

    // pct-encoded
    this.rules[376].opcodes = [];
    this.rules[376].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[376].opcodes[1] = {type: 9, string: [37]};// TLS
    this.rules[376].opcodes[2] = {type: 4, index: 392};// RNM(HEXDIG)
    this.rules[376].opcodes[3] = {type: 4, index: 392};// RNM(HEXDIG)

    // unreserved
    this.rules[377].opcodes = [];
    this.rules[377].opcodes[0] = {type: 1, children: [1,2,3,4,5,6]};// ALT
    this.rules[377].opcodes[1] = {type: 4, index: 390};// RNM(ALPHA)
    this.rules[377].opcodes[2] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[377].opcodes[3] = {type: 9, string: [45]};// TLS
    this.rules[377].opcodes[4] = {type: 9, string: [46]};// TLS
    this.rules[377].opcodes[5] = {type: 9, string: [95]};// TLS
    this.rules[377].opcodes[6] = {type: 9, string: [126]};// TLS

    // sub-delims
    this.rules[378].opcodes = [];
    this.rules[378].opcodes[0] = {type: 1, children: [1,2,3,4,5]};// ALT
    this.rules[378].opcodes[1] = {type: 9, string: [36]};// TLS
    this.rules[378].opcodes[2] = {type: 9, string: [38]};// TLS
    this.rules[378].opcodes[3] = {type: 9, string: [39]};// TLS
    this.rules[378].opcodes[4] = {type: 9, string: [61]};// TLS
    this.rules[378].opcodes[5] = {type: 4, index: 379};// RNM(other-delims)

    // other-delims
    this.rules[379].opcodes = [];
    this.rules[379].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7]};// ALT
    this.rules[379].opcodes[1] = {type: 9, string: [33]};// TLS
    this.rules[379].opcodes[2] = {type: 9, string: [40]};// TLS
    this.rules[379].opcodes[3] = {type: 9, string: [41]};// TLS
    this.rules[379].opcodes[4] = {type: 9, string: [42]};// TLS
    this.rules[379].opcodes[5] = {type: 9, string: [43]};// TLS
    this.rules[379].opcodes[6] = {type: 9, string: [44]};// TLS
    this.rules[379].opcodes[7] = {type: 9, string: [59]};// TLS

    // pchar-no-SQUOTE
    this.rules[380].opcodes = [];
    this.rules[380].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8]};// ALT
    this.rules[380].opcodes[1] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[380].opcodes[2] = {type: 4, index: 381};// RNM(pct-encoded-no-SQUOTE)
    this.rules[380].opcodes[3] = {type: 4, index: 379};// RNM(other-delims)
    this.rules[380].opcodes[4] = {type: 9, string: [36]};// TLS
    this.rules[380].opcodes[5] = {type: 9, string: [38]};// TLS
    this.rules[380].opcodes[6] = {type: 9, string: [61]};// TLS
    this.rules[380].opcodes[7] = {type: 9, string: [58]};// TLS
    this.rules[380].opcodes[8] = {type: 9, string: [64]};// TLS

    // pct-encoded-no-SQUOTE
    this.rules[381].opcodes = [];
    this.rules[381].opcodes[0] = {type: 1, children: [1,14]};// ALT
    this.rules[381].opcodes[1] = {type: 2, children: [2,3,13]};// CAT
    this.rules[381].opcodes[2] = {type: 9, string: [37]};// TLS
    this.rules[381].opcodes[3] = {type: 1, children: [4,5,6,7,8,9,10,11,12]};// ALT
    this.rules[381].opcodes[4] = {type: 9, string: [48]};// TLS
    this.rules[381].opcodes[5] = {type: 9, string: [49]};// TLS
    this.rules[381].opcodes[6] = {type: 9, string: [51]};// TLS
    this.rules[381].opcodes[7] = {type: 9, string: [52]};// TLS
    this.rules[381].opcodes[8] = {type: 9, string: [53]};// TLS
    this.rules[381].opcodes[9] = {type: 9, string: [54]};// TLS
    this.rules[381].opcodes[10] = {type: 9, string: [56]};// TLS
    this.rules[381].opcodes[11] = {type: 9, string: [57]};// TLS
    this.rules[381].opcodes[12] = {type: 4, index: 393};// RNM(A-to-F)
    this.rules[381].opcodes[13] = {type: 4, index: 392};// RNM(HEXDIG)
    this.rules[381].opcodes[14] = {type: 2, children: [15,16,17]};// CAT
    this.rules[381].opcodes[15] = {type: 9, string: [37]};// TLS
    this.rules[381].opcodes[16] = {type: 9, string: [50]};// TLS
    this.rules[381].opcodes[17] = {type: 1, children: [18,19,20,21,22,23,24,25,26,27]};// ALT
    this.rules[381].opcodes[18] = {type: 9, string: [48]};// TLS
    this.rules[381].opcodes[19] = {type: 9, string: [49]};// TLS
    this.rules[381].opcodes[20] = {type: 9, string: [50]};// TLS
    this.rules[381].opcodes[21] = {type: 9, string: [51]};// TLS
    this.rules[381].opcodes[22] = {type: 9, string: [52]};// TLS
    this.rules[381].opcodes[23] = {type: 9, string: [53]};// TLS
    this.rules[381].opcodes[24] = {type: 9, string: [54]};// TLS
    this.rules[381].opcodes[25] = {type: 9, string: [56]};// TLS
    this.rules[381].opcodes[26] = {type: 9, string: [57]};// TLS
    this.rules[381].opcodes[27] = {type: 4, index: 393};// RNM(A-to-F)

    // qchar-no-AMP
    this.rules[382].opcodes = [];
    this.rules[382].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9,10]};// ALT
    this.rules[382].opcodes[1] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[382].opcodes[2] = {type: 4, index: 376};// RNM(pct-encoded)
    this.rules[382].opcodes[3] = {type: 4, index: 379};// RNM(other-delims)
    this.rules[382].opcodes[4] = {type: 9, string: [58]};// TLS
    this.rules[382].opcodes[5] = {type: 9, string: [64]};// TLS
    this.rules[382].opcodes[6] = {type: 9, string: [47]};// TLS
    this.rules[382].opcodes[7] = {type: 9, string: [63]};// TLS
    this.rules[382].opcodes[8] = {type: 9, string: [36]};// TLS
    this.rules[382].opcodes[9] = {type: 9, string: [39]};// TLS
    this.rules[382].opcodes[10] = {type: 9, string: [61]};// TLS

    // qchar-no-AMP-EQ
    this.rules[383].opcodes = [];
    this.rules[383].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9]};// ALT
    this.rules[383].opcodes[1] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[383].opcodes[2] = {type: 4, index: 376};// RNM(pct-encoded)
    this.rules[383].opcodes[3] = {type: 4, index: 379};// RNM(other-delims)
    this.rules[383].opcodes[4] = {type: 9, string: [58]};// TLS
    this.rules[383].opcodes[5] = {type: 9, string: [64]};// TLS
    this.rules[383].opcodes[6] = {type: 9, string: [47]};// TLS
    this.rules[383].opcodes[7] = {type: 9, string: [63]};// TLS
    this.rules[383].opcodes[8] = {type: 9, string: [36]};// TLS
    this.rules[383].opcodes[9] = {type: 9, string: [39]};// TLS

    // qchar-no-AMP-EQ-AT-DOLLAR
    this.rules[384].opcodes = [];
    this.rules[384].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7]};// ALT
    this.rules[384].opcodes[1] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[384].opcodes[2] = {type: 4, index: 376};// RNM(pct-encoded)
    this.rules[384].opcodes[3] = {type: 4, index: 379};// RNM(other-delims)
    this.rules[384].opcodes[4] = {type: 9, string: [58]};// TLS
    this.rules[384].opcodes[5] = {type: 9, string: [47]};// TLS
    this.rules[384].opcodes[6] = {type: 9, string: [63]};// TLS
    this.rules[384].opcodes[7] = {type: 9, string: [39]};// TLS

    // qchar-unescaped
    this.rules[385].opcodes = [];
    this.rules[385].opcodes[0] = {type: 1, children: [1,2,3,4,5,6,7,8,9,10]};// ALT
    this.rules[385].opcodes[1] = {type: 4, index: 377};// RNM(unreserved)
    this.rules[385].opcodes[2] = {type: 4, index: 386};// RNM(pct-encoded-unescaped)
    this.rules[385].opcodes[3] = {type: 4, index: 379};// RNM(other-delims)
    this.rules[385].opcodes[4] = {type: 9, string: [58]};// TLS
    this.rules[385].opcodes[5] = {type: 9, string: [64]};// TLS
    this.rules[385].opcodes[6] = {type: 9, string: [47]};// TLS
    this.rules[385].opcodes[7] = {type: 9, string: [63]};// TLS
    this.rules[385].opcodes[8] = {type: 9, string: [36]};// TLS
    this.rules[385].opcodes[9] = {type: 9, string: [39]};// TLS
    this.rules[385].opcodes[10] = {type: 9, string: [61]};// TLS

    // pct-encoded-unescaped
    this.rules[386].opcodes = [];
    this.rules[386].opcodes[0] = {type: 1, children: [1,14,28]};// ALT
    this.rules[386].opcodes[1] = {type: 2, children: [2,3,13]};// CAT
    this.rules[386].opcodes[2] = {type: 9, string: [37]};// TLS
    this.rules[386].opcodes[3] = {type: 1, children: [4,5,6,7,8,9,10,11,12]};// ALT
    this.rules[386].opcodes[4] = {type: 9, string: [48]};// TLS
    this.rules[386].opcodes[5] = {type: 9, string: [49]};// TLS
    this.rules[386].opcodes[6] = {type: 9, string: [51]};// TLS
    this.rules[386].opcodes[7] = {type: 9, string: [52]};// TLS
    this.rules[386].opcodes[8] = {type: 9, string: [54]};// TLS
    this.rules[386].opcodes[9] = {type: 9, string: [55]};// TLS
    this.rules[386].opcodes[10] = {type: 9, string: [56]};// TLS
    this.rules[386].opcodes[11] = {type: 9, string: [57]};// TLS
    this.rules[386].opcodes[12] = {type: 4, index: 393};// RNM(A-to-F)
    this.rules[386].opcodes[13] = {type: 4, index: 392};// RNM(HEXDIG)
    this.rules[386].opcodes[14] = {type: 2, children: [15,16,17]};// CAT
    this.rules[386].opcodes[15] = {type: 9, string: [37]};// TLS
    this.rules[386].opcodes[16] = {type: 9, string: [50]};// TLS
    this.rules[386].opcodes[17] = {type: 1, children: [18,19,20,21,22,23,24,25,26,27]};// ALT
    this.rules[386].opcodes[18] = {type: 9, string: [48]};// TLS
    this.rules[386].opcodes[19] = {type: 9, string: [49]};// TLS
    this.rules[386].opcodes[20] = {type: 9, string: [51]};// TLS
    this.rules[386].opcodes[21] = {type: 9, string: [52]};// TLS
    this.rules[386].opcodes[22] = {type: 9, string: [53]};// TLS
    this.rules[386].opcodes[23] = {type: 9, string: [54]};// TLS
    this.rules[386].opcodes[24] = {type: 9, string: [55]};// TLS
    this.rules[386].opcodes[25] = {type: 9, string: [56]};// TLS
    this.rules[386].opcodes[26] = {type: 9, string: [57]};// TLS
    this.rules[386].opcodes[27] = {type: 4, index: 393};// RNM(A-to-F)
    this.rules[386].opcodes[28] = {type: 2, children: [29,30,31]};// CAT
    this.rules[386].opcodes[29] = {type: 9, string: [37]};// TLS
    this.rules[386].opcodes[30] = {type: 9, string: [53]};// TLS
    this.rules[386].opcodes[31] = {type: 1, children: [32,33,34,35,36,37]};// ALT
    this.rules[386].opcodes[32] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[386].opcodes[33] = {type: 9, string: [97]};// TLS
    this.rules[386].opcodes[34] = {type: 9, string: [98]};// TLS
    this.rules[386].opcodes[35] = {type: 9, string: [100]};// TLS
    this.rules[386].opcodes[36] = {type: 9, string: [101]};// TLS
    this.rules[386].opcodes[37] = {type: 9, string: [102]};// TLS

    // qchar-no-AMP-DQUOTE
    this.rules[387].opcodes = [];
    this.rules[387].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[387].opcodes[1] = {type: 4, index: 385};// RNM(qchar-unescaped)
    this.rules[387].opcodes[2] = {type: 2, children: [3,4]};// CAT
    this.rules[387].opcodes[3] = {type: 4, index: 189};// RNM(escape)
    this.rules[387].opcodes[4] = {type: 1, children: [5,6]};// ALT
    this.rules[387].opcodes[5] = {type: 4, index: 189};// RNM(escape)
    this.rules[387].opcodes[6] = {type: 4, index: 182};// RNM(quotation-mark)

    // IRI-in-header
    this.rules[388].opcodes = [];
    this.rules[388].opcodes[0] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[388].opcodes[1] = {type: 1, children: [2,3]};// ALT
    this.rules[388].opcodes[2] = {type: 4, index: 397};// RNM(VCHAR)
    this.rules[388].opcodes[3] = {type: 4, index: 337};// RNM(obs-text)

    // IRI-in-query
    this.rules[389].opcodes = [];
    this.rules[389].opcodes[0] = {type: 3, min: 1, max: Infinity};// REP
    this.rules[389].opcodes[1] = {type: 4, index: 382};// RNM(qchar-no-AMP)

    // ALPHA
    this.rules[390].opcodes = [];
    this.rules[390].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[390].opcodes[1] = {type: 8, min: 65, max: 90};// TRG
    this.rules[390].opcodes[2] = {type: 8, min: 97, max: 122};// TRG

    // DIGIT
    this.rules[391].opcodes = [];
    this.rules[391].opcodes[0] = {type: 8, min: 48, max: 57};// TRG

    // HEXDIG
    this.rules[392].opcodes = [];
    this.rules[392].opcodes[0] = {type: 1, children: [1,2]};// ALT
    this.rules[392].opcodes[1] = {type: 4, index: 391};// RNM(DIGIT)
    this.rules[392].opcodes[2] = {type: 4, index: 393};// RNM(A-to-F)

    // A-to-F
    this.rules[393].opcodes = [];
    this.rules[393].opcodes[0] = {type: 1, children: [1,2,3,4,5,6]};// ALT
    this.rules[393].opcodes[1] = {type: 9, string: [97]};// TLS
    this.rules[393].opcodes[2] = {type: 9, string: [98]};// TLS
    this.rules[393].opcodes[3] = {type: 9, string: [99]};// TLS
    this.rules[393].opcodes[4] = {type: 9, string: [100]};// TLS
    this.rules[393].opcodes[5] = {type: 9, string: [101]};// TLS
    this.rules[393].opcodes[6] = {type: 9, string: [102]};// TLS

    // DQUOTE
    this.rules[394].opcodes = [];
    this.rules[394].opcodes[0] = {type: 10, string: [34]};// TBS

    // SP
    this.rules[395].opcodes = [];
    this.rules[395].opcodes[0] = {type: 10, string: [32]};// TBS

    // HTAB
    this.rules[396].opcodes = [];
    this.rules[396].opcodes[0] = {type: 10, string: [9]};// TBS

    // VCHAR
    this.rules[397].opcodes = [];
    this.rules[397].opcodes[0] = {type: 8, min: 33, max: 126};// TRG
}

// INPUT GRAMMAR FILE(s)
//
// ;------------------------------------------------------------------------------
// ; odata-abnf-construction-rules
// ;------------------------------------------------------------------------------
// ;
// ;    OData Version 4.0 Plus Errata 02
// ;    OASIS Standard incorporating Approved Errata 02
// ;    30 October 2014
// ;    Copyright (c) OASIS Open 2014. All Rights Reserved.
// ;    Source: http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/abnf/
// ;
// ;
// ; Technical Committee:
// ;   OASIS Open Data Protocol (OData) TC
// ;   https://www.oasis-open.org/committees/odata
// ;
// ; Chairs:
// ;   - Barbara Hartel (barbara.hartel@sap.com), SAP AG
// ;   - Ram Jeyaraman (Ram.Jeyaraman@microsoft.com), Microsoft
// ;
// ; Editors:
// ;   - Ralf Handl (ralf.handl@sap.com), SAP AG
// ;   - Michael Pizzo (mikep@microsoft.com), Microsoft
// ;   - Martin Zurmuehl (martin.zurmuehl@sap.com), SAP AG
// ;
// ; Additional artifacts:
// ;   This grammar is one component of a Work Product which consists of:
// ;   - OData Version 4.0 Part 1: Protocol
// ;   - OData Version 4.0 Part 2: URL Conventions
// ;   - OData Version 4.0 Part 3: Common Schema Definition Language (CSDL)
// ;   - OData ABNF Construction Rules Version 4.0 (this document)
// ;   - OData ABNF Test Cases
// ;   - OData Core Vocabulary
// ;   - OData Capabilities Vocabulary
// ;   - OData Measures Vocabulary
// ;   - OData Metadata Service Entity Model
// ;   - OData EDMX XML Schema
// ;   - OData EDM XML Schema
// ;
// ; Related work:
// ;   This work product is related to the following two Work Products, each of
// ;   which define alternate formats for OData payloads
// ;   - OData Atom Format Version 4.0
// ;   - OData JSON Format Version 4.0
// ;   This specification replaces or supersedes:
// ;   - None
// ;
// ; Declared XML namespaces:
// ;   - http://docs.oasis-open.org/odata/ns/edmx
// ;   - http://docs.oasis-open.org/odata/ns/edm
// ;
// ; Abstract:
// ;   The Open Data Protocol (OData) enables the creation of REST-based data
// ;   services, which allow resources, identified using Uniform Resource
// ;   Identifiers (URLs) and defined in a data model, to be published and
// ;   edited by Web clients using simple HTTP messages. This document defines
// ;   the URL syntax for requests and the serialization format for primitive
// ;   literals in request and response payloads.
// ;
// ; Overview:
// ;   This grammar uses the ABNF defined in RFC5234 with one extension: literals
// ;   enclosed in single quotes (e.g. '$metadata') are treated case-sensitive.
// ;
// ;   The following rules assume that URIs have been percent-encoding normalized
// ;   as described in section 6.2.2.2 of RFC3986
// ;   (http://tools.ietf.org/html/rfc3986#section-6.2.2.2)
// ;   before applying the grammar to them, i.e. all characters in the unreserved
// ;   set (see rule "unreserved" below) are plain literals and NOT
// ;   percent-encoded.
// ;
// ;   For characters outside the unreserved set the rules explicitly state
// ;   whether the percent-encoded representation is treated identical to the
// ;   plain literal representation.
// ;
// ;   One prominent example is the single quote that delimits OData primitive
// ;   type literals: %27 and ' are treated identically, so a single quote within
// ;   a string literal is "encoded" as two consecutive single quotes in either
// ;   literal or percent-encoded representation.
// ;
// ; Contents:
// ;   1. Resource Path
// ;   2. Query Options
// ;   3. Context URL Fragments
// ;   4. Expressions
// ;   5. JSON format for function parameters
// ;   6. Names and identifiers
// ;   7. Literal Data Values
// ;   8. Header values
// ;   9. Punctuation
// ;
// ;   A. URI syntax [RFC3986]
// ;   B. IRI syntax [RFC3986]
// ;   C. ABNF core definitions [RFC5234]
// ;
// ;------------------------------------------------------------------------------
// dummyStartRule = odataUri / header / primitiveValue ; just to please the test parser
// ;------------------------------------------------------------------------------
// 
// 
// odataUri = serviceRoot [ odataRelativeUri ]
// 
// serviceRoot = ( "https" / "http" )                    ; Note: case-insensitive
//               "://" host [ ":" port ]
//               "/" *( segment-nz "/" )
// 
// odataRelativeUri = '$batch'                           ; Note: case-sensitive
//                  / '$entity' "?" entityOptions
//                  / '$entity' "/" qualifiedEntityTypeName "?" entityCastOptions
//                  / '$metadata' [ "?" format ] [ context ]
//                  / resourcePath [ "?" queryOptions ]
// 
// 
// ;------------------------------------------------------------------------------
// ; 1. Resource Path
// ;------------------------------------------------------------------------------
// 
// resourcePath = entitySetName                  [ collectionNavigation ]
//              / singletonEntity                [ singleNavigation ]
//              / actionImportCall
//              / entityColFunctionImportCall    [ collectionNavigation ]
//              / entityFunctionImportCall       [ singleNavigation ]
//              / complexColFunctionImportCall   [ collectionPath ]
//              / complexFunctionImportCall      [ complexPath ]
//              / primitiveColFunctionImportCall [ collectionPath ]
//              / primitiveFunctionImportCall    [ singlePath ]
//              / crossjoin
//              / '$all'
// 
// collectionNavigation = [ "/" qualifiedEntityTypeName ] [ collectionNavPath ]
// collectionNavPath    = keyPredicate [ singleNavigation ]
//                      / collectionPath
//                      / ref
// 
// keyPredicate     = simpleKey / compoundKey
// simpleKey        = OPEN keyPropertyValue CLOSE
// compoundKey      = OPEN keyValuePair *( COMMA keyValuePair ) CLOSE
// keyValuePair     = ( primitiveKeyProperty / keyPropertyAlias ) EQ keyPropertyValue
// keyPropertyValue = primitiveLiteral
// keyPropertyAlias = odataIdentifier
// 
// singleNavigation = [ "/" qualifiedEntityTypeName ]
//                    [ "/" propertyPath
//                    / boundOperation
//                    / ref
//                    / value  ; request the media resource of a media entity
//                    ]
// 
// propertyPath = entityColNavigationProperty [ collectionNavigation ]
//              / entityNavigationProperty    [ singleNavigation ]
//              / complexColProperty          [ collectionPath ]
//              / complexProperty             [ complexPath ]
//              / primitiveColProperty        [ collectionPath ]
//              / primitiveProperty           [ singlePath ]
//              / streamProperty              [ boundOperation ]
// 
// collectionPath = count / boundOperation
// 
// singlePath     = value / boundOperation
// 
// complexPath    = [ "/" qualifiedComplexTypeName ]
//                  ( "/" propertyPath
//                  / boundOperation
//                  )
// 
// count = '/$count'
// ref   = '/$ref'
// value = '/$value'
// 
// ; boundOperation segments can only be composed if the type of the previous segment
// ; matches the type of the first parameter of the action or function being called.
// ; Note that the rule name reflects the return type of the function.
// boundOperation = "/" ( boundActionCall
//                      / boundEntityColFuncCall    [ collectionNavigation ]
//                      / boundEntityFuncCall       [ singleNavigation ]
//                      / boundComplexColFuncCall   [ "/" qualifiedComplexTypeName ] [ collectionPath ]
//                      / boundComplexFuncCall      [ complexPath ]
//                      / boundPrimitiveColFuncCall [ collectionPath ]
//                      / boundPrimitiveFuncCall    [ singlePath ]
//                      )
// 
// actionImportCall = actionImport
// boundActionCall  = namespace "." action
//                    ; with the added restriction that the binding parameter MUST be either an entity or collection of entities
//                    ; and is specified by reference using the URI immediately preceding (to the left) of the boundActionCall
// 
// ; The following boundXxxFuncCall rules have the added restrictions that
// ;  - the function MUST support binding, and
// ;  - the binding parameter type MUST match the type of resource identified by the
// ;    URI immediately preceding (to the left) of the boundXxxFuncCall, and
// ;  - the functionParameters MUST NOT include the bindingParameter.
// boundEntityFuncCall       = namespace "." entityFunction       functionParameters
// boundEntityColFuncCall    = namespace "." entityColFunction    functionParameters
// boundComplexFuncCall      = namespace "." complexFunction      functionParameters
// boundComplexColFuncCall   = namespace "." complexColFunction   functionParameters
// boundPrimitiveFuncCall    = namespace "." primitiveFunction    functionParameters
// boundPrimitiveColFuncCall = namespace "." primitiveColFunction functionParameters
// 
// entityFunctionImportCall       = entityFunctionImport       functionParameters
// entityColFunctionImportCall    = entityColFunctionImport    functionParameters
// complexFunctionImportCall      = complexFunctionImport      functionParameters
// complexColFunctionImportCall   = complexColFunctionImport   functionParameters
// primitiveFunctionImportCall    = primitiveFunctionImport    functionParameters
// primitiveColFunctionImportCall = primitiveColFunctionImport functionParameters
// 
// functionParameters = OPEN [ functionParameter *( COMMA functionParameter ) ] CLOSE
// functionParameter  = parameterName EQ ( parameterAlias / primitiveLiteral )
// parameterName      = odataIdentifier
// parameterAlias     = AT odataIdentifier
// 
// crossjoin = '$crossjoin' OPEN
//             entitySetName *( COMMA entitySetName )
//             CLOSE
// 
// 
// ;------------------------------------------------------------------------------
// ; 2. Query Options
// ;------------------------------------------------------------------------------
// 
// queryOptions = queryOption *( "&" queryOption )
// queryOption  = systemQueryOption
//              / aliasAndValue
//              / customQueryOption
// 
// entityOptions  = *( entityIdOption "&" ) id *( "&" entityIdOption )
// entityIdOption = format
//                / customQueryOption
// entityCastOptions = *( entityCastOption "&" ) id *( "&" entityCastOption )
// entityCastOption  = entityIdOption
//                   / expand
//                   / select
// 
// id = '$id' EQ IRI-in-query
// 
// systemQueryOption = expand
//                   / filter
//                   / format
//                   / id
//                   / inlinecount
//                   / orderby
//                   / search
//                   / select
//                   / skip
//                   / skiptoken
//                   / top
// 
// expand            = '$expand' EQ expandItem *( COMMA expandItem )
// expandItem        = STAR [ ref / OPEN levels CLOSE ]
//                   / expandPath
//                     [ ref   [ OPEN expandRefOption   *( SEMI expandRefOption   ) CLOSE ]
//                     / count [ OPEN expandCountOption *( SEMI expandCountOption ) CLOSE ]
//                     /         OPEN expandOption      *( SEMI expandOption      ) CLOSE
//                     ]
// expandPath        = [ ( qualifiedEntityTypeName / qualifiedComplexTypeName ) "/" ]
//                     *( ( complexProperty / complexColProperty ) "/" [ qualifiedComplexTypeName "/" ] )
//                     navigationProperty
//                     [ "/" qualifiedEntityTypeName ]
// expandCountOption = filter
//                   / search
// expandRefOption   = expandCountOption
//                   / orderby
//                   / skip
//                   / top
//                   / inlinecount
// expandOption      = expandRefOption
//                   / select
//                   / expand
//                   / levels
// 
// levels = '$levels' EQ ( oneToNine *DIGIT / 'max' )
// 
// filter = '$filter' EQ boolCommonExpr
// 
// orderby     = '$orderby' EQ orderbyItem *( COMMA orderbyItem )
// orderbyItem = commonExpr [ RWS ( 'asc' / 'desc' ) ]
// 
// skip = '$skip' EQ 1*DIGIT
// top  = '$top'  EQ 1*DIGIT
// 
// format = '$format' EQ
//          ( "atom"
//          / "json"
//          / "xml"
//          / 1*pchar "/" 1*pchar ; <a data service specific value indicating a
//          )                     ; format specific to the specific data service> or
//                                ; <An IANA-defined [IANA-MMT] content type>
// 
// inlinecount = '$count' EQ booleanValue
// 
// search     = '$search' EQ BWS searchExpr
// searchExpr = ( OPEN BWS searchExpr BWS CLOSE
//              / searchTerm
//              ) [ searchOrExpr
//                / searchAndExpr
//                ]
// 
// searchOrExpr  = RWS 'OR'  RWS searchExpr
// searchAndExpr = RWS [ 'AND' RWS ] searchExpr
// 
// searchTerm   = [ 'NOT' RWS ] ( searchPhrase / searchWord )
// searchPhrase = quotation-mark 1*qchar-no-AMP-DQUOTE quotation-mark
// searchWord   = 1*ALPHA ; Actually: any character from the Unicode categories L or Nl,
//                        ; but not the words AND, OR, and NOT
// 
// select         = '$select' EQ selectItem *( COMMA selectItem )
// selectItem     = STAR
//                / allOperationsInSchema
//                / [ ( qualifiedEntityTypeName / qualifiedComplexTypeName ) "/" ]
//                  ( selectProperty
//                  / qualifiedActionName
//                  / qualifiedFunctionName
//                  )
// selectProperty = primitiveProperty
//                / primitiveColProperty
//                / navigationProperty
//                / selectPath [ "/" selectProperty ]
// selectPath     = ( complexProperty / complexColProperty ) [ "/" qualifiedComplexTypeName ]
// 
// 
// allOperationsInSchema = namespace "." STAR
// 
// ; The parameterNames uniquely identify the bound function overload
// ; only if it has overloads.
// qualifiedActionName   = namespace "." action
// qualifiedFunctionName = namespace "." function [ OPEN parameterNames CLOSE ]
// 
// ; The names of all non-binding parameters, separated by commas
// parameterNames = parameterName *( COMMA parameterName )
// 
// skiptoken = '$skiptoken' EQ 1*( qchar-no-AMP )
// 
// aliasAndValue = parameterAlias EQ parameterValue
// 
// parameterValue = arrayOrObject
//                / commonExpr
// 
// customQueryOption = customName [ EQ customValue ]
// customName        = qchar-no-AMP-EQ-AT-DOLLAR *( qchar-no-AMP-EQ )
// customValue       = *( qchar-no-AMP )
// 
// 
// ;------------------------------------------------------------------------------
// ; 3. Context URL Fragments
// ;------------------------------------------------------------------------------
// 
// context         = "#" contextFragment
// contextFragment = 'Collection($ref)'
//                 / '$ref'
//                 / 'Collection(Edm.EntityType)'
//                 / 'Collection(Edm.ComplexType)'
//                 / singletonEntity [ navigation *( containmentNavigation ) [ "/" qualifiedEntityTypeName ] ] [ selectList ]
//                 / qualifiedTypeName [ selectList ]
//                 / entitySet ( '/$deletedEntity' / '/$link' / '/$deletedLink' )
//                 / entitySet keyPredicate "/" contextPropertyPath [ selectList ]
//                 / entitySet [ selectList ] [ '/$entity' / '/$delta' ]
// 
// entitySet = entitySetName *( containmentNavigation ) [ "/" qualifiedEntityTypeName ]
// 
// containmentNavigation = keyPredicate [ "/" qualifiedEntityTypeName ] navigation
// navigation            = *( "/" complexProperty [ "/" qualifiedComplexTypeName ] ) "/" navigationProperty
// 
// selectList         = OPEN selectListItem *( COMMA selectListItem ) CLOSE
// selectListItem     = STAR ; all structural properties
//                    / allOperationsInSchema
//                    / [ qualifiedEntityTypeName "/" ]
//                      ( qualifiedActionName
//                      / qualifiedFunctionName
//                      / selectListProperty
//                      )
// selectListProperty = primitiveProperty
//                    / primitiveColProperty
//                    / navigationProperty [ '+' ] [ selectList ]
//                    / selectPath [ "/" selectListProperty ]
// 
// contextPropertyPath = primitiveProperty
//                     / primitiveColProperty
//                     / complexColProperty
//                     / complexProperty [ [ "/" qualifiedComplexTypeName ] "/" contextPropertyPath ]
// 
// 
// ;------------------------------------------------------------------------------
// ; 4. Expressions
// ;------------------------------------------------------------------------------
// 
// ; Note: a boolCommonExpr is also a commonExpr, e.g. sort by Boolean
// commonExpr = ( primitiveLiteral
//              / parameterAlias
//              / arrayOrObject
//              / rootExpr
//              / firstMemberExpr
//              / functionExpr
//              / negateExpr
//              / methodCallExpr
//              / parenExpr
//              / castExpr
//              )
//              [ addExpr
//              / subExpr
//              / mulExpr
//              / divExpr
//              / modExpr
//              ]
// 
// boolCommonExpr = ( isofExpr
//                  / boolMethodCallExpr
//                  / notExpr
//                  / commonExpr
//                    [ eqExpr
//                    / neExpr
//                    / ltExpr
//                    / leExpr
//                    / gtExpr
//                    / geExpr
//                    / hasExpr
//                    ]
//                  / boolParenExpr
//                  ) [ andExpr / orExpr ]
// 
// rootExpr = '$root/' ( entitySetName keyPredicate / singletonEntity ) [ singleNavigationExpr ]
// 
// firstMemberExpr = memberExpr
//                 / inscopeVariableExpr [ "/" memberExpr ]
// 
// memberExpr = [ qualifiedEntityTypeName "/" ]
//              ( propertyPathExpr
//              / boundFunctionExpr
//              )
// 
// propertyPathExpr = ( entityColNavigationProperty [ collectionNavigationExpr ]
//                    / entityNavigationProperty    [ singleNavigationExpr ]
//                    / complexColProperty          [ collectionPathExpr ]
//                    / complexProperty             [ complexPathExpr ]
//                    / primitiveColProperty        [ collectionPathExpr ]
//                    / primitiveProperty           [ singlePathExpr ]
//                    / streamProperty              [ singlePathExpr ]
//                    )
// 
// inscopeVariableExpr       = implicitVariableExpr
//                           / lambdaVariableExpr ; only allowed inside a lambdaPredicateExpr
// implicitVariableExpr      = '$it'              ; references the unnamed outer variable of the query
// lambdaVariableExpr        = odataIdentifier
// 
// collectionNavigationExpr = [ "/" qualifiedEntityTypeName ]
//                            ( keyPredicate [ singleNavigationExpr ]
//                            / collectionPathExpr
//                            )
// 
// singleNavigationExpr = "/" memberExpr
// 
// collectionPathExpr = count
//                    / "/" boundFunctionExpr
//                    / "/" anyExpr
//                    / "/" allExpr
// 
// complexPathExpr = "/" [ qualifiedComplexTypeName "/" ]
//                   ( propertyPathExpr
//                   / boundFunctionExpr
//                   )
// 
// singlePathExpr = "/" boundFunctionExpr
// 
// boundFunctionExpr = functionExpr ; boundFunction segments can only be composed if the type of the
//                                  ; previous segment matches the type of the first function parameter
// 
// functionExpr = namespace "."
//                ( entityColFunction    functionExprParameters [ collectionNavigationExpr ]
//                / entityFunction       functionExprParameters [ singleNavigationExpr ]
//                / complexColFunction   functionExprParameters [ collectionPathExpr ]
//                / complexFunction      functionExprParameters [ complexPathExpr ]
//                / primitiveColFunction functionExprParameters [ collectionPathExpr ]
//                / primitiveFunction    functionExprParameters [ singlePathExpr ]
//                )
// 
// functionExprParameters = OPEN [ functionExprParameter *( COMMA functionExprParameter ) ] CLOSE
// functionExprParameter  = parameterName EQ ( parameterAlias / parameterValue )
// 
// anyExpr = 'any' OPEN BWS [ lambdaVariableExpr BWS COLON BWS lambdaPredicateExpr ] BWS CLOSE
// allExpr = 'all' OPEN BWS   lambdaVariableExpr BWS COLON BWS lambdaPredicateExpr   BWS CLOSE
// lambdaPredicateExpr = boolCommonExpr ; containing at least one lambdaVariableExpr
// 
// methodCallExpr = indexOfMethodCallExpr
//                / toLowerMethodCallExpr
//                / toUpperMethodCallExpr
//                / trimMethodCallExpr
//                / substringMethodCallExpr
//                / concatMethodCallExpr
//                / lengthMethodCallExpr
//                / yearMethodCallExpr
//                / monthMethodCallExpr
//                / dayMethodCallExpr
//                / hourMethodCallExpr
//                / minuteMethodCallExpr
//                / secondMethodCallExpr
//                / fractionalsecondsMethodCallExpr
//                / totalsecondsMethodCallExpr
//                / dateMethodCallExpr
//                / timeMethodCallExpr
//                / roundMethodCallExpr
//                / floorMethodCallExpr
//                / ceilingMethodCallExpr
//                / distanceMethodCallExpr
//                / geoLengthMethodCallExpr
//                / totalOffsetMinutesMethodCallExpr
//                / minDateTimeMethodCallExpr
//                / maxDateTimeMethodCallExpr
//                / nowMethodCallExpr
// 
// boolMethodCallExpr = endsWithMethodCallExpr
//                    / startsWithMethodCallExpr
//                    / containsMethodCallExpr
//                    / intersectsMethodCallExpr
// 
// containsMethodCallExpr   = 'contains'   OPEN BWS commonExpr BWS COMMA BWS commonExpr BWS CLOSE
// startsWithMethodCallExpr = 'startswith' OPEN BWS commonExpr BWS COMMA BWS commonExpr BWS CLOSE
// endsWithMethodCallExpr   = 'endswith'   OPEN BWS commonExpr BWS COMMA BWS commonExpr BWS CLOSE
// lengthMethodCallExpr     = 'length'     OPEN BWS commonExpr BWS CLOSE
// indexOfMethodCallExpr    = 'indexof'    OPEN BWS commonExpr BWS COMMA BWS commonExpr BWS CLOSE
// substringMethodCallExpr  = 'substring'  OPEN BWS commonExpr BWS COMMA BWS commonExpr BWS [ COMMA BWS commonExpr BWS ] CLOSE
// toLowerMethodCallExpr    = 'tolower'    OPEN BWS commonExpr BWS CLOSE
// toUpperMethodCallExpr    = 'toupper'    OPEN BWS commonExpr BWS CLOSE
// trimMethodCallExpr       = 'trim'       OPEN BWS commonExpr BWS CLOSE
// concatMethodCallExpr     = 'concat'     OPEN BWS commonExpr BWS COMMA BWS commonExpr BWS CLOSE
// 
// yearMethodCallExpr               = 'year'               OPEN BWS commonExpr BWS CLOSE
// monthMethodCallExpr              = 'month'              OPEN BWS commonExpr BWS CLOSE
// dayMethodCallExpr                = 'day'                OPEN BWS commonExpr BWS CLOSE
// hourMethodCallExpr               = 'hour'               OPEN BWS commonExpr BWS CLOSE
// minuteMethodCallExpr             = 'minute'             OPEN BWS commonExpr BWS CLOSE
// secondMethodCallExpr             = 'second'             OPEN BWS commonExpr BWS CLOSE
// fractionalsecondsMethodCallExpr  = 'fractionalseconds'  OPEN BWS commonExpr BWS CLOSE
// totalsecondsMethodCallExpr       = 'totalseconds'       OPEN BWS commonExpr BWS CLOSE
// dateMethodCallExpr               = 'date'               OPEN BWS commonExpr BWS CLOSE
// timeMethodCallExpr               = 'time'               OPEN BWS commonExpr BWS CLOSE
// totalOffsetMinutesMethodCallExpr = 'totaloffsetminutes' OPEN BWS commonExpr BWS CLOSE
// 
// minDateTimeMethodCallExpr = 'mindatetime(' BWS ')'
// maxDateTimeMethodCallExpr = 'maxdatetime(' BWS ')'
// nowMethodCallExpr         = 'now(' BWS ')'
// 
// roundMethodCallExpr   = 'round'   OPEN BWS commonExpr BWS CLOSE
// floorMethodCallExpr   = 'floor'   OPEN BWS commonExpr BWS CLOSE
// ceilingMethodCallExpr = 'ceiling' OPEN BWS commonExpr BWS CLOSE
// 
// distanceMethodCallExpr   = 'geo.distance'   OPEN BWS commonExpr BWS COMMA BWS commonExpr BWS CLOSE
// geoLengthMethodCallExpr  = 'geo.length'     OPEN BWS commonExpr BWS CLOSE
// intersectsMethodCallExpr = 'geo.intersects' OPEN BWS commonExpr BWS COMMA BWS commonExpr BWS CLOSE
// 
// boolParenExpr = OPEN BWS boolCommonExpr BWS CLOSE
// parenExpr     = OPEN BWS commonExpr     BWS CLOSE
// 
// andExpr = RWS 'and' RWS boolCommonExpr
// orExpr  = RWS 'or'  RWS boolCommonExpr
// 
// eqExpr = RWS 'eq' RWS commonExpr
// neExpr = RWS 'ne' RWS commonExpr
// ltExpr = RWS 'lt' RWS commonExpr
// leExpr = RWS 'le' RWS commonExpr
// gtExpr = RWS 'gt' RWS commonExpr
// geExpr = RWS 'ge' RWS commonExpr
// 
// hasExpr = RWS 'has' RWS enum
// 
// addExpr = RWS 'add' RWS commonExpr
// subExpr = RWS 'sub' RWS commonExpr
// mulExpr = RWS 'mul' RWS commonExpr
// divExpr = RWS 'div' RWS commonExpr
// modExpr = RWS 'mod' RWS commonExpr
// 
// negateExpr = "-" BWS commonExpr
// 
// notExpr = 'not' RWS boolCommonExpr
// 
// isofExpr = 'isof' OPEN BWS [ commonExpr BWS COMMA BWS ] qualifiedTypeName BWS CLOSE
// castExpr = 'cast' OPEN BWS [ commonExpr BWS COMMA BWS ] qualifiedTypeName BWS CLOSE
// 
// 
// ;------------------------------------------------------------------------------
// ; 5. JSON format for function parameters
// ;------------------------------------------------------------------------------
// ; Note: the query part of a URI needs to be partially percent-decoded before
// ; applying these rules, see comment at the top of this file
// ;------------------------------------------------------------------------------
// 
// arrayOrObject = complexColInUri
//               / complexInUri
//               / rootExprCol
//               / primitiveColInUri
// 
// complexColInUri = begin-array
//                   [ complexInUri *( value-separator complexInUri ) ]
//                   end-array
// 
// complexInUri = begin-object
//                [ ( annotationInUri
//                  / primitivePropertyInUri
//                  / complexPropertyInUri
//                  / collectionPropertyInUri
//                  / navigationPropertyInUri
//                  )
//                  *( value-separator
//                     ( annotationInUri
//                     / primitivePropertyInUri
//                     / complexPropertyInUri
//                     / collectionPropertyInUri
//                     / navigationPropertyInUri
//                     )
//                   )
//                ]
//                end-object
// 
// collectionPropertyInUri = ( quotation-mark primitiveColProperty quotation-mark
//                             name-separator
//                             primitiveColInUri
//                           )
//                         / ( quotation-mark complexColProperty quotation-mark
//                             name-separator
//                             complexColInUri
//                           )
// 
// primitiveColInUri = begin-array
//                     [ primitiveLiteralInJSON *( value-separator primitiveLiteralInJSON ) ]
//                     end-array
// 
// complexPropertyInUri = quotation-mark complexProperty quotation-mark
//                        name-separator
//                        complexInUri
// 
// annotationInUri = quotation-mark AT namespace "." termName quotation-mark
//                   name-separator
//                   ( complexInUri / complexColInUri / primitiveLiteralInJSON / primitiveColInUri )
// 
// primitivePropertyInUri = quotation-mark primitiveProperty quotation-mark
//                          name-separator
//                          primitiveLiteralInJSON
// 
// navigationPropertyInUri = singleNavPropInJSON
//                         / collectionNavPropInJSON
// singleNavPropInJSON     = quotation-mark entityNavigationProperty quotation-mark
// 													name-separator
// 													rootExpr
// collectionNavPropInJSON = quotation-mark entityColNavigationProperty quotation-mark
// 													name-separator
// 													rootExprCol
// 
// rootExprCol = begin-array
//               [ rootExpr *( value-separator rootExpr ) ]
//               end-array
// 
// ; JSON syntax: adapted to URI restrictions from [RFC4627]
// begin-object = BWS ( "{" / "%7B" ) BWS
// end-object   = BWS ( "}" / "%7D" ) BWS
// 
// begin-array = BWS ( "[" / "%5B" ) BWS
// end-array   = BWS ( "]" / "%5D" ) BWS
// 
// quotation-mark  = DQUOTE / "%22"
// name-separator  = BWS COLON BWS
// value-separator = BWS COMMA BWS
// 
// primitiveLiteralInJSON = stringInJSON
//                        / numberInJSON
//                        / 'true'
//                        / 'false'
//                        / 'null'
// 
// stringInJSON = quotation-mark *charInJSON quotation-mark
// charInJSON   = qchar-unescaped
//              / qchar-JSON-special
//              / escape ( quotation-mark
//                       / escape
//                       / ( "/" / "%2F" ) ; solidus         U+002F - literal form is allowed in the query part of a URL
//                       / 'b'             ; backspace       U+0008
//                       / 'f'             ; form feed       U+000C
//                       / 'n'             ; line feed       U+000A
//                       / 'r'             ; carriage return U+000D
//                       / 't'             ; tab             U+0009
//                       / 'u' 4HEXDIG     ;                 U+XXXX
//                       )
// 
// qchar-JSON-special = SP / ":" / "{" / "}" / "[" / "]" ; some agents put these unencoded into the query part of a URL
// 
// escape = "\" / "%5C"     ; reverse solidus U+005C
// 
// numberInJSON = [ "-" ] int [ frac ] [ exp ]
// int          = "0" / ( oneToNine *DIGIT )
// frac         = "." 1*DIGIT
// exp          = "e" [ "-" / "+" ] 1*DIGIT
// 
// 
// ;------------------------------------------------------------------------------
// ; 6. Names and identifiers
// ;------------------------------------------------------------------------------
// 
// singleQualifiedTypeName = qualifiedEntityTypeName
//                         / qualifiedComplexTypeName
//                         / qualifiedTypeDefinitionName
//                         / qualifiedEnumTypeName
//                         / primitiveTypeName
// 
// qualifiedTypeName = singleQualifiedTypeName
//                   / 'Collection' OPEN singleQualifiedTypeName CLOSE
// 
// qualifiedEntityTypeName     = namespace "." entityTypeName
// qualifiedComplexTypeName    = namespace "." complexTypeName
// qualifiedTypeDefinitionName = namespace "." typeDefinitionName
// qualifiedEnumTypeName       = namespace "." enumerationTypeName
// 
// ; an alias is just a single-part namespace
// namespace     = namespacePart *( "." namespacePart )
// namespacePart = odataIdentifier
// 
// entitySetName       = odataIdentifier
// singletonEntity     = odataIdentifier
// entityTypeName      = odataIdentifier
// complexTypeName     = odataIdentifier
// typeDefinitionName  = odataIdentifier
// enumerationTypeName = odataIdentifier
// enumerationMember   = odataIdentifier
// termName            = odataIdentifier
// 
// ; Note: this pattern is overly restrictive, the normative definition is type TSimpleIdentifier in OData EDM XML Schema
// odataIdentifier             = identifierLeadingCharacter *127identifierCharacter
// identifierLeadingCharacter  = ALPHA / "_"         ; plus Unicode characters from the categories L or Nl
// identifierCharacter         = ALPHA / "_" / DIGIT ; plus Unicode characters from the categories L, Nl, Nd, Mn, Mc, Pc, or Cf
// 
// primitiveTypeName = 'Edm.' ( 'Binary'
//                            / 'Boolean'
//                            / 'Byte'
//                            / 'Date'
//                            / 'DateTimeOffset'
//                            / 'Decimal'
//                            / 'Double'
//                            / 'Duration'
//                            / 'Guid'
//                            / 'Int16'
//                            / 'Int32'
//                            / 'Int64'
//                            / 'SByte'
//                            / 'Single'
//                            / 'Stream'
//                            / 'String'
//                            / 'TimeOfDay'
//                            / abstractSpatialTypeName [ concreteSpatialTypeName ]
//                            )
// abstractSpatialTypeName = 'Geography'
//                         / 'Geometry'
// concreteSpatialTypeName = 'Collection'
//                         / 'LineString'
//                         / 'MultiLineString'
//                         / 'MultiPoint'
//                         / 'MultiPolygon'
//                         / 'Point'
//                         / 'Polygon'
// 
// primitiveProperty       = primitiveKeyProperty / primitiveNonKeyProperty
// primitiveKeyProperty    = odataIdentifier
// primitiveNonKeyProperty = odataIdentifier
// primitiveColProperty    = odataIdentifier
// complexProperty         = odataIdentifier
// complexColProperty      = odataIdentifier
// streamProperty          = odataIdentifier
// 
// navigationProperty          = entityNavigationProperty / entityColNavigationProperty
// entityNavigationProperty    = odataIdentifier
// entityColNavigationProperty = odataIdentifier
// 
// action       = odataIdentifier
// actionImport = odataIdentifier
// 
// function = entityFunction
//          / entityColFunction
//          / complexFunction
//          / complexColFunction
//          / primitiveFunction
//          / primitiveColFunction
// 
// entityFunction       = odataIdentifier
// entityColFunction    = odataIdentifier
// complexFunction      = odataIdentifier
// complexColFunction   = odataIdentifier
// primitiveFunction    = odataIdentifier
// primitiveColFunction = odataIdentifier
// 
// entityFunctionImport       = odataIdentifier
// entityColFunctionImport    = odataIdentifier
// complexFunctionImport      = odataIdentifier
// complexColFunctionImport   = odataIdentifier
// primitiveFunctionImport    = odataIdentifier
// primitiveColFunctionImport = odataIdentifier
// 
// 
// ;------------------------------------------------------------------------------
// ; 7. Literal Data Values
// ;------------------------------------------------------------------------------
// 
// ; in URLs
// primitiveLiteral = nullValue                  ; plain values up to int64Value
//                  / booleanValue
//                  / guidValue
//                  / dateValue
//                  / dateTimeOffsetValue
//                  / timeOfDayValue
//                  / decimalValue
//                  / doubleValue
//                  / singleValue
//                  / sbyteValue
//                  / byteValue
//                  / int16Value
//                  / int32Value
//                  / int64Value
//                  / string                     ; single-quoted
//                  / duration                   ; all others are quoted and prefixed
//                  / binary
//                  / enum
//                  / geographyCollection
//                  / geographyLineString
//                  / geographyMultiLineString
//                  / geographyMultiPoint
//                  / geographyMultiPolygon
//                  / geographyPoint
//                  / geographyPolygon
//                  / geometryCollection
//                  / geometryLineString
//                  / geometryMultiLineString
//                  / geometryMultiPoint
//                  / geometryMultiPolygon
//                  / geometryPoint
//                  / geometryPolygon
// 
// ; in Atom and JSON message bodies and CSDL DefaultValue attributes
// primitiveValue = booleanValue
//                / guidValue
//                / durationValue
//                / dateValue
//                / dateTimeOffsetValue
//                / timeOfDayValue
//                / enumValue
//                / fullCollectionLiteral
//                / fullLineStringLiteral
//                / fullMultiPointLiteral
//                / fullMultiLineStringLiteral
//                / fullMultiPolygonLiteral
//                / fullPointLiteral
//                / fullPolygonLiteral
//                / decimalValue
//                / doubleValue
//                / singleValue
//                / sbyteValue
//                / byteValue
//                / int16Value
//                / int32Value
//                / int64Value
//                / binaryValue
//                ; also valid are:
//                ; - any XML string for strings in Atom and CSDL documents
//                ; - any JSON string for JSON documents
// 
// nullValue = 'null'
// 
// ; base64url encoding according to http://tools.ietf.org/html/rfc4648#section-5
// binary      = "binary" SQUOTE binaryValue SQUOTE
// binaryValue = *(4base64char) [ base64b16  / base64b8 ]
// base64b16   = 2base64char ( 'A' / 'E' / 'I' / 'M' / 'Q' / 'U' / 'Y' / 'c' / 'g' / 'k' / 'o' / 's' / 'w' / '0' / '4' / '8' )   [ "=" ]
// base64b8    = base64char ( 'A' / 'Q' / 'g' / 'w' ) [ "==" ]
// base64char  = ALPHA / DIGIT / "-" / "_"
// 
// booleanValue = "true" / "false"
// 
// decimalValue = [SIGN] 1*DIGIT ["." 1*DIGIT]
// 
// doubleValue = decimalValue [ "e" [SIGN] 1*DIGIT ] / nanInfinity ; IEEE 754 binary64 floating-point number (15-17 decimal digits)
// singleValue = doubleValue                                       ; IEEE 754 binary32 floating-point number (6-9 decimal digits)
// nanInfinity = 'NaN' / '-INF' / 'INF'
// 
// guidValue = 8HEXDIG "-" 4HEXDIG "-" 4HEXDIG "-" 4HEXDIG "-" 12HEXDIG
// 
// byteValue  = 1*3DIGIT           ; numbers in the range from 0 to 255
// sbyteValue = [ sign ] 1*3DIGIT  ; numbers in the range from -128 to 127
// int16Value = [ sign ] 1*5DIGIT  ; numbers in the range from -32768 to 32767
// int32Value = [ sign ] 1*10DIGIT ; numbers in the range from -2147483648 to 2147483647
// int64Value = [ sign ] 1*19DIGIT ; numbers in the range from -9223372036854775808 to 9223372036854775807
// 
// string           = SQUOTE *( SQUOTE-in-string / pchar-no-SQUOTE ) SQUOTE
// SQUOTE-in-string = SQUOTE SQUOTE ; two consecutive single quotes represent one within a string literal
// 
// dateValue = year "-" month "-" day
// 
// dateTimeOffsetValue = year "-" month "-" day "T" hour ":" minute [ ":" second [ "." fractionalSeconds ] ] ( "Z" / sign hour ":" minute )
// 
// duration      = "duration" SQUOTE durationValue SQUOTE
// durationValue = [ sign ] "P" [ 1*DIGIT "D" ] [ "T" [ 1*DIGIT "H" ] [ 1*DIGIT "M" ] [ 1*DIGIT [ "." 1*DIGIT ] "S" ] ]
//      ; the above is an approximation of the rules for an xml dayTimeDuration.
//      ; see the lexical representation for dayTimeDuration in http://www.w3.org/TR/xmlschema11-2#dayTimeDuration for more information
// 
// timeOfDayValue = hour ":" minute [ ":" second [ "." fractionalSeconds ] ]
// 
// oneToNine       = "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9"
// zeroToFiftyNine = ( "0" / "1" / "2" / "3" / "4" / "5" ) DIGIT
// year  = [ "-" ] ( "0" 3DIGIT / oneToNine 3*DIGIT )
// month = "0" oneToNine
//       / "1" ( "0" / "1" / "2" )
// day   = "0" oneToNine
//       / ( "1" / "2" ) DIGIT
//       / "3" ( "0" / "1" )
// hour   = ( "0" / "1" ) DIGIT
//        / "2" ( "0" / "1" / "2" / "3" )
// minute = zeroToFiftyNine
// second = zeroToFiftyNine
// fractionalSeconds = 1*12DIGIT
// 
// enum            = qualifiedEnumTypeName SQUOTE enumValue SQUOTE
// enumValue       = singleEnumValue *( COMMA singleEnumValue )
// singleEnumValue = enumerationMember / enumMemberValue
// enumMemberValue = int64Value
// 
// geographyCollection   = geographyPrefix SQUOTE fullCollectionLiteral SQUOTE
// fullCollectionLiteral = sridLiteral collectionLiteral
// collectionLiteral     = "Collection(" geoLiteral *( COMMA geoLiteral ) CLOSE
// geoLiteral            = collectionLiteral
//                       / lineStringLiteral
//                       / multiPointLiteral
//                       / multiLineStringLiteral
//                       / multiPolygonLiteral
//                       / pointLiteral
//                       / polygonLiteral
// 
// geographyLineString   = geographyPrefix SQUOTE fullLineStringLiteral SQUOTE
// fullLineStringLiteral = sridLiteral lineStringLiteral
// lineStringLiteral     = "LineString" lineStringData
// lineStringData        = OPEN positionLiteral 1*( COMMA positionLiteral ) CLOSE
// 
// geographyMultiLineString   = geographyPrefix SQUOTE fullMultiLineStringLiteral SQUOTE
// fullMultiLineStringLiteral = sridLiteral multiLineStringLiteral
// multiLineStringLiteral     = "MultiLineString(" [ lineStringData *( COMMA lineStringData ) ] CLOSE
// 
// geographyMultiPoint   = geographyPrefix SQUOTE fullMultiPointLiteral SQUOTE
// fullMultiPointLiteral = sridLiteral multiPointLiteral
// multiPointLiteral     = "MultiPoint(" [ pointData *( COMMA pointData ) ] CLOSE
// 
// geographyMultiPolygon   = geographyPrefix SQUOTE fullMultiPolygonLiteral SQUOTE
// fullMultiPolygonLiteral = sridLiteral multiPolygonLiteral
// multiPolygonLiteral     = "MultiPolygon(" [ polygonData *( COMMA polygonData ) ] CLOSE
// 
// geographyPoint   = geographyPrefix SQUOTE fullPointLiteral SQUOTE
// fullPointLiteral = sridLiteral pointLiteral
// sridLiteral      = "SRID" EQ 1*5DIGIT SEMI
// pointLiteral     ="Point" pointData
// pointData        = OPEN positionLiteral CLOSE
// positionLiteral  = doubleValue SP doubleValue  ; longitude, then latitude
// 
// geographyPolygon   = geographyPrefix SQUOTE fullPolygonLiteral SQUOTE
// fullPolygonLiteral = sridLiteral polygonLiteral
// polygonLiteral     = "Polygon" polygonData
// polygonData        = OPEN ringLiteral *( COMMA ringLiteral ) CLOSE
// ringLiteral        = OPEN positionLiteral *( COMMA positionLiteral ) CLOSE
//                    ; Within each ringLiteral, the first and last positionLiteral elements MUST be an exact syntactic match to each other.
//                    ; Within the polygonData, the ringLiterals MUST specify their points in appropriate winding order.
//                    ; In order of traversal, points to the left side of the ring are interpreted as being in the polygon.
// 
// geometryCollection      = geometryPrefix SQUOTE fullCollectionLiteral      SQUOTE
// geometryLineString      = geometryPrefix SQUOTE fullLineStringLiteral      SQUOTE
// geometryMultiLineString = geometryPrefix SQUOTE fullMultiLineStringLiteral SQUOTE
// geometryMultiPoint      = geometryPrefix SQUOTE fullMultiPointLiteral      SQUOTE
// geometryMultiPolygon    = geometryPrefix SQUOTE fullMultiPolygonLiteral    SQUOTE
// geometryPoint           = geometryPrefix SQUOTE fullPointLiteral           SQUOTE
// geometryPolygon         = geometryPrefix SQUOTE fullPolygonLiteral         SQUOTE
// 
// geographyPrefix = "geography"
// geometryPrefix  = "geometry"
// 
// 
// ;------------------------------------------------------------------------------
// ; 8. Header values
// ;------------------------------------------------------------------------------
// 
// header = content-id
//        / odata-entityid
//        / odata-isolation
//        / odata-maxversion
//        / odata-version
//        / prefer
// 
// content-id = "Content-ID" ":" OWS 1*unreserved
// 
// odata-entityid   = "OData-EntityID"   ":" OWS IRI-in-header
// odata-isolation  = "OData-Isolation"  ":" OWS "snapshot"
// odata-maxversion = "OData-MaxVersion" ":" OWS 1*DIGIT "." 1*DIGIT
// odata-version    = "OData-Version"    ":" OWS "4.0"
// 
// prefer     = "Prefer" ":" OWS preference *( COMMA preference )
// preference = allowEntityReferencesPreference
//            / callbackPreference
//            / continueOnErrorPreference
//            / includeAnnotationsPreference
//            / maxpagesizePreference
//            / respondAsyncPreference
//            / returnPreference
//            / trackChangesPreference
//            / waitPreference
//            ; and everything allowed by http://tools.ietf.org/html/draft-snell-http-prefer-18
//            ; / token [ EQ-h word ] *( OWS ";" [ OWS parameter ] )
// 
// allowEntityReferencesPreference = "odata.allow-entityreferences"
// 
// callbackPreference = "odata.callback" OWS ";" OWS "url" EQ-h DQUOTE URI DQUOTE
// 
// continueOnErrorPreference = "odata.continue-on-error"
// 
// includeAnnotationsPreference = "odata.include-annotations" EQ-h DQUOTE annotationsList DQUOTE
// annotationsList      = annotationIdentifier *(COMMA annotationIdentifier)
// annotationIdentifier = [ excludeOperator ]
//                        ( STAR
//                        / namespace "." ( termName / STAR )
//                        )
// excludeOperator      = "-"
// 
// maxpagesizePreference = "odata.maxpagesize" EQ-h oneToNine *DIGIT
// 
// respondAsyncPreference = "respond-async"
// 
// returnPreference = "return" EQ-h ( 'representation' / 'minimal' )
// 
// trackChangesPreference = "odata.track-changes"
// 
// waitPreference = "wait" EQ-h 1*DIGIT
// 
// ;parameter      = token [ EQ-h word ]
// ;word           = token / quoted-string
// ;token          = 1*tchar
// ;tchar          = "!" / "#" / "$" / "%" / "&" / "'" / "*"
// ;               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
// ;               / DIGIT / ALPHA
// ;quoted-string  = DQUOTE *( qdtext / quoted-pair ) DQUOTE
// ;qdtext         = %x21 / %x23-5B / %x5D-7E / obs-text / OWS
// obs-text       = %x80-FF
// ;quoted-pair    = "\" ( HTAB / SP / VCHAR / obs-text )
// 
// OWS   = *( SP / HTAB )  ; "optional" whitespace
// BWS-h = *( SP / HTAB )  ; "bad" whitespace in header values
// EQ-h  = BWS-h EQ BWS-h
// 
// 
// ;------------------------------------------------------------------------------
// ; 9. Punctuation
// ;------------------------------------------------------------------------------
// 
// RWS = 1*( SP / HTAB / "%20" / "%09" )  ; "required" whitespace
// BWS =  *( SP / HTAB / "%20" / "%09" )  ; "bad" whitespace
// 
// AT     = "@" / "%40"
// COLON  = ":" / "%3A"
// COMMA  = "," / "%2C"
// EQ     = "="
// SIGN   = "+" / "%2B" / "-"
// SEMI   = ";" / "%3B"
// STAR   = "*" / "%2A"
// SQUOTE = "'" / "%27"
// 
// OPEN  = "(" / "%28"
// CLOSE = ")" / "%29"
// 
// 
// ;------------------------------------------------------------------------------
// ; A. URI syntax [RFC3986]
// ;------------------------------------------------------------------------------
// 
// URI           = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
// hier-part     = "//" authority path-abempty
//               / path-absolute
//               / path-rootless
// ;              / path-empty
// ;URI-reference = URI / relative-ref
// ;absolute-URI  = scheme ":" hier-part [ "?" query ]
// ;relative-ref  = relative-part [ "?" query ] [ "#" fragment ]
// ;relative-part = "//" authority path-abempty
// ;              / path-absolute
// ;              / path-noscheme
// ;              / path-empty
// scheme        = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
// authority     = [ userinfo "@" ] host [ ":" port ]
// userinfo      = *( unreserved / pct-encoded / sub-delims / ":" )
// host          = IP-literal / IPv4address / reg-name
// port          = *DIGIT
// IP-literal    = "[" ( IPv6address / IPvFuture  ) "]"
// IPvFuture     = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
// IPv6address   =                            6( h16 ":" ) ls32
//                  /                       "::" 5( h16 ":" ) ls32
//                  / [               h16 ] "::" 4( h16 ":" ) ls32
//                  / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
//                  / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
//                  / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
//                  / [ *4( h16 ":" ) h16 ] "::"              ls32
//                  / [ *5( h16 ":" ) h16 ] "::"              h16
//                  / [ *6( h16 ":" ) h16 ] "::"
// h16           = 1*4HEXDIG
// ls32          = ( h16 ":" h16 ) / IPv4address
// IPv4address   = dec-octet "." dec-octet "." dec-octet "." dec-octet
// dec-octet     = "1" 2DIGIT            ; 100-199
//               / "2" %x30-34 DIGIT     ; 200-249
//               / "25" %x30-35          ; 250-255
//               / %x31-39 DIGIT         ; 10-99
//               / DIGIT                 ; 0-9
// reg-name      = *( unreserved / pct-encoded / sub-delims )
// ;path          = path-abempty    ; begins with "/" or is empty
// ;              / path-absolute   ; begins with "/" but not "//"
// ;              / path-noscheme   ; begins with a non-colon segment
// ;              / path-rootless   ; begins with a segment
// ;              / path-empty      ; zero characters
// path-abempty  = *( "/" segment )
// path-absolute = "/" [ segment-nz *( "/" segment ) ]
// ;path-noscheme = segment-nz-nc *( "/" segment )
// path-rootless = segment-nz *( "/" segment )
// ;path-empty    = ""
// segment       = *pchar
// segment-nz    = 1*pchar
// ;segment-nz-nc = 1*( unreserved / pct-encoded / sub-delims / "@" ) ; non-zero-length segment without any colon ":"
// pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
// query         = *( pchar / "/" / "?" )
// fragment      = *( pchar / "/" / "?" )
// pct-encoded   = "%" HEXDIG HEXDIG
// unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
// ;reserved      = gen-delims / sub-delims
// ;gen-delims    = ":" / "/" / "?" / "#" / "[" / "]" / "@"
// ;sub-delims    = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
// sub-delims     =       "$" / "&" / "'" /                                     "=" / other-delims
// other-delims   = "!" /                   "(" / ")" / "*" / "+" / "," / ";"
// 
// pchar-no-SQUOTE       = unreserved / pct-encoded-no-SQUOTE / other-delims / "$" / "&" / "=" / ":" / "@"
// pct-encoded-no-SQUOTE = "%" ( "0" / "1" /   "3" / "4" / "5" / "6" / "8" / "9" / A-to-F ) HEXDIG
//                       / "%" "2" ( "0" / "1" / "2" / "3" / "4" / "5" / "6" /   "8" / "9" / A-to-F )
// 
// qchar-no-AMP              = unreserved / pct-encoded / other-delims / ":" / "@" / "/" / "?" / "$" / "'" / "="
// qchar-no-AMP-EQ           = unreserved / pct-encoded / other-delims / ":" / "@" / "/" / "?" / "$" / "'"
// qchar-no-AMP-EQ-AT-DOLLAR = unreserved / pct-encoded / other-delims / ":" /       "/" / "?" /       "'"
// 
// qchar-unescaped       = unreserved / pct-encoded-unescaped / other-delims / ":" / "@" / "/" / "?" / "$" / "'" / "="
// pct-encoded-unescaped = "%" ( "0" / "1" /   "3" / "4" /   "6" / "7" / "8" / "9" / A-to-F ) HEXDIG
//                       / "%" "2" ( "0" / "1" /   "3" / "4" / "5" / "6" / "7" / "8" / "9" / A-to-F )
//                       / "%" "5" ( DIGIT / "A" / "B" /   "D" / "E" / "F" )
// 
// qchar-no-AMP-DQUOTE   = qchar-unescaped
//                       / escape ( escape / quotation-mark )
// 
// 
// ;------------------------------------------------------------------------------
// ; B. IRI syntax [RFC3987]
// ;------------------------------------------------------------------------------
// ; Note: these are over-generous stubs, for the actual patterns refer to RFC3987
// ;------------------------------------------------------------------------------
// 
// IRI-in-header = 1*( VCHAR / obs-text )
// IRI-in-query  = 1*qchar-no-AMP
// 
// 
// ;------------------------------------------------------------------------------
// ; C. ABNF core definitions [RFC5234]
// ;------------------------------------------------------------------------------
// 
// ALPHA  = %x41-5A / %x61-7A
// DIGIT  = %x30-39
// HEXDIG = DIGIT / A-to-F
// A-to-F = "A" / "B" / "C" / "D" / "E" / "F"
// DQUOTE = %x22
// SP     = %x20
// HTAB   = %x09
// ;WSP    = SP / HTAB
// ;LWSP = *(WSP / CRLF WSP)
// VCHAR = %x21-7E
// ;CHAR = %x01-7F
// ;LOCTET = %x00-FF
// ;CR     = %x0D
// ;LF     = %x0A
// ;CRLF   = CR LF
// ;BIT = "0" / "1"
// 
// 
// ;------------------------------------------------------------------------------
// ; End of odata-abnf-construction-rules
// ;------------------------------------------------------------------------------
