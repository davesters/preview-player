module.exports = function (grunt) {

	grunt.initConfig({

		clean: [ 'build' ],

		tslint: {
			options: {
				configuration: './tslint.json'
			},
			files: {
				src: [
					'src/**/*.ts',
				]
			},
		},

		exec: {
			tsc: {
				cmd: './node_modules/.bin/tsc -p . --pretty',
			}
		},

		nodemon: {
			dev: {
				script: 'build/start.js',
				options: {
					ignore: [
						'node_modules/**',
						'src/**',
					],
					watch: [ 'build' ],
					delay: 1500,
				}
			}
		},

		concurrent: {
			serve: {
				tasks: [ 'watch', 'nodemon:dev' ],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		watch: {
			ts: {
				files: [ 'src/**/*.ts' ],
				tasks: [ 'exec:tsc' ]
			}
		}

	});

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-exec");
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks("grunt-tslint");

	grunt.registerTask('default', [ 'build', 'concurrent:serve' ]);
	grunt.registerTask('build', [ 'tslint', 'clean', 'exec:tsc' ]);
};