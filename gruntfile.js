module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false
                }
            },
            cleanup: {
                options: {
                    install: false,
                    copy: false,
                    cleanup: true
                }
            }
        },
        sass: {
            options: {
                includePaths: ['./bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap', './bower_components/compass/lib']
            },
            conf: {
                'cardatheme.css': 'scss/cardatheme.scss'
            },
            prod: {
                options: {
                    outputStyle: 'compressed'
                },
                files: '<%= sass.conf %>'
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    lineNumbers: true,
                    sourceMap: true
                },
                files: '<%= sass.conf %>'
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: 'web/styx/scss/**/*.scss',
                tasks: ['sass:dev']
            }
        },
        copy: {
            libs: {
                expand: true,
                src: [
                    'bower_components/jquery/dist/*.js',
                    'bower_components/styx/src/styx.js'
                ],
                dest: 'libs/',
                flatten: true
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dest: {
                src: ['web/styx/js/libs/*.js'],
                dest: 'web/styx/js/libs/libs.js'
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'styx-<%= pkg.version %>-<%= grunt.template.today("yyyy.mm.dd-HH.MM.ss") %>.tar.gz',
                    mode: 'tgz'
                },
                expand: true,
                src: ['archive/**'],
                dest: '.',
                dot: true
            }
        }
    });


    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');


    grunt.registerTask('watch', ['bower:install', 'copy:libs', 'sass', 'bower:cleanup']);
    grunt.registerTask('dev', ['bower:cleanup', 'bower:install', 'copy:libs', 'sass:dev']);
    grunt.registerTask('prod', ['bower:cleanup', 'bower:install', 'copy:libs', 'sass:prod']);
    grunt.registerTask('default', ['prod']);

};
