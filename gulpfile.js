var gulp = require('gulp'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat');

gulp.task('js', function() {
  gulp
    .src([
      'libs/styx.js',
      // 'libs/isotope.js',
      'libs/fancybox/jquery.fancybox.pack.js',
      'libs/twitterfetcher.js',
      'js/event.js',
      // 'js/background.styx.js',
      'js/article.styx.js',
      // 'js/masonry.styx.js',
      'js/flickr.styx.js',
      // 'js/sidebar.styx.js',
      'js/facebook.styx.js',
      'js/twitter.styx.js',
      'js/bootstrap.js'
    ])
    .pipe(concat('cardatheme.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets'));
});

gulp.task('css', function() {
  gulp
    .src('./scss/cardatheme.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: [
          'bower_components/foundation/scss',
          'bower_components/foundation/compass-sass-mixins/lib/compass'
        ]
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./assets'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['css']);
  gulp.watch('js/**/*.js', ['js']);
});

gulp.task('default', ['js', 'css']);
