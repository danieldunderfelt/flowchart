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
          'src/css/flowchart.css': ['src/scss/flowchart.scss'],
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'dist/css/flowchart.css': 'src/css/flowchart.css'
        }
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
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      },
      css: {
        files: 'src/css/*.css',
        tasks: ['autoprefixer'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks : ['traceur', 'browserify']
      },
      gruntfile: {
        files: "Gruntfile.js"
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dev', ['watch']);
};