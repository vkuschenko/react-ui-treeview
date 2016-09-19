module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        force: true
      },
      prod: ["./dist"],
      examples: ["./examples/**/bundled_ex.js"],
      coverage: ["./coverage"]
    },

    browserify: {

      prod: {
        options: {
          debug: false,
          transform: ['babelify'],
          extensions: ['.js'],
          external: [
            'react'
          ]
        },

        files: {
          './dist/bundle.js': ['./src/index.js']
        }
      },

      examples: {
        options: {
          debug: true,
          transform: ['babelify'],
          extensions: ['.js']
        },

        files: {
          './examples/example1/bundled_ex.js': ['./examples/example1/example.js']
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


  grunt.registerTask('prod', ['clean:prod', 'browserify:prod']);
  grunt.registerTask('examples', ['clean:examples', 'browserify:examples']);


  grunt.registerTask('default', ['prod', 'examples', 'uglify']);
};