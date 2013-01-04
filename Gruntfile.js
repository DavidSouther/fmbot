module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			all: ['lib/'],
		},
		livescript: {
			bot: {
				files: {
					'lib/<%= pkg.name %>.js': ['src/bot/**/*ls']
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
	grunt.loadNpmTasks('grunt-livescript');

	grunt.registerTask('build-bot', ['livescript:bot']);
	grunt.registerTask('build', ['build-bot']);
	grunt.registerTask('default', ['clean', 'build']);
};
