'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    element: 'pdf-reader'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/elements/**/*.html',
          '.tmp/elements/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/elements/<%= yeoman.element %>/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/elements/<%= yeoman.element %>/styles',
          src: '{,*/}*.css',
          dest: '.tmp/elements/<%= yeoman.element %>/styles'
        }]
      }
    },
    uglify: {
      '<%= yeoman.dist %>/scripts/polymer.min.js': [
        '<%= yeoman.app %>/bower_components/polymer/polymer.min.js'
      ],
      '<%= yeoman.dist %>/elements/<%= yeoman.element %>/scripts/main.min.js': [
        '<%= yeoman.app %>/scripts/main.js'
      ]
    },
    useminPrepare: {
      html: [
        '<%= yeoman.app %>/index.html',
        '<%= yeoman.app %>/elements/<%= yeoman.element %>/<%= yeoman.element %>.html'
      ],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: [
        '<%= yeoman.dist %>/{,*/}*.html',
        '<%= yeoman.dist %>/elements/<%= yeoman.element %>/<%= yeoman.element %>.html'
      ],
      css: ['<%= yeoman.dist %>/elements/<%= yeoman.element %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/elements/<%= yeoman.element %>/styles/main.min.css': [
            '.tmp/elements/<%= yeoman.element %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      scripts: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/scripts',
        dest: '.tmp/elements/<%= yeoman.element %>/scripts/',
        src: '{,*/}*.js'
      },
      images: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/images',
        dest: '.tmp/elements/<%= yeoman.element %>/images/',
        src: '{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/elements/<%= yeoman.element %>',
          src: [
            'scripts/vendor/{,*/}*.js',
            'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }]
      },
      element: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.dist %>',
        src: [
          'elements/<%= yeoman.element %>/{,*/}*.html',
          'sample.pdf'
        ]
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    }
  });


  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'compass',
      'autoprefixer',
      'connect:livereload',
      'copy:scripts',
      'copy:images',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',


    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'compass',
    'autoprefixer',
    'useminPrepare',
    'htmlmin',
    'cssmin',
    'uglify',
    'copy:dist',
    'copy:element',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
