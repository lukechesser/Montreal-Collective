// ==========================================================================
// *
// * Grunt Build for ooomf/ooomf.com
// * https://bitbucket.org/ooomf/ooomf.com
// *
// * # LESS
// * # Autoprefixer
// * # Concat
// * # Uglify
// * # JS Hint
// * # ImageMin
// * # Webfonts
// * # Watch
// *
// ==========================================================================


var root, // store local path to root
  path, // store local paths to files
  build; // store local path to build folder

root = './';
build = root + 'build/';

path = {
  main: {
    js: {
      src: root + '_js/',
      compiled: root + 'js/',
    },
    css: {
      src: root + '_less/',
      compiled: root + 'css/',
    },
    images: {
      src: root + '_img/',
      compiled: root + 'img/'
    },
    webfonts: {
      src: root + '_icons/',
      dist: root + 'webfonts/',
    },
  }
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // ==========================================================================
    // * LESS
    // * https://github.com/gruntjs/grunt-contrib-less
    // ==========================================================================

    less: {
      main: {
        src: path.main.css.src + 'main.less',
        dest: path.main.css.compiled + 'main.css'
      },
    },

    // ==========================================================================
    // * AutoPrefixer
    // * https://github.com/nDmitry/grunt-autoprefixer
    // ==========================================================================

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9', 'ie 8'],
      },
      main: {
        src: '<%= less.main.dest %>',
      },
    },

    // ==========================================================================
    // * CSSmin
    // * https://github.com/gruntjs/grunt-contrib-cssmin
    // ==========================================================================

    cssmin: {
      options: {
        report: 'min',
      },
      main: {
        src: '<%= autoprefixer.main.src %>',
        dest: path.main.css.compiled + 'main.min.css',
      },
    },

    // ==========================================================================
    // * Concat
    // * https://github.com/gruntjs/grunt-contrib-concat
    // ==========================================================================

    concat: {
      options: {
        separator: ';'
      },
      main: {
        src: [],
        dest: path.main.js.compiled + 'main.js'
      },
    },

    // ==========================================================================
    // * Uglify
    // * https://github.com/gruntjs/grunt-contrib-uglify
    // ==========================================================================

    uglify: {
      main: {
        src: '<%= concat.main.dest %>',
        dest: path.main.js.compiled + 'main.min.js'
      },
    },

    // ==========================================================================
    // * JS Hint
    // * https://github.com/gruntjs/grunt-contrib-jshint
    // ==========================================================================

    jshint: {
      files: ['gruntfile.js', path.main.js.src + '*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    // ==========================================================================
    // * ImageMin
    // * https://github.com/gruntjs/grunt-contrib-imagemin
    // ==========================================================================

    imagemin: {
      img: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: path.main.images.src,
          src: ['**/*.{png,jpg,gif,jpeg}'],
          dest: path.main.images.compiled,
        }],
      },
    },

    // ==========================================================================
    // * Webfonts
    // * https://github.com/sapegin/grunt-webfont
    // ==========================================================================

    webfont: {
      main: {
        src: path.main.webfonts.src + '*.svg',
        dest: path.main.webfonts.dest,
        destCss: path.main.css.src,
        options: {
          syntax: 'bem',
          templateOptions: {
            baseClass: 'icon',
            classPrefix: 'icon-',
            mixinPrefix: 'icon-',
          },
          stylesheet: 'less',
          relativeFontPath: '../webfonts/',
          font: 'main-iconfont',
          destHtml: path.main.webfonts.src,
        },
      },
    },

    // ==========================================================================
    // * Watch
    // * https://github.com/gruntjs/grunt-contrib-watch
    // ==========================================================================

    watch: {
      less: {
        files: [ path.main.css.src + '**/*.less'],
        tasks: ['compile-css'],
      },

      js: {
        files: [ path.main.js.src + '**/*.js'],
        tasks: ['compile-js'],
      },
    },
  });

  // loads
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // tasks
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('compile-js', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('compile-css', ['less', 'autoprefixer', 'cssmin']);
  grunt.registerTask('compile-images', ['imagemin']);
  grunt.registerTask('compile-fonts', ['webfont']);

  // task aliases/sugar
  grunt.registerTask('compile', ['compile-js', 'compile-css', 'compile-images']);
  grunt.registerTask('deploy', ['compile']);
  grunt.registerTask('default', ['compile']);

  // watch tasks (sugar)
  grunt.registerTask('watch-js', ['watch:js']);
  grunt.registerTask('watch-less', ['watch:less']);
};