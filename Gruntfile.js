module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			options: {
				base: 'app/'
			},
			devserver: {
				options: {
					open: true,
					port: 80, 
					livereload: true
				}
			},
			testserver: {
				options: {
					port: 9999
				}
			}
		},

		uglify: {
			options: {
				banner: ''
			},
			app: {
				files: [{
					expand: true, 
					cwd: 'app/scripts/',
					src: [
						'app.js', 
						'config/*.js', 
						'services/*.js', 
						'controllers/*.js', 
						'filters/*.js', 
						'directives/*.js'
					],
					dest: 'app/scripts/_min/', 
					ext: '.min.js' 
				}]
			}
		},

		concat: {
			options: {
				separator: ';\n',
				banner: "'use strict';\n",
				process: function(src, filepath) {
					// Replace all 'use strict' statements in the code with a single one at the top
					return '\n// Source: ' + filepath + '\n' + src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
				}
			},
			all: {
				src: [
					'app/scripts/lib/angular/1.2.4/angular.min.js', 
					'app/scripts/lib/angular/1.2.4/angular-route.min.js', 
					'app/scripts/_min/app.min.js',
					'app/scripts/_min/*/*.js'
				],
				dest: 'app/scripts/_build/<%= pkg.name %>-all.js'
			}
		},

		watch: {
			options : {
				livereload: 35729
			},
			app: {
				files: ['app/styles/**/*.scss','app/scripts/**/*.js'],
				tasks: ['sass:dev']
			}
		},

		sass: {
			options: {
				sourcemap: true,
				trace: true,
				style: 'compact',
				cacheLocation: 'app/styles/sass-cache'
			},
			dev: {
				options: {
					debugInfo: true,
					lineNumbers: true
				},
				files: {
					'app/styles/app.css': 'app/styles/app.scss'
				}
			},
			prod: {
				options: {
					debugInfo: false,
					lineNumbers: false
				},
				files: {
					'app/styles/app.css': 'app/styles/app.scss'
				}
			}
		},

		karma: {
			unit: {
				configFile: 'test/karma-unit.conf.js',
				autoWatch: false,
				singleRun: true
			},
			unit_auto: {
				configFile: 'test/karma-unit.conf.js'
			}
		},

		protractor: {
			options: {
				keepAlive: true,
				configFile: 'test/protractor.conf.js'
			},
			singlerun: {}
		}

	});

	/* load plugins */

	// grunt-contrib-connect https://github.com/gruntjs/grunt-contrib-connect
	grunt.loadNpmTasks('grunt-contrib-connect');
	
	// grunt-contrib-uglify https://github.com/gruntjs/grunt-contrib-uglify
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// grunt-contrib-concat https://github.com/gruntjs/grunt-contrib-concat
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// grunt-contrib-watch https://github.com/gruntjs/grunt-contrib-watch
	grunt.loadNpmTasks('grunt-contrib-watch');

	// grunt-contrib-sass https://github.com/gruntjs/grunt-contrib-sass
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	// grunt-karma https://github.com/karma-runner/grunt-karma
	grunt.loadNpmTasks('grunt-karma');
	
	// grunt-protractor-runner https://github.com/teerapap/grunt-protractor-runner
	grunt.loadNpmTasks('grunt-protractor-runner');


	/* register task(s). */
	
	// build script
	grunt.registerTask('build', ['uglify:app', 'concat:all', 'sass:prod']);

	// launch a static server for development
	grunt.registerTask('dev', ['connect:devserver', 'watch:app']);
	
	// test
	grunt.registerTask('full-test', ['unit', 'e2e']);
	grunt.registerTask('unit', ['karma:unit']);
	grunt.registerTask('e2e', ['connect:testserver','protractor:singlerun']);

};