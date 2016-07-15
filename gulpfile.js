var gulp = require('gulp'),

    htmlImport = require('gulp-html-import'),

    useref = require('gulp-useref'),

    gulpif = require('gulp-if'),

    uglify = require('gulp-uglify'),

    cleanCss = require('gulp-clean-css'),

    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {

    browserSync.init({

        server: {
            baseDir: "./"
        }

    });

});

gulp.task('import', function () {

  gulp.src('./html/index.html').pipe(htmlImport('./html/templates/')).pipe(gulp.dest('./'));

});
 
gulp.task('html', function () {
    
    return gulp.src('./index.html')

        .pipe(useref())
    
        .pipe(gulpif('*.js', uglify()))
    
        .pipe(gulpif('*.css', cleanCss()))
    
        .pipe(gulp.dest('./'));

});

gulp.task('watch', ['import'], function() {

  gulp.watch(['./html/index.html', './html/templates/*.html'], ['import']);

});