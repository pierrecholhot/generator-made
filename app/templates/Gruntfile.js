// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

  // Project settings
    yeoman: {
      // Configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server.js',
          debug: true
        }
      },
      test: {
        options: {
          hostname: 'localhost',
          port: process.env.PORT || 9001,
          script: 'server.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server.js',
          node_env: 'production'
        }
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {<% if (coffee) { %>
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:test', 'test:watch']
      },<% } else { %>
      js: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },<% } %>
      gruntfile: {
        files: ['Gruntfile.js']
      },<% if (includeCompass) { %>
      compass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },<% } %>
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      // livereload: {
      //   options: {
      //     livereload: '<%%= connect.options.livereload %>'
      //   },
      //   files: [
      //     '<%%= yeoman.app %>/{,*/}*.html',
      //     '.tmp/styles/{,*/}*.css',<% if (coffee) { %>
      //     '.tmp/scripts/{,*/}*.js',<% } %>
      //     '<%%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
      //   ]
      // }
      livereload: {
        files: [
          '<%%= yeoman.app %>/views/{,*//*}*.{html,jade}',
          '{.tmp,<%%= yeoman.app %>}/styles/{,*//*}*.css',
          '{.tmp,<%%= yeoman.app %>}/scripts/{,*//*}*.js',
          '<%%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server.js',
          'lib/**/*.{js,json}'
        ],
        tasks: ['newer:jshint:server', 'express:dev'],
        options: {
          spawn: false //Without this option specified express won't be reloaded
        }
      }
    },
    // // The actual grunt server settings
    // connect: {
    //   options: {
    //     port: 9000,
    //     livereload: 35729,
    //     // Change this to '0.0.0.0' to access the server from outside
    //     hostname: 'localhost'
    //   },
    //   livereload: {
    //     options: {
    //       open: true,
    //       base: [
    //         '.tmp',
    //         '<%%= yeoman.app %>'
    //       ]
    //     }
    //   },
    //   test: {
    //     options: {
    //       port: 9001,
    //       base: [
    //         '.tmp',
    //         'test',
    //         '<%%= yeoman.app %>'
    //       ]
    //     }
    //   },
    //   dist: {
    //     options: {
    //       open: true,
    //       base: '<%%= yeoman.dist %>',
    //       livereload: false
    //     }
    //   }
    // },
    open: {
      server: {
        path: 'http://localhost:<%%= express.options.port %>'
      },
      nexus4: {
        path: 'http://www.browserstack.com/start#os=android&os_version=4.2&device=LG+Nexus+4&speed=1&start=true&url=http://localhost:<%%= connect.options.port %>'
      },
      nexus7: {
        path: 'http://www.browserstack.com/start#os=android&os_version=4.1&device=Google+Nexus+7&speed=1&start=true&url=http://localhost:<%%= connect.options.port %>'
      },
      iphone5: {
        path: 'http://www.browserstack.com/start#os=ios&os_version=6.0&device=iPhone+5&speed=1&start=true&url=http://localhost:<%%= connect.options.port %>'
      }
    },
    // autoshot: {
    //   defaultOptions: {
    //     options: {
    //       // necessary config
    //       path: 'screenshots/',
    //       remote: {
    //         files: [
    //           { src: 'http://localhost:<%%= connect.options.port %>', dest: 'screen.png', delay: 3000 }
    //         ]
    //       },
    //       viewport: ['320x480','480x320','384x640','640x384','602x963','963x602','600x960','960x600','800x1280','1280x800','768x1024','1024x768']
    //     }
    //   }
    // },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/views/*',
            '<%%= yeoman.dist %>/public/*',
            '!<%%= yeoman.dist %>/public/.git*',
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'lib/.jshintrc'
        },
        src: [ 'lib/{,*/}*.js']
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%%= yeoman.app %>/scripts/vendor/*'
      ]
    },

  <% if (testFramework === 'mocha') { %>
    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%%= express.test.options.hostname %>:<%%= express.test.options.port %>']
        }
      }
    },<% } else if (testFramework === 'jasmine') { %>
  // Jasmine testing framework configuration options
    jasmine: {
      all: {
        options: {
          specs: 'test/spec/{,*/}*.js'
        }
      }
    },<% } %>

  <% if (coffee) { %>
    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.{coffee,litcoffee,coffee.md}',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.{coffee,litcoffee,coffee.md}',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },<% } %>

  <% if (includeCompass) { %>
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yeoman.app %>/images',
        javascriptsDir: '<%%= yeoman.app %>/scripts',
        fontsDir: '<%%= yeoman.app %>/styles/fonts',
        importPath: '<%%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/public/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },<% } %>
    // Add vendor prefixed styles
    // jade: {
    //   dist: {
    //     options: {
    //       pretty: true
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: '<%= yeoman.app %>',
    //       src: ['{,*/}*.jade', '/views/**/{,*/}*.jade', '/views/{,*/}*.jade'],
    //       dest: '.tmp',
    //       ext: '.html'
    //     }]
    //   }
    // },
    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    // Automatically inject Bower components into the HTML file
    'bower-install': {
      layout: {
        html: '<%%= yeoman.app %>/views/layout.jade',
        ignorePath: '<%%= yeoman.app %>/',
        exclude: [<% if (includeModernizr) { %> 'modernizr', <% } %> <% if (includeCompass) { %> '<%%= yeoman.app %>/bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap.js' <% } %>]
      },
      index: {
        html: '<%%= yeoman.app %>/views/index.jade',
        ignorePath: '<%%= yeoman.app %>/',
        exclude: [<% if (includeModernizr) { %> 'modernizr', <% } %> <% if (includeCompass) { %> '<%%= yeoman.app %>/bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap.js' <% } %>]
      }
    },
    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html']
      }
    },
    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/public/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/public/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/public/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            '<%%= yeoman.dist %>/public/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>/public'
      },
      html: ['<%%= yeoman.app %>/views/index.html',
             '<%%= yeoman.app %>/views/index.jade'],
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%%= yeoman.dist %>/public']
      },
      html: ['<%%= yeoman.dist %>/views/{,*/}*.html',
             '<%%= yeoman.dist %>/views/{,*/}*.jade'],
      css: ['<%%= yeoman.dist %>/public/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= yeoman.dist %>/public/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/public/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          // collapseBooleanAttributes: true,
          // collapseWhitespace: true,
          // removeAttributeQuotes: true,
          // removeCommentsFromCDATA: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/views',
          src: ['*.html', 'partials/*.html'],
          dest: '<%%= yeoman.dist %>/views'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //     dist: {
    //         files: {
    //             '<%%= yeoman.dist %>/styles/main.css': [
    //                 '.tmp/styles/{,*/}*.css',
    //                 '<%%= yeoman.app %>/styles/{,*/}*.css'
    //             ]
    //         }
    //     }
    // },
    // uglify: {
    //     dist: {
    //         files: {
    //             '<%%= yeoman.dist %>/scripts/scripts.js': [
    //                 '<%%= yeoman.dist %>/scripts/scripts.js'
    //             ]
    //         }
    //     }
    // },
    // concat: {
    //     dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>/public',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'<% if (includeBootstrap) { %>,
            'bower_components/bootstrap' + (this.includeCompass ? '-sass/' : '/') + (this.includeCompass ? 'vendor/assets/fonts/bootstrap/' : 'dist/fonts/') +'*.*'<% } %>
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

  <% if (includeModernizr) { %>
    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
        outputFile: '<%%= yeoman.dist %>/public/scripts/vendor/modernizr.js',
        // Based on default settings on http://modernizr.com/download/
        extra : {
          shiv : true,
          printshiv : false,
          load : true,
          mq : true,
          cssclasses : true
        },
        // Based on default settings on http://modernizr.com/download/
        extensibility : {
          addtest : false,
          prefixed : false,
          teststyles : false,
          testprops : false,
          testallprops : false,
          hasevents : false,
          prefixes : false,
          domprefixes : false
        },
        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        // "files" : [],
        parseFiles:false,
        // When parseFiles = true, matchCommunityTests = true will attempt to
        // match user-contributed tests.
        matchCommunityTests : false,
        uglify: true
      }
    },<% } %>

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [<% if (includeCompass) { %>
        'compass:server',<% } if (coffee) { %>
        'coffee:dist',<% } %>
        'copy:styles'
      ],
      test: [<% if (coffee) { %>
        'coffee',<% } %>
        'copy:styles'
      ],
      dist: [<% if (coffee) { %>
        'coffee',<% } if (includeCompass) { %>
        'compass',<% } %>
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:prod', 'open:server', 'express-keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bower-install',
      'concurrent:server',
      'autoprefixer',
      'express:dev',
      'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'express:test',<% if (testFramework === 'mocha') { %>
      'mocha'<% } else if (testFramework === 'jasmine') { %>
      'jasmine'<% } %>
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',<% if (includeModernizr) { %>
    'modernizr',<% } %>
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
