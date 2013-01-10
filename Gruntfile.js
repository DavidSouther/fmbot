module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			all: ['lib/'],
		},
		coffee: {
			bot: {
				files: {
					'lib/<%= pkg.name %>.js': ['src/bot/**/*coffee']
				}
			}
		},
		watch: {
			bot: {
				files: [
					'src/bot/**/*ls'
				],
				tasks: ['build-bot']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib');

	grunt.registerTask('build-bot', ['coffee:bot']);
	grunt.registerTask('build', ['build-bot']);
	grunt.registerTask('default', ['clean', 'build']);
};
