'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var handleError = function(error) {
    console.error('Error:', error);
};

gulp.task('sass', function() {
    return gulp.src(['sass/*.scss'])
        .pipe(plugins.plumber({ errorHandler: handleError }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.autoprefixer({ browsers: ['last 2 versions', '> 5%', 'not ie <= 8'] }))
        .pipe(plugins.sass().on('error', handleError))
        .pipe(plugins.sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: '../sass/'
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass']);