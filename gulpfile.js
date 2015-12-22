var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

gulp.task('js', function () {
    gulp.src([
      'libs/isotope.js',
      'libs/fancybox/jquery.fancybox.pack.js',
      'libs/styx.js',

      'js/background.styx.js',
      'js/article.styx.js',
      'js/masonry.styx.js',
      'js/flickr.styx.js',
      'js/sidebar.styx.js'
    ])
        //.pipe(babel({presets: ['es2015']}))
        .pipe(concat('cardatheme.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./assets'))
});

gulp.task('css', function () {
    gulp.src('./scss/cardatheme.scss')
        .pipe(compass({
            config_file: './config.rb',
            sass: './scss',
            css: './assets'
        }).on('error', function (error) {
            console.log(error);
            this.emit('end');
        }));
});


gulp.task('default', ['js', 'css']);
