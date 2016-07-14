'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var stylesDir = 'sass/**/*.scss';

var handleError = function(error) {
    console.error('Error:', error);
};

gulp.task('react', function() {
});

gulp.task('javascript-lint', function() {
});

gulp.task('javascript', function() {
    var stream;

    stream = gulp.src(['js/**/index.js'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: '../js/'
        }))
        .pipe(gulp.dest('js_public'));

    return stream;
});

gulp.task('sass-lint', function() {
    return gulp.src([stylesDir])
        .pipe(plugins.sassLint())
        .pipe(plugins.sassLint.format());
});

gulp.task('sass', function() {
    var minify = process.argv.indexOf('--minify') !== -1;
    var stream;

    stream = gulp.src(['sass/*.scss'])
        .pipe(plugins.plumber({ errorHandler: handleError }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.autoprefixer({ browsers: ['last 2 versions', '> 5%', 'not ie <= 8'] }))
        .pipe(plugins.sass().on('error', handleError))
        .pipe(plugins.sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: '../sass/'
        }))
        .pipe(gulp.dest('css'));

    if (minify) {
        stream = stream.pipe(plugins.filter('css/*.css'))
            .pipe(plugins.cleanCss({ compatability: 'ie8' }))
            .pipe(plugins.rename({ extname: '.min.css' }))
            .pipe(gulp.dest('css'));
    }

    return stream;
});

gulp.task('stylesheet-watcher', function() {
    gulp.watch(stylesDir, ['sass-lint', 'sass']);
});

gulp.task('lint', ['sass-lint']);
gulp.task('watch', ['stylesheet-watcher']);
gulp.task('default', ['sass', 'javascript']);