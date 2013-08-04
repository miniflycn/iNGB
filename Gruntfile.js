module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true,
				banner: [
					'/*! <%= pkg.title %>\n',
					' * @author miniflycn@justany.net\n',
					' * @verison v<%= pkg.version %>\n',
					' */\n\n'
				].join('')
			},
			dist: {
				src: [
					'src/core/selector.js',
					'src/core/watcher.js',
					'src/core/widget.js',
					'src/core/seed.js',
					'src/core/event.js'
				],
				dest: 'src/core.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.title %> v<%= pkg.version %> Copyright © 2013 <%= pkg.author.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					'dist/core.min.js': ['src/core.js'],
					'dist/ajax.min.js': ['src/extend/ajax.js'],
					'dist/date.min.js': ['src/extend/date.js'],
					'dist/event.min.js': ['src/extend/event.js'],
					'dist/log.min.js': ['src/extend/log.js'],
					'dist/stacktrace.min.js': ['src/extend/stacktrace.js'],
					'dist/string.min.js': ['src/extend/string.js']
				}
			}
		}
	});

	// Load the plugin that provides the "concat" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'httpService']);

};