module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		haxe: {
			project: {
				hxml: "build.hxml -xml docs.xml --macro include('pixi')"
			}
		},

		browserify: {
			stats: {
				src: [],
				dest: "libs/perf.min.js",
				options: {
					require: ["perf.js"],
					browserifyOptions: {
						standalone: "Perf"
					}
				}
			}
		},

		exec: {
			copy_libs: "cp -R ./libs/*.min.js ./samples/_output/libs/",
			/*docs: "haxelib run chxdoc -o ../adireddy.github.io/docs/pixi-haxe/ -f docs.xml " +
				  " --showTodoTags=false " +
				  " --deny=msignal.*,core.*,demos.*,samples.*,js.*,haxe.*,nape.*,zpp_nape.*,/ " +
				  "--title='pixi-haxe' " +
				  "--subtitle='Externs'",*/
			copy_samples: "cp -R samples/_output/** ../adireddy.github.io/demos/pixi-haxe/"
		},

		zip: {
			"pixi.zip": ["src/**", "haxelib.json", "extraParams.hxml", "README.md", "LICENSE"]
		}
	});

	grunt.loadNpmTasks("grunt-haxe");
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-zip");
	grunt.loadNpmTasks("grunt-exec");
	grunt.registerTask("default", ["haxe", "browserify", "exec"]);
};