/*
 * Generated on 2014-02-16
 * generator-assemble v0.4.9
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      temp: 'tmp',
      dist: 'dist',
      tidy: 'tidy'
    },

    htmlmin: {
      dist: {
        options: {
          
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: ['*.html'],
          dest: '<%= config.dist %>'
        }]
      }
    },

    cssmin: {
      dist: { 
        options: {
          keepSpecialComments: 0
        },
        files: {
          '<%= config.dist %>/assets/css/bootstrap.css': ['<%= config.src %>/assets/css/bootstrap*.css'],
          '<%= config.dist %>/assets/css/theme.css': ['<%= config.src %>/assets/css/theme.css'],
        }
      }
    },

    uncss: {
      dist: {
        options: {
          ignoreSheets: ['assets/css/theme.css']
        },
        files: {
          '<%= config.dist %>/assets/css/bootstrap.css': ['<%= config.dist %>/*.html']
        }
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>',
          src: ['assets/js/*.js'],
          dest: '<%= config.dist %>'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/',
          src: ['assets/img/*.{png,jpg,gif}'],
          dest: '<%= config.dist %>/'
        }]
      }
    },

    processhtml: {
      dist: {
        files: [{ 
          expand: true,
          cwd: '<%= config.dist %>/',
          src: ['*.html'],
          dest: '<%= config.dist %>/'
        }]
      }
    },

    copy: {
      dist: {
        files:[{
          expand: true,
          cwd: '<%= config.src %>/assets/fonts/',
          src: ['**'],
          dest: '<%= config.dist %>/assets/fonts/'
        },{src: '<%= config.src %>/site.appcache', dest: '<%= config.dist %>/site.appcache'}
        ]
      }
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      css: {
        files: ['<%= config.src %>/assets/css/*.css'],
        tasks: ['cssmin','uncss']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    'ftp-deploy': {
        build: {
            auth: {
                host: 'cern-danube-school.uns.ac.rs',
                port: 21,
                authKey: 'key1'
	       },
	       src: '<%= config.dist %>',
	       dest: '/var/www/cern-danube-school/html',
	       exclusions: []
        }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']
    
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('serve', [
    'clean',
    'newer:imagemin',
    'assemble',
    'uglify',
    'processhtml',
    'htmlmin',
    'cssmin',
    'uncss',
    'newer:copy',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'newer:imagemin',
    'assemble',
    'uglify',
    'processhtml',
    'htmlmin',
    'cssmin',
    'uncss',
    'newer:copy'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('deploy', ['build','ftp-deploy']);

};
