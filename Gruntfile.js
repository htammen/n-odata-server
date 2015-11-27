module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// typescript configuration. transpiles all ts files to js files and initializes
		// a watcher so that every change to the ts files is automatically transpiled
		ts: {
			options: {
				module: 'commonjs',
				target: 'es5'
			},
			default : {
				src: ["**/*.ts", "!node_modules/**/*.ts"],
				watch: 'lib'
			}
		}
	});

	grunt.loadNpmTasks("grunt-ts");
	grunt.registerTask("default", ["ts"]);
};
