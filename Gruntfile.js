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
			default: {
				src: ["**/*.ts", "!node_modules/**/*.ts", "!typescript/**/*.ts", "!typings/**/*.ts"],
				watch: '.'
			}
		},
		// Configure a mochaTest task
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					captureFile: 'results.txt', // Optionally capture the reporter output to a file
					quiet: false, // Optionally suppress output to standard out (defaults to false)
					clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
				},
				src: ['test/**/*.js']
			}
		}

	});

	grunt.loadNpmTasks("grunt-ts");
	// Add the grunt-mocha-test tasks.
	grunt.loadNpmTasks('grunt-mocha-test');
	
	grunt.registerTask("default", ["ts"]);
	grunt.registerTask("test", ["mochaTest"]);
};
