var gulp = require('gulp'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat');

gulp.task('js', function () {
  gulp
    .src([
      'libs/styx.js',
      // 'libs/isotope.js',
      // 'libs/fancybox/jquery.fancybox.pack.js',
      // 'libs/twitterfetcher.js',
      'libs/glry.js',
      'ts/lib/index.js',
      // 'js/background.styx.js',
      'js/article.styx.js',
      'js/cookie.styx.js',
      'js/event.js',
      'js/facebook.styx.js',
      'js/infiniteScroll.styx.js',
      // 'js/flickr.styx.js',
      'js/trigger.styx.js',
      // 'js/sidebar.styx.js',
      // 'js/twitter.styx.js',
      'js/bootstrap.js',
    ])
    .pipe(concat('cardatheme.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./assets'));
});

gulp.task('css', function () {
  gulp
    .src('./scss/cardatheme.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: [
          'node_modules/scss',
          'node_modules/compass-sass-mixins/lib/compass',
        ],
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./assets'));
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['css']);
  gulp.watch('js/**/*.js', ['js']);
});

gulp.task('default', ['js', 'css']);
