module.exports = function(grunt) {

	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
		concat: {
    options: {
      separator: "\n", //add a new line after each file
    },
    dist: {
      src: [
				'script/pages/header.js',
				'script/pages/home.js',
				'script/pages/contact.js',
				'script/pages/location-detail.js',
				'script/pages/location.js',
				'script/pages/category-detail.js'
			],
      dest: 'script/main.js',
    },
  },
	minified : {
		files: {
      src: [
				'script/main.js'
			],
			dest: 'script/'
		},
		options : {
			sourcemap: false,
      allinone: false,
			ext: '.min.js'
		}
	},
	sass: {                              // Task
   dist: {                            // Target
     options: {                       // Target options
       style: 'expanded'

     },
     files: {                        // Dictionary of files
       'sass/main.css': 'sass/main.scss'   // 'destination': 'source'
     }
   }
 },
 autoprefixer: {
   options: {
    browsers: ['last 10 versions'],
    safe: true
  },

  single_file: {
   src: 'sass/main.css',
   dest: 'css/style.css'
 },

},
cssmin: {
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1,
  },
  target: {
    files: {
      'css/style.min.css': ['css/style.css']
    }
  }
},
watch: {
  css: {
    files: '**/*.scss',
    tasks: ['sass','cssmin','autoprefixer'],
		options: {
      spawn: false,
			interrupt: true,
    },
  },
	js: {
    files: 'script/pages/*.js',
    tasks: ['concat', 'minified'],
		options: {
      spawn: false,
			interrupt: true,
    },
	},

  scripts: {
    files: ['sass/main.css'],
    tasks: ['autoprefixer','cssmin','sass',],
    options: {
			debounceDelay: 15,
      spawn: false,
			event: ['added', 'deleted'],
			interrupt: true,
			reload: true,
			livereload: true,
    },
  },
}
});

  // Load the plugin
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-minified');
	//grunt.loadNpmTasks('grunt-remove-logging');
	//grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['sass','autoprefixer','cssmin', 'concat', 'minified']);
	//grunt.registerTask('dev-watch', ['concat:dist']);

  };
