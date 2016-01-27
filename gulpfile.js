var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

gulp.task('js', function () {
    gulp.src([
        'libs/styx.js',
        'libs/isotope.js',
        'libs/fancybox/jquery.fancybox.pack.js',
        'libs/Hyphenator/Hyphenator.js',
        'libs/twitterfetcher.js',

        'js/event.js',
        'js/background.styx.js',
        'js/article.styx.js',
        'js/masonry.styx.js',
        'js/flickr.styx.js',
        'js/sidebar.styx.js',
        'js/facebook.styx.js',
        'js/twitter.styx.js',
        'js/bootstrap.styx.js'
    ])
        //.pipe(babel({presets: ['es2015']}))
        .pipe(concat('cardatheme.js'))
        .pipe(uglify())
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

gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['css']);
    gulp.watch('js/**/*.js', ['js']);
});


gulp.task('default', ['js', 'css']);
