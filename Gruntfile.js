module.exports = function(grunt) {
	'use strict';
	// Porject configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			dev: {
				options: {
					install: true,
					copy: true,
					targetDir: 'dist/libs',
					cleanup: true
				}
			},
			dist: {
				options: {
					install: true,
					copy: true,
					targetDir: 'dist/libs',
					cleanup: true,
					bowerOptions: {
						production: true
					}
				}
			}
		},
		copy: {
			html: {
				src: 'index.html',
				dest: 'dist/index.html'
			},
			css: {
				src: 'css/*.css',
				dest: 'dist/'
			}
		},
		html2js: {
			options:{
				base: 'app/templates'
			},
			dist: {
				src: ['app/templates/*.html'],
				dest: 'tmp/templates.js'
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['app/*.js', 'tmp/*.js'],
				dest: 'dist/app.js'
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					src: ['css/*.scss'],
					ext: '.css'
				}]
			}
		},
		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			source: {
				files: [{
					src: ['dist/js/core.js', 'dist/css/core.css', 'dist/*.js']
				}]
			}
		},
		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 8888,
					base: 'dist'
				}
			}
		},
		clean: {
			tmp: {
				src: ['tmp', '.sass-cache', '.tmp']
			},
			dist: {
				src: ['dist/css', 'dist/js', 'dist/index.html', 'dist/*.js']
			}
		},
		watch: {
			dev: {
				files: ['Gruntfile.js', 'app/*.js', 'app/templates/*.html', 'index.html', 'css/*.scss'],
				tasks: ['clean:dist', 'sass', 'html2js:dist','copy', 'concat:dist', 'clean:tmp'],
				options: {
					atBegin: true
				}
			},
			min: {
				files: ['Gruntfile.js', 'app/*.js', 'app/templates/*.html', 'index.html', 'css/*.scss'],
				tasks: ['clean:dist', 'sass', 'html2js:dist', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'filerev', 'usemin', 'clean:tmp'],
				options: {
					atBegin: true
				}
			}
		},
		useminPrepare: {
			html: 'dist/index.html'
		},
		usemin: {
			html: 'dist/index.html'
		},
		uglify: {
			options: {
				report: 'min',
				mangle: false
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('dev', ['clean', 'bower:dev', 'connect:server', 'watch:dev']);
	grunt.registerTask('build', ['clean', 'bower:dev', 'connect:server', 'watch:min']);
};