const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer')
sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

const src = 'development/sass/styles.scss';
const dest = 'production/css';

gulp.task('sass', function () {
  gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))

    .pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
  gulp.watch('development/sass/**/*.scss', gulp.series('sass'));
});

gulp.task('default', function () {
  gulp.watch('development/**/*.scss', gulp.series('sass'));
  gulp.watch('development/**/*.scss', gulp.series('watch'));
})




