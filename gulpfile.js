const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');

//Sass
function compilaSass() {
  return gulp
  .src('src/scss/*.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('build/css/'))
  .pipe(browserSync.stream());
}

gulp.task('sass', compilaSass);

// BrowserSync
function browser() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
};

gulp.task('browser-sync', browser)

//Concat
function gulpJs(){
  return gulp
    .src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./build/js'));
}

gulp.task('gulp-concat', gulpJs);



//Babel
function gulpBabel(){
  return gulp
    .src('./build/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./build/js/babel/'));
};

gulp.task('gulp-babel', gulpBabel);


//Watch
function watch() {
  gulp.watch('src/scss/*.scss', compilaSass);
  gulp.watch('build/js/*.js', gulpBabel);
  // gulp.watch('src/js/*.js', gulpJs);
  gulp.watch('build/js/*.js').on('change', browserSync.reload);
  gulp.watch(['build/*.html', 'build/*.php']).on('change', browserSync.reload);
}

gulp.task('watch', watch)

//Default
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'gulp-babel'));
