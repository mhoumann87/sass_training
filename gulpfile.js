const gulp = require('gulp'),
  sass = require('gulp-sass');

sass.compiler = require('node-sass');

const src = 'development/sass/styles.scss';
const dest = 'production/css';

gulp.task('sass', function () {
  return gulp.src(src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
  gulp.watch('development/sass/**/*.scss', ['sass']);
});




