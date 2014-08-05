/**
 * This is Activeark JWT's default Gruntfile, feel free to edit to your
 * own taste, but remember to add it to .gitignore if you do.
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %>\n <%= grunt.template.today("yyyy-mm-dd") %>\n Author:<%= pkg.author %>\n License: <%= pkg.license %>\n*/\n',

    browserify: {
      dist: {
        files: {
          "dist/js/flowchart.js": ["src/.temp/js/**/*.js"]
        }
      },
    },

    traceur: {
      options: {
        experimental: true,
        blockBinding: true,
        includeRuntime: false,
        modules: "commonjs"
      },
      custom: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['**/*.js'],
          dest: 'src/.temp/js'
        }]
      },
    },
    sass: {
      dist: {
        files: {
          'css/text.css': ['scss/text.scss'],
        }
      }
    },
    autoprefixer : {
      dist: {
        src: 'css/text.css',
        dest: 'dist/css/text.css'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist',
          keepalive: true,
          hostname: '127.0.0.1'
        }
      }
    },
    watch: {
      scss: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      css: {
        files: 'css/*.css',
        tasks: ['autoprefixer']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks : ['traceur', 'browserify']
      },
      gruntfile: {
        files: "Gruntfile.js"
      },
      options: {
        livereload: true
      }

    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dev', ['watch']);
};