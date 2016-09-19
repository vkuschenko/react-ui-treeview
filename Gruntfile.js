module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        force: true
      },
      all: ['dist', 'examples/bundle.js', 'coverage']
    },

    browserify: {
      all: {
        options: {
          debug: false,
          transform: ['babelify'],
          extensions: ['.js']
        },

        files: {
          'dist/bundle.js': ['src/index.js'],
          'examples/bundle.js': ['examples/examples.js'],
        }
      }
    },

    uglify: {
      options: {
        mangle: true,
        sourceMap: true
      },
      dist: {
        files: {
          'dist/bundle.min.js': ['dist/bundle.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['clean', 'browserify', 'uglify']);
};