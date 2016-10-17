var odata = require('./lib/odata');

module.exports = function(loopbackApplication, options) {
	odata.init(loopbackApplication, options);
}
